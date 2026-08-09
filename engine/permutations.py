import itertools
import numpy as np

def gerar_cases(numcrit: int) -> np.ndarray:
    """
    Generates all permutations for the criteria, sorted lexicographically,
    plus an extra dummy row for the equal weights case.
    
    Args:
        numcrit: Number of criteria.
        
    Returns:
        np.ndarray of shape (numcrit! + 1, numcrit) containing the permutations and dummy row.
    """
    base_array = list(range(1, numcrit + 1))
    perms = list(itertools.permutations(base_array))
    perms.append(tuple([0] * numcrit))
    return np.array(perms, dtype=int)

def calcular_pesos_roc(num_crit: int) -> np.ndarray:
    """
    Precomputes the ROC (Rank-Order Centroid) weights for each rank position.
    weights[0] is for the 1st rank, weights[num_crit-1] is for the last rank.
    Formula: W_i = (1/num_crit) * sum_{j=i}^{num_crit} (1/j)
    """
    weights = np.zeros(num_crit)
    for i in range(num_crit):
        soma = sum(1.0 / j for j in range(i + 1, num_crit + 1))
        weights[i] = (1.0 / num_crit) * soma
    return weights
