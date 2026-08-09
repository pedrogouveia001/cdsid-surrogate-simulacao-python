// --- Internationalization (i18n) & Translation Dictionary ---
const translations = {
    en: {
        // Base / Navigation
        "logout": "Logout",
        "user": "User",
        "back": "<< Back",
        "system_title": "SPEAR Simulation System",
        "running_simulation": "Running Monte Carlo simulation...",
        
        // Welcome
        "welcome_title": "SPEAR Simulation System",
        "welcome_desc": "This system replicates the Surrogate Simulação capabilities in Python, simulating the Decomposition Elicitation Heuristic across multiple runs to evaluate convergence and analyze the distribution of required questions.",
        "register_user": "Register User",
        "login": "Login",
        "enter": "Enter",
        "register": "Register",
        "confirm_password": "Confirm Password:",
        "email": "E-mail:",
        "password": "Password:",
        "forgot_password": "Forgot password?",
        "error_required": "Email and password are required.",
        "error_mismatch": "Passwords do not match.",
        "error_exists": "Email already exists.",
        "error_invalid_login": "Invalid email or password.",
        
        // Options
        "choose_option": "Please, choose an option:",
        "new_simulation": "Create new simulation",
        "load_simulation": "Load saved simulation",
        
        // Continue
        "saved_simulations": "Saved Simulations",
        "select_simulation": "Select a simulation configuration to load:",
        "choose_simulation": "-- Choose simulation --",
        "no_saved_sims": "No saved simulations found. Please create a new simulation.",
        
        // Setup
        "simulation_parameters": "Simulation Parameters",
        "simulation_name": "Simulation Name:",
        "num_alt": "Number of Alternatives:",
        "num_crit": "Number of Criteria:",
        "num_instances": "Number of Simulation Instances:",
        "save_parameters": "Save Parameters",
        "run_simulation": "Run Simulation",
        "fill_all_fields": "Please fill in all parameters correctly. Alternatives must be >= 2, criteria 3-7, and instances >= 100.",
        "save_success": "Simulation configuration saved successfully!",
        
        // Results
        "simulation_results": "Simulation Results",
        "export_pdf": "Export PDF",
        
        // Dashboard Stats
        "simulation_parameters_short": "Simulation Metrics",
        "Mean Questions": "Mean Questions Answered",
        "Standard Deviation": "Standard Deviation",
        "percentile_quartiles": "Percentiles",
        
        // Probability table
        "Questions Probability": "Convergence Probability",
        "Questions Count": "Questions Answered",
        "Probability": "Probability (%)",
        "exactly_questions": "{count} Questions",
        "exactly_question": "{count} Question",
        
        // Charts Titles
        "dist_chart_title": "Questions Count Probability Distribution (%)",
        "percentile_chart_title": "Percentile Curve of Questions Count (0 to 1)",
        "evolution_chart_title": "Value and Regret Evolution per Question Step",
        "avg_global_val": "Average Global Value",
        "avg_regret": "Average Regret",
        "percentile_axis": "Percentile (0 to 1)",
        "questions_axis": "Questions",
        
        // Trace Inspector
        "Sample Elicitation Trace": "Step-by-Step Simulation Trace Inspector",
        "Select Run": "Select Simulation Run:",
        "trace_question": "C{crit_i} vs C{crit_j} (Ratio = {ratio})",
        "choice_a": "Option A (C{crit_i} > r·C{crit_j})",
        "choice_b": "Option B (C{crit_i} <= r·C{crit_j})",
        
        // Alerts
        "no_results_found": "No results found. Please run a simulation first.",
        "pdf_gen_fail": "Failed to generate PDF report."
    },
    pt: {
        // Base / Navigation
        "logout": "Sair",
        "user": "Usuário",
        "back": "Voltar",
        "system_title": "Sistema de Simulação SPEAR",
        "running_simulation": "Executando simulação de Monte Carlo...",
        
        // Welcome
        "welcome_title": "Sistema de Simulação SPEAR",
        "welcome_desc": "Este sistema recria as funcionalidades do Surrogate Simulação em Python, simulando a Heurística de Elicitação por Decomposição através de múltiplas execuções para avaliar a convergência e analisar a distribuição de perguntas necessárias.",
        "register_user": "Registrar Usuário",
        "login": "Entrar",
        "enter": "Entrar",
        "register": "Registrar",
        "confirm_password": "Confirmar Senha:",
        "email": "E-mail:",
        "password": "Senha:",
        "forgot_password": "Esqueceu a senha?",
        "error_required": "E-mail e senha são obrigatórios.",
        "error_mismatch": "As senhas não coincidem.",
        "error_exists": "E-mail já cadastrado.",
        "error_invalid_login": "E-mail ou senha inválidos.",
        
        // Options
        "choose_option": "Por favor, escolha uma opção:",
        "new_simulation": "Criar nova simulação",
        "load_simulation": "Carregar simulação salva",
        
        // Continue
        "saved_simulations": "Simulações Salvas",
        "select_simulation": "Selecione uma configuração de simulação para carregar:",
        "choose_simulation": "-- Escolha a simulação --",
        "no_saved_sims": "Nenhuma simulação salva encontrada. Por favor, crie uma nova simulação.",
        
        // Setup
        "simulation_parameters": "Parâmetros da Simulação",
        "simulation_name": "Nome da Simulação:",
        "num_alt": "Número de Alternativas:",
        "num_crit": "Número de Critérios:",
        "num_instances": "Número de Instâncias de Simulação:",
        "save_parameters": "Salvar Parâmetros",
        "run_simulation": "Executar Simulação",
        "fill_all_fields": "Por favor preencha todos os parâmetros corretamente. Alternativas devem ser >= 2, critérios 3-7 e instâncias >= 100.",
        "save_success": "Configurações de simulação salvas com sucesso!",
        
        // Results
        "simulation_results": "Resultados da Simulação",
        "export_pdf": "Exportar PDF",
        
        // Dashboard Stats
        "simulation_parameters_short": "Métricas da Simulação",
        "Mean Questions": "Média de Perguntas Respondidas",
        "Standard Deviation": "Desvio Padrão",
        "percentile_quartiles": "Percentis",
        
        // Probability table
        "Questions Probability": "Probabilidade de Convergência",
        "Questions Count": "Perguntas Respondidas",
        "Probability": "Probabilidade (%)",
        "exactly_questions": "{count} Perguntas",
        "exactly_question": "{count} Pergunta",
        
        // Charts Titles
        "dist_chart_title": "Distribuição de Probabilidade do Número de Perguntas (%)",
        "percentile_chart_title": "Curva de Percentil de Número de Perguntas (0 a 1)",
        "evolution_chart_title": "Evolução de Valor e Perda Máxima (Regret) por Pergunta",
        "avg_global_val": "Valor Global Médio",
        "avg_regret": "Perda Máxima Média (Regret)",
        "percentile_axis": "Percentil (0 a 1)",
        "questions_axis": "Perguntas",
        
        // Trace Inspector
        "Sample Elicitation Trace": "Inspetor de Passo-a-Passo da Simulação",
        "Select Run": "Selecione a Execução:",
        "trace_question": "C{crit_i} vs C{crit_j} (Razão = {ratio})",
        "choice_a": "Opção A (C{crit_i} > r·C{crit_j})",
        "choice_b": "Opção B (C{crit_i} <= r·C{crit_j})",
        
        // Alerts
        "no_results_found": "Nenhum resultado encontrado. Por favor, execute uma simulação primeiro.",
        "pdf_gen_fail": "Falha ao gerar relatório PDF."
    }
};

// --- DOM Translation Utilities ---
function translateDOM() {
    const lang = localStorage.getItem('spear_sim_lang') || 'en';
    const dict = translations[lang] || translations.en;
    
    // Translate standard text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
                el.value = dict[key];
            } else {
                el.textContent = dict[key];
            }
        }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    // Translate dynamic continue options text (Saved on / Salvo em)
    const simulationSelect = document.getElementById('simulationSelect');
    if (simulationSelect) {
        const options = simulationSelect.querySelectorAll('.simulation-option');
        options.forEach(opt => {
            if (opt.textContent.includes('Saved on:')) {
                if (lang === 'pt') {
                    opt.textContent = opt.textContent.replace('Saved on:', 'Salvo em:');
                }
            } else if (opt.textContent.includes('Salvo em:')) {
                if (lang === 'en') {
                    opt.textContent = opt.textContent.replace('Salvo em:', 'Saved on:');
                }
            }
        });
    }

    // Update page title
    if (dict.system_title) {
        document.title = dict.system_title;
    }
}

function initializeLanguage() {
    let lang = localStorage.getItem('spear_sim_lang');
    if (!lang) {
        lang = 'en'; // Default
        localStorage.setItem('spear_sim_lang', lang);
    }
    updateLanguageUI(lang);
    translateDOM();
}

function updateLanguageUI(lang) {
    const langIcon = document.getElementById('langIcon');
    if (langIcon) {
        langIcon.textContent = lang === 'pt' ? '🇧🇷' : '🇺🇸';
    }
}

function toggleLanguage() {
    let lang = localStorage.getItem('spear_sim_lang') || 'en';
    lang = lang === 'en' ? 'pt' : 'en';
    localStorage.setItem('spear_sim_lang', lang);
    updateLanguageUI(lang);
    translateDOM();
    
    // If on results page, re-render charts and tables in the new language
    if (window.currentSimulationData) {
        renderResultsDashboard(window.currentSimulationData);
    }
}

// --- Theme Management ---
function initializeTheme() {
    let theme = localStorage.getItem('spear_sim_theme');
    if (!theme) {
        theme = 'light';
        localStorage.setItem('spear_sim_theme', theme);
    }
    updateThemeUI(theme);
}

function updateThemeUI(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeIcon) themeIcon.textContent = '🌙';
    } else {
        document.body.classList.remove('dark-theme');
        if (themeIcon) themeIcon.textContent = '☀️';
    }
}

function toggleTheme() {
    let theme = localStorage.getItem('spear_sim_theme') || 'light';
    theme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('spear_sim_theme', theme);
    updateThemeUI(theme);
}

// --- Chart Instances Trackers ---
let distChartInstance = null;
let percentileChartInstance = null;

// Global reference for results dataset
window.currentSimulationData = null;

function renderResultsDashboard(data) {
    window.currentSimulationData = data;
    const lang = localStorage.getItem('spear_sim_lang') || 'en';
    const dict = translations[lang] || translations.en;
    let isDark = document.body.classList.contains('dark-theme');
    const labelColor = isDark ? '#f3f4f6' : '#0f172a';
    const gridColor = isDark ? '#374151' : '#e2e8f0';

    // Show name of simulation
    const nameEl = document.getElementById('resSimName');
    if (nameEl && data.nome_simulacao) {
        nameEl.textContent = `${dict.simulation_results}: ${data.nome_simulacao}`;
    }

    // 1. Populate Statistics Table
    document.getElementById('meanQuestions').textContent = data.mean_questions.toFixed(2);
    document.getElementById('stdQuestions').textContent = data.std_questions.toFixed(2);
    
    // Fill percentiles
    document.getElementById('pct10').textContent = data.percentiles['10'].toFixed(0);
    document.getElementById('pct25').textContent = data.percentiles['25'].toFixed(0);
    document.getElementById('pct50').textContent = data.percentiles['50'].toFixed(0);
    document.getElementById('pct75').textContent = data.percentiles['75'].toFixed(0);
    document.getElementById('pct90').textContent = data.percentiles['90'].toFixed(0);
    document.getElementById('pct95').textContent = data.percentiles['95'].toFixed(0);
    document.getElementById('pct100').textContent = data.percentiles['100'].toFixed(0);

    // 2. Populate Questions Probability Table
    const tbody = document.querySelector('#probQuestionsTable tbody');
    tbody.innerHTML = '';
    
    data.questions_probability.forEach((prob, k) => {
        if (prob > 0) {
            const tr = document.createElement('tr');
            const labelKey = k === 1 ? 'exactly_question' : 'exactly_questions';
            const countLabel = dict[labelKey].replace('{count}', k);
            tr.innerHTML = `
                <td><strong>${countLabel}</strong></td>
                <td style="text-align: right;">${prob.toFixed(2)}%</td>
            `;
            tbody.appendChild(tr);
        }
    });

    // 3. Render Bar Chart - Questions Distribution
    const ctxDist = document.getElementById('decompositionChart');
    if (ctxDist) {
        if (distChartInstance) distChartInstance.destroy();
        
        const labels = Array.from({length: data.questions_probability.length}, (_, i) => {
            const key = i === 1 ? 'exactly_question' : 'exactly_questions';
            return dict[key].replace('{count}', i);
        });
        
        distChartInstance = new Chart(ctxDist, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: dict.Probability || 'Probability (%)',
                    data: data.questions_probability,
                    backgroundColor: '#2563eb',
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { ticks: { color: labelColor }, grid: { color: gridColor } },
                    y: { title: { display: true, text: '%', color: labelColor }, ticks: { color: labelColor }, grid: { color: gridColor } }
                }
            }
        });
    }

    // 4. Render Line Chart - Percentile Curve (0 to 1)
    const ctxPercentile = document.getElementById('percentileChart');
    if (ctxPercentile) {
        if (percentileChartInstance) percentileChartInstance.destroy();
        
        // Percentile axis from 0.00 to 1.00 (101 points)
        const pctLabels = Array.from({length: 101}, (_, i) => (i / 100).toFixed(2));
        
        percentileChartInstance = new Chart(ctxPercentile, {
            type: 'line',
            data: {
                labels: pctLabels,
                datasets: [{
                    label: dict.percentile_chart_title || 'Percentile Curve',
                    data: data.percentile_curve,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 0,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { 
                        title: { display: true, text: dict.percentile_axis || 'Percentile (0 to 1)', color: labelColor },
                        ticks: { color: labelColor, maxTicksLimit: 11 }, 
                        grid: { color: gridColor } 
                    },
                    y: { 
                        title: { display: true, text: dict.questions_axis || 'Questions', color: labelColor },
                        ticks: { color: labelColor }, 
                        grid: { color: gridColor } 
                    }
                }
            }
        });
    }


    // 6. Bind Trace Inspector Change & Initial Load
    const traceSelect = document.getElementById('traceRunSelect');
    if (traceSelect) {
        // Populate select menu options dynamically
        traceSelect.innerHTML = '';
        data.traces.forEach((_, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = `${lang === 'pt' ? 'Execução' : 'Run'} ${idx + 1}`;
            if (idx === 0) opt.selected = true;
            traceSelect.appendChild(opt);
        });

        // Clear listeners first by cloning and replacing
        const newSelect = traceSelect.cloneNode(true);
        traceSelect.parentNode.replaceChild(newSelect, traceSelect);
        
        newSelect.addEventListener('change', (e) => {
            renderTraceTable(parseInt(e.target.value));
        });
    }
    renderTraceTable(0); // Show Run 1 trace by default
}

// Populate Trace Table inside inspector
function renderTraceTable(runIdx) {
    if (!window.currentSimulationData || !window.currentSimulationData.traces) return;
    const trace = window.currentSimulationData.traces[runIdx];
    const lang = localStorage.getItem('spear_sim_lang') || 'en';
    const dict = translations[lang] || translations.en;
    
    const tbody = document.querySelector('#traceTable tbody');
    tbody.innerHTML = '';
    
    if (!trace || trace.length === 0) return;
    
    trace.forEach((stepLog) => {
        const tr = document.createElement('tr');
        
        // Question localization
        const qText = dict.trace_question
            .replace('{crit_i}', stepLog.crit_i)
            .replace('{crit_j}', stepLog.crit_j)
            .replace('{ratio}', stepLog.ratio.toFixed(2));
            
        // Choice localization
        const choiceKey = stepLog.choice === 'A' ? 'choice_a' : 'choice_b';
        const choiceText = dict[choiceKey]
            .replace('{crit_i}', stepLog.crit_i)
            .replace('{crit_j}', stepLog.crit_j)
            .replace('{ratio}', stepLog.ratio.toFixed(2));
            
        tr.innerHTML = `
            <td>${stepLog.step}</td>
            <td style="text-align: left;">${qText}</td>
            <td style="font-weight: 600; color: ${stepLog.choice === 'A' ? '#10b981' : '#f59e0b'};">${choiceText}</td>
            <td>${stepLog.active_count}</td>
            <td style="font-weight: 600;">Alt ${stepLog.leading_alt}</td>
            <td>${(stepLog.leading_prob * 100).toFixed(1)}%</td>
            <td>${stepLog.max_regret.toFixed(4)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Generate PDF Elicitation Report
function exportResultsToPDF() {
    if (!window.currentSimulationData) return;
    const data = window.currentSimulationData;
    const lang = localStorage.getItem('spear_sim_lang') || 'en';
    const dict = translations[lang] || translations.en;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const pageHeight = doc.internal.pageSize.height || 297;
    const pageWidth = doc.internal.pageSize.width || 210;
    const margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    let yPos = 20;

    const addFooter = (currentPage, totalPages) => {
        doc.setFontSize(8);
        doc.setFont("Helvetica", "normal");
        doc.setTextColor(150, 150, 150);
        doc.text(`SPEAR Decomposition Sim Report  |  ${data.nome_simulacao}`, margin, pageHeight - 10);
        doc.text(`${lang === 'pt' ? 'Página' : 'Page'} ${currentPage} of ${totalPages}`, pageWidth - margin - 20, pageHeight - 10);
    };

    // Header Banner
    doc.setFillColor(30, 58, 138); 
    doc.rect(margin, yPos, contentWidth, 18, 'F');
    
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(255, 255, 255);
    doc.text("SPEAR - DECOMPOSITION ELICITATION SIMULATION REPORT", margin + 5, yPos + 11);
    yPos += 26;

    // Simulation Metadata
    doc.setFontSize(10);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(50, 50, 50);
    doc.text(`Simulation Name: `, margin, yPos);
    doc.setFont("Helvetica", "normal");
    doc.text(data.nome_simulacao, margin + 35, yPos);
    yPos += 6;

    doc.setFont("Helvetica", "bold");
    doc.text(`Alternatives Count: `, margin, yPos);
    doc.setFont("Helvetica", "normal");
    doc.text(data.num_alt.toString(), margin + 35, yPos);

    doc.setFont("Helvetica", "bold");
    doc.text(`Criteria Count: `, margin + 70, yPos);
    doc.setFont("Helvetica", "normal");
    doc.text(data.num_crit.toString(), margin + 105, yPos);

    doc.setFont("Helvetica", "bold");
    doc.text(`Simulated Instances: `, margin + 135, yPos);
    doc.setFont("Helvetica", "normal");
    doc.text(data.n_inst.toLocaleString(), margin + 175, yPos);
    yPos += 12;

    // Section 1: Summary Statistics
    doc.setFontSize(11);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(30, 58, 138);
    doc.text("1. Questions Summary Statistics", margin, yPos);
    yPos += 4;

    const statsTableData = [
        ['Mean Questions Asked', data.mean_questions.toFixed(4)],
        ['Standard Deviation', data.std_questions.toFixed(4)],
        ['Percentile 10%', `${data.percentiles['10'].toFixed(0)} questions`],
        ['Percentile 25% (Q1)', `${data.percentiles['25'].toFixed(0)} questions`],
        ['Percentile 50% (Median)', `${data.percentiles['50'].toFixed(0)} questions`],
        ['Percentile 75% (Q3)', `${data.percentiles['75'].toFixed(0)} questions`],
        ['Percentile 90%', `${data.percentiles['90'].toFixed(0)} questions`],
        ['Percentile 95%', `${data.percentiles['95'].toFixed(0)} questions`],
        ['Percentile 100% (Max)', `${data.percentiles['100'].toFixed(0)} questions`]
    ];

    doc.autoTable({
        startY: yPos,
        margin: { left: margin },
        head: [['Statistical Metric', 'Result']],
        body: statsTableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 138] },
        styles: { fontSize: 9 }
    });
    yPos = doc.lastAutoTable.finalY + 12;

    // Section 2: Questions Count Probabilities
    doc.setFontSize(11);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(30, 58, 138);
    doc.text("2. Convergence Probability by Questions Count", margin, yPos);
    yPos += 4;

    const probTableData = [];
    data.questions_probability.forEach((prob, k) => {
        if (prob > 0) {
            probTableData.push([`${k} questions`, `${prob.toFixed(2)}%`]);
        }
    });

    doc.autoTable({
        startY: yPos,
        margin: { left: margin },
        head: [['Questions Answered', 'Probability']],
        body: probTableData,
        theme: 'striped',
        headStyles: { fillColor: [30, 58, 138] },
        styles: { fontSize: 9 }
    });
    yPos = doc.lastAutoTable.finalY + 12;

    // Page numbering
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        addFooter(i, totalPages);
    }

    doc.save(`${data.nome_simulacao.replace(/\s+/g, '_')}_Report.pdf`);
}

// --- DOM Event Handlers ---
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();

    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
    
    const langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.addEventListener('click', toggleLanguage);

    const currentPath = window.location.pathname;

    // ----------- SETUP PAGE BINDINGS -----------
    if (currentPath === '/setup') {
        const btnSave = document.getElementById('btnSaveSimulation');
        const btnRun = document.getElementById('btnRunSimulation');
        const warningDiv = document.getElementById('setupWarning');

        // Check if loading existing simulation from URL
        const urlParams = new URLSearchParams(window.location.search);
        const simId = urlParams.get('sim_id');
        if (simId) {
            fetch(`/api/load_simulation/${simId}`)
                .then(res => res.json())
                .then(resData => {
                    if (resData.success) {
                        const sim = resData.sim;
                        document.getElementById('loadedSimId').value = sim.id;
                        document.getElementById('simulationName').value = sim.nome_simulacao;
                        document.getElementById('numAlt').value = sim.num_alt;
                        document.getElementById('numCrit').value = sim.num_crit;
                        document.getElementById('numInstancias').value = sim.num_instancias;
                    }
                })
                .catch(err => console.error("Error loading simulation config:", err));
        }

        const collectParameters = () => {
            const numAlt = parseInt(document.getElementById('numAlt').value);
            const numCrit = parseInt(document.getElementById('numCrit').value);
            const numInstancias = parseInt(document.getElementById('numInstancias').value);
            const simName = document.getElementById('simulationName').value;
            const simId = document.getElementById('loadedSimId').value;

            return { numAlt, numCrit, numInstancias, simName, simId };
        };

        const validateParameters = (p) => {
            const lang = localStorage.getItem('spear_sim_lang') || 'en';
            const dict = translations[lang] || translations.en;

            if (isNaN(p.numAlt) || p.numAlt < 2 ||
                isNaN(p.numCrit) || p.numCrit < 3 || p.numCrit > 7 ||
                isNaN(p.numInstancias) || p.numInstancias < 100) {
                warningDiv.textContent = dict.fill_all_fields;
                warningDiv.style.display = 'block';
                return false;
            }
            warningDiv.style.display = 'none';
            return true;
        };

        if (btnSave) {
            btnSave.addEventListener('click', () => {
                const params = collectParameters();
                if (!validateParameters(params)) return;

                fetch('/api/save_simulation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        simId: params.simId ? parseInt(params.simId) : null,
                        simName: params.simName,
                        numAlt: params.numAlt,
                        numCrit: params.numCrit,
                        aditivo: 1, // default checked in DB
                        sobreclassificacao: 1, // default checked in DB
                        numInstancias: params.numInstancias
                    })
                })
                .then(res => res.json())
                .then(resData => {
                    if (resData.success) {
                        document.getElementById('loadedSimId').value = resData.simId;
                        const lang = localStorage.getItem('spear_sim_lang') || 'en';
                        alert(translations[lang].save_success);
                    } else {
                        alert("Error: " + resData.error);
                    }
                })
                .catch(err => alert("Error communicating with server: " + err));
            });
        }

        if (btnRun) {
            btnRun.addEventListener('click', () => {
                const params = collectParameters();
                if (!validateParameters(params)) return;

                // Show loading overlay
                const loadingOverlay = document.getElementById('loadingOverlay');
                if (loadingOverlay) loadingOverlay.style.display = 'flex';

                // Save parameters first
                fetch('/api/save_simulation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        simId: params.simId ? parseInt(params.simId) : null,
                        simName: params.simName,
                        numAlt: params.numAlt,
                        numCrit: params.numCrit,
                        aditivo: 1,
                        sobreclassificacao: 1,
                        numInstancias: params.numInstancias
                    })
                })
                .then(res => res.json())
                .then(saveRes => {
                    if (saveRes.success) {
                        document.getElementById('loadedSimId').value = saveRes.simId;
                    }
                    
                    // Call simulate API
                    return fetch('/api/simulate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            numAlt: params.numAlt,
                            numCrit: params.numCrit,
                            numInstancias: params.numInstancias,
                            aditivo: true,
                            sobreclassificacao: true
                        })
                    });
                })
                .then(res => res.json())
                .then(simRes => {
                    if (loadingOverlay) loadingOverlay.style.display = 'none';

                    if (simRes.success !== false) {
                        simRes.nome_simulacao = params.simName;
                        sessionStorage.setItem('surrogateSimResults', JSON.stringify(simRes));
                        window.location.href = '/results';
                    } else {
                        alert("Simulation Error: " + simRes.error);
                    }
                })
                .catch(err => {
                    if (loadingOverlay) loadingOverlay.style.display = 'none';
                    alert("Error running simulation: " + err);
                });
            });
        }
    }

    // ----------- CONTINUE PAGE BINDINGS -----------
    if (currentPath === '/continue') {
        const btnLoad = document.getElementById('btnLoadSimulation');
        if (btnLoad) {
            btnLoad.addEventListener('click', () => {
                const selectEl = document.getElementById('simulationSelect');
                const simId = selectEl.value;
                if (!simId) {
                    const lang = localStorage.getItem('spear_sim_lang') || 'en';
                    alert(lang === 'pt' ? 'Por favor selecione uma simulação primeiro.' : 'Please select a simulation first.');
                    return;
                }
                window.location.href = `/setup?sim_id=${simId}`;
            });
        }
    }

    // ----------- RESULTS PAGE BINDINGS -----------
    if (currentPath === '/results') {
        const rawResults = sessionStorage.getItem('surrogateSimResults');
        if (!rawResults) {
            const lang = localStorage.getItem('spear_sim_lang') || 'en';
            alert(translations[lang].no_results_found);
            window.location.href = '/setup';
            return;
        }

        const parsedData = JSON.parse(rawResults);
        renderResultsDashboard(parsedData);

        // Bind PDF export
        const pdfBtn = document.getElementById('btnExportPDF');
        if (pdfBtn) {
            pdfBtn.addEventListener('click', exportResultsToPDF);
        }
    }
});
