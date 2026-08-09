from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import os
import sqlite3
import numpy as np

from engine.simulation import run_simulation

app = Flask(__name__)
app.secret_key = 'surrogate_sim_secret_key_local'

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'spear_sim.db')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS usuario (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                validation TEXT DEFAULT 'validado'
            );
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS simulacao (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_simulacao TEXT NOT NULL,
                data_simulacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                num_alt INTEGER NOT NULL,
                num_crit INTEGER NOT NULL,
                aditivo INTEGER NOT NULL,
                sobreclassificacao INTEGER NOT NULL,
                num_instancias INTEGER NOT NULL,
                ID_usuario INTEGER NOT NULL,
                FOREIGN KEY(ID_usuario) REFERENCES usuario(id)
            );
        ''')
        conn.commit()

init_db()

@app.route('/')
def index():
    return render_template('welcome.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        next_url = request.args.get('next') or url_for('options')
        return redirect(next_url)
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        next_url = request.form.get('next') or url_for('options')
        
        conn = get_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usuario WHERE email = ? AND password = ?", (email, password))
        user = cursor.fetchone()
        conn.close()
        
        if user:
            session['user_id'] = user['id']
            session['user_email'] = user['email']
            return redirect(next_url)
        else:
            return render_template('login.html', error="Invalid email or password.", next=next_url)
            
    return render_template('login.html', next=request.args.get('next', ''))

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        if not email or not password:
            return render_template('register.html', error="Email and password are required.")
        if password != confirm_password:
            return render_template('register.html', error="Passwords do not match.")
            
        try:
            conn = get_db()
            cursor = conn.cursor()
            cursor.execute("INSERT INTO usuario (email, password, validation) VALUES (?, ?, 'validado')", (email, password))
            conn.commit()
            conn.close()
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            return render_template('register.html', error="Email already exists.")
            
    return render_template('register.html')

@app.route('/options')
def options():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('options.html')

@app.route('/continue')
def continue_sim():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome_simulacao, data_simulacao FROM simulacao WHERE ID_usuario = ? ORDER BY data_simulacao DESC", (session['user_id'],))
    simulations = cursor.fetchall()
    conn.close()
    
    return render_template('continue.html', simulations=simulations)

@app.route('/setup')
def setup():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('setup.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

@app.route('/results')
def results():
    if 'user_id' not in session:
        return redirect(url_for('login'))
    return render_template('results.html')

@app.route('/api/simulate', methods=['POST'])
def simulate():
    if 'user_id' not in session:
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    
    data = request.json
    try:
        num_alt = int(data['numAlt'])
        num_crit = int(data['numCrit'])
        n_inst = int(data.get('numInstancias', 10000))
        aditivo = bool(data.get('aditivo', True))
        sobreclassificacao = bool(data.get('sobreclassificacao', True))
        
        # Security boundaries on criteria count to avoid factorial explosions
        if num_crit > 7:
            # We enforce Monte Carlo weight sampling for C >= 8 to be safe and avoid freezing the server
            # However, for this project we will use 7 criteria max or return a clean warning.
            return jsonify({
                'success': False, 
                'error': 'The number of criteria must be less than or equal to 7 for exact permutation simulation.'
            }), 400
            
        results_data = run_simulation(
            num_alt=num_alt,
            num_crit=num_crit,
            n_inst=n_inst,
            aditivo=aditivo,
            sobreclassificacao=sobreclassificacao
        )
        return jsonify(results_data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/save_simulation', methods=['POST'])
def save_simulation():
    if 'user_id' not in session:
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    
    data = request.json
    try:
        sim_id = data.get('simId')
        nome_sim = data.get('simName', 'New Simulation')
        num_alt = int(data['numAlt'])
        num_crit = int(data['numCrit'])
        aditivo = 1 if bool(data.get('aditivo', True)) else 0
        sobreclassificacao = 1 if bool(data.get('sobreclassificacao', True)) else 0
        num_inst = int(data.get('numInstancias', 10000))
        
        conn = get_db()
        cursor = conn.cursor()
        if sim_id:
            cursor.execute('''
                UPDATE simulacao 
                SET nome_simulacao = ?, num_alt = ?, num_crit = ?, aditivo = ?, sobreclassificacao = ?, num_instancias = ?
                WHERE id = ? AND ID_usuario = ?
            ''', (nome_sim, num_alt, num_crit, aditivo, sobreclassificacao, num_inst, sim_id, session['user_id']))
        else:
            cursor.execute('''
                INSERT INTO simulacao (nome_simulacao, num_alt, num_crit, aditivo, sobreclassificacao, num_instancias, ID_usuario)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (nome_sim, num_alt, num_crit, aditivo, sobreclassificacao, num_inst, session['user_id']))
            sim_id = cursor.lastrowid
            
        conn.commit()
        conn.close()
        return jsonify({'success': True, 'simId': sim_id})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/load_simulation/<int:sim_id>', methods=['GET'])
def load_simulation(sim_id):
    if 'user_id' not in session:
        return jsonify({'success': False, 'error': 'Unauthorized'}), 401
    
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM simulacao WHERE id = ? AND ID_usuario = ?", (sim_id, session['user_id']))
    sim = cursor.fetchone()
    conn.close()
    
    if sim:
        return jsonify({
            'success': True,
            'sim': {
                'id': sim['id'],
                'nome_simulacao': sim['nome_simulacao'],
                'num_alt': sim['num_alt'],
                'num_crit': sim['num_crit'],
                'aditivo': bool(sim['aditivo']),
                'sobreclassificacao': bool(sim['sobreclassificacao']),
                'num_instancias': sim['num_instancias']
            }
        })
    else:
        return jsonify({'success': False, 'error': 'Simulation not found.'}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
