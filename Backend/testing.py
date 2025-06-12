import numpy as np
import matplotlib.pyplot as plt
from scipy.interpolate import make_interp_spline

# Sample data (sparse)
x = np.array([0, 1, 2, 3, 4, 5])
y = np.array([0, 1, 0, 1, 0, 1])

# Interpolation
x_new = np.linspace(x.min(), x.max(), 300)  # Smooth 300-point curve
spline = make_interp_spline(x, y, k=3)  # k=3 for cubic spline
y_smooth = spline(x_new)

# Plotting
plt.figure(figsize=(6, 4))
plt.plot(x_new, y_smooth, label="Smooth Curve", color="red")
plt.scatter(x, y, color="black", label="Original Points")
plt.legend()
plt.grid(True)
plt.title("Smooth Curve with Interpolation")
plt.show()
