import numpy as np
import time
from .permutations import gerar_cases, calcular_pesos_roc

def run_simulation(num_alt: int, num_crit: int, n_inst: int = 10000, 
                   aditivo: bool = True, sobreclassificacao: bool = True):
    """
    Executes the Decomposition Elicitation Heuristic Simulation across n_inst instances,
    utilizing a highly optimized vectorized NumPy engine.
    
    Returns a dictionary of statistics for the Results page.
    """
    # 1. Permutations & ROC weights
    cases_ordem_crit = gerar_cases(num_crit)
    
    # We ignore the equal-weights permutation (the last row) for strict decomposition
    strict_cases = cases_ordem_crit[:-1, :]
    num_strict_cases = strict_cases.shape[0]
    
    roc_weights = calcular_pesos_roc(num_crit)
    
    # Precompute weights for each case
    peso_crit = np.zeros((num_strict_cases, num_crit))
    for k in range(num_strict_cases):
        for i in range(num_crit):
            peso_crit[k, strict_cases[k, i] - 1] = roc_weights[i]
            
    # 2. Calculate quotients/ratios between weights (descending order)
    ratios = []
    for a in range(num_crit):
        for b in range(a + 1, num_crit):
            r = roc_weights[b] / roc_weights[a]
            if not any(abs(r - existing) < 1e-5 for existing in ratios):
                ratios.append(r)
                
    # 3. Generate all candidate questions: (crit_i, crit_j, ratio)
    questions = []
    for i in range(num_crit):
        for j in range(num_crit):
            if i == j: continue
            for r in ratios:
                questions.append((i, j, r))
                
    num_questions = len(questions)
    
    # Precompute question masks: question_mask[q, p] is True if w_i > r * w_j for permutation p
    question_mask = np.zeros((num_questions, num_strict_cases), dtype=bool)
    for q_idx, (i, j, r) in enumerate(questions):
        w_i = peso_crit[:, i]
        w_j = peso_crit[:, j]
        question_mask[q_idx, :] = w_i > r * w_j
        
    # Accumulators for simulation results
    questions_count_list = []
    
    # Evolution arrays (fixed max size 30 steps is safe since max questions <= 15 for N=7)
    MAX_STEPS = 30
    total_val_evolution = np.zeros(MAX_STEPS)
    total_regret_evolution = np.zeros(MAX_STEPS)
    
    # Trace log for first 5 runs
    traces = []
    
    # 4. Simulation Loop
    for inst in range(n_inst):
        # Generate random normalized consequence matrix
        matriz_conseq = np.random.rand(num_alt, num_crit)
        c_min = np.min(matriz_conseq, axis=0, keepdims=True)
        c_max = np.max(matriz_conseq, axis=0, keepdims=True)
        diff = c_max - c_min
        diff[diff == 0] = 1.0
        matriz_conseq_norm = (matriz_conseq - c_min) / diff
        
        # Calculate global values of alternatives across all strict cases: (num_strict_cases, num_alt)
        resultado = np.dot(peso_crit, matriz_conseq_norm.T)
        winners = np.argmax(resultado, axis=1) # size: num_strict_cases
        
        # Precompute one-hot matrix for winners: (num_strict_cases, num_alt)
        winner_one_hot = (winners[:, None] == np.arange(num_alt)).astype(float)
        
        # Elicitation loop state
        active_perms = np.ones(num_strict_cases, dtype=bool)
        steps = 0
        
        # Evolution history for this instance
        inst_val_evolution = np.zeros(MAX_STEPS)
        inst_regret_evolution = np.zeros(MAX_STEPS)
        
        converged = False
        final_val = 0.0
        t_stop = -1
        
        inst_trace = []
        
        for t in range(MAX_STEPS):
            active_idx = np.where(active_perms)[0]
            active_winners = winners[active_idx]
            
            if len(active_winners) == 0:
                # Fallback check (should not occur)
                if not converged:
                    converged = True
                    t_stop = t
                inst_val_evolution[t] = final_val
                inst_regret_evolution[t] = 0.0
                continue
                
            first_winner = active_winners[0]
            
            # Check convergence (all active permutations agree on winner)
            if np.all(active_winners == first_winner):
                if not converged:
                    converged = True
                    t_stop = t
                    final_val = np.mean(resultado[active_perms, first_winner])
                inst_val_evolution[t] = final_val
                inst_regret_evolution[t] = 0.0
                continue
                
            if converged:
                inst_val_evolution[t] = final_val
                inst_regret_evolution[t] = 0.0
                continue
                
            # Identify leading alternative and stats
            counts = np.bincount(active_winners, minlength=num_alt)
            a_lead = np.argmax(counts)
            
            # Global value & regret metrics for this step
            avg_val = np.mean(resultado[active_perms, a_lead])
            avg_regret = np.mean(resultado[active_perms, winners[active_perms]] - resultado[active_perms, a_lead])
            
            inst_val_evolution[t] = avg_val
            inst_regret_evolution[t] = avg_regret
            
            # Slice masks and one-hot matrices for active permutations only
            question_mask_active = question_mask[:, active_idx]
            winner_one_hot_active = winner_one_hot[active_idx]
            
            # Evaluate all candidate questions in a single matrix multiplication
            counts_A = np.dot(question_mask_active, winner_one_hot_active)
            
            total_counts = np.sum(winner_one_hot_active, axis=0)
            counts_B = total_counts[None, :] - counts_A
            
            len_A = np.sum(question_mask_active, axis=1)
            len_B = len(active_winners) - len_A
            
            valid_mask = (len_A > 0) & (len_B > 0)
            
            if not np.any(valid_mask):
                # No valid question splits the population anymore
                converged = True
                t_stop = t
                final_val = avg_val
                inst_val_evolution[t] = final_val
                inst_regret_evolution[t] = 0.0
                continue
                
            max_prob_A = np.zeros(num_questions)
            max_prob_B = np.zeros(num_questions)
            
            max_prob_A[valid_mask] = np.max(counts_A[valid_mask], axis=1) / len_A[valid_mask]
            max_prob_B[valid_mask] = np.max(counts_B[valid_mask], axis=1) / len_B[valid_mask]
            
            min_max = np.zeros(num_questions) - 1.0
            min_max[valid_mask] = np.minimum(max_prob_A[valid_mask], max_prob_B[valid_mask])
            
            best_q_idx = np.argmax(min_max)
            
            if min_max[best_q_idx] < 0:
                converged = True
                t_stop = t
                final_val = avg_val
                inst_val_evolution[t] = final_val
                inst_regret_evolution[t] = 0.0
                continue
                
            # Log trace details for all runs
            q_info = questions[best_q_idx]
            inst_trace.append({
                'step': t,
                'crit_i': int(q_info[0] + 1),
                'crit_j': int(q_info[1] + 1),
                'ratio': float(q_info[2]),
                'active_count': int(len(active_winners)),
                'leading_alt': int(a_lead + 1),
                'leading_prob': float(counts[a_lead] / len(active_winners)),
                'max_regret': float(avg_regret)
            })
                
            # Simulate response: 50/50 choice
            chose_A = np.random.rand() < 0.5
            inst_trace[-1]['choice'] = 'A' if chose_A else 'B'
                
            if chose_A:
                active_perms = active_perms & question_mask[best_q_idx]
            else:
                active_perms = active_perms & ~question_mask[best_q_idx]
                
            steps += 1
            
        questions_count_list.append(t_stop if converged else steps)
        
        # Add to total evolution
        total_val_evolution += inst_val_evolution
        total_regret_evolution += inst_regret_evolution
        
        traces.append(inst_trace)
            
    # Calculate statistics
    questions_count_list = np.array(questions_count_list)
    mean_q = float(np.mean(questions_count_list))
    std_q = float(np.std(questions_count_list))
    
    percentiles_values = np.percentile(questions_count_list, [10, 25, 50, 75, 90, 95, 100])
    percentiles_dict = {
        '10': float(percentiles_values[0]),
        '25': float(percentiles_values[1]),
        '50': float(percentiles_values[2]),
        '75': float(percentiles_values[3]),
        '90': float(percentiles_values[4]),
        '95': float(percentiles_values[5]),
        '100': float(percentiles_values[6])
    }
    
    # Cumulative Percentile Curve (0 to 1 with 101 points)
    percentile_curve = np.percentile(questions_count_list, np.arange(101)).tolist()
    
    # Probability distribution of converging in exactly K questions
    max_q_count = int(np.max(questions_count_list))
    dist_counts = np.bincount(questions_count_list)
    dist_prob = (dist_counts / n_inst * 100).tolist()
    
    # Average evolution per step
    avg_val_evolution = (total_val_evolution / n_inst).tolist()
    avg_regret_evolution = (total_regret_evolution / n_inst).tolist()
    
    # We find the step index where regret stabilizes at 0.0 to slice the evolution curves nicely
    # This prevents the evolution charts from showing a long flat line at the end
    slice_idx = MAX_STEPS
    for idx in range(MAX_STEPS):
        if avg_regret_evolution[idx] < 1e-6:
            slice_idx = min(idx + 3, MAX_STEPS) # keep a few points after convergence
            break
            
    return {
        'success': True,
        'num_alt': num_alt,
        'num_crit': num_crit,
        'n_inst': n_inst,
        
        # Summary statistics
        'mean_questions': mean_q,
        'std_questions': std_q,
        'percentiles': percentiles_dict,
        
        # Distribution / Probabilities
        'questions_probability': dist_prob,
        
        # Cumulative percentile curve
        'percentile_curve': percentile_curve,
        
        # Evolution curves
        'val_evolution': avg_val_evolution[:slice_idx],
        'regret_evolution': avg_regret_evolution[:slice_idx],
        
        # Sample traces
        'traces': traces
    }
