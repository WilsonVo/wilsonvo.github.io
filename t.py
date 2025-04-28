import numpy as np

# Coefficients: [3e-24, 5e-7, 0, 1]
coeffs = [3e-24, 5e-7, 0, 1]
roots = np.roots(coeffs)
print(roots)
