from app import app

if __name__ == '__main__':
    # Running on port 5001 to avoid conflicting with standard Surrogate Input app which uses 5000
    app.run(host='127.0.0.1', port=5001, debug=True)
