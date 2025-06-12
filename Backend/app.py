from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sympy as sp
import numpy as np
import matplotlib.pyplot as plt
import mpld3
from scipy.interpolate import make_interp_spline
from dotenv import load_dotenv
import os

load_dotenv()

ORIGINS=os.getenv("FRONTEND")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_figdata(eq):
    x = sp.Symbol("x")

    try:
        expr = sp.sympify(eq.get("equation", None))
    except (sp.SympifyError, TypeError):
        raise ValueError("Equation is not a valid expression in x")

    f = sp.lambdify(x, expr, modules=["numpy"])

    x_data = np.linspace(int(eq.get("dstart")), int(eq.get("dend")), int(eq.get("dno")))
    y_data = f(x_data)
    
    marker="o"
    if eq.get("linetype",None)=="smooth":
        x_new=np.linspace(x_data.min(),x_data.max(),300)
        spline = make_interp_spline(x_data, y_data, k=3)
        y_new=spline(x_new)
        x_data,y_data=x_new,y_new
        marker=""
    
    # x_new = np.linspace(x.min(), x.max(), 300)  # Smooth 300-point curve
    # spline = make_interp_spline(x, y, k=3)  # k=3 for cubic spline
    # y_smooth = spline(x_new)

    fig, ax = plt.subplots(figsize=(6, 4))
    ax.plot(
        x_data, y_data,
        label=f"y = {eq.get('equation', None)}",
        color="red",
        linestyle="-",
        linewidth=2,
        marker=marker,
        markersize=5,
        markerfacecolor="black",
        markeredgecolor="black",
        alpha=0.8
    )

    ax.set_xlabel(eq.get("xlabel", "x"))
    ax.set_ylabel(eq.get("ylabel", "y"))
    ax.set_title(f"Plot of Equation: {eq.get('equation', None)}")

    ax.grid(
        True,
        which='both',
        axis='both',
        color='gray',
        linestyle='--',
        linewidth=0.7,
        alpha=0.6
    )

    ax.legend()
    figdata = mpld3.fig_to_dict(fig)
    plt.close(fig)

    return figdata

@app.post("/getplot")
async def send_plot(request: Request):
    data = await request.json()
    if data:
        try:
            return {'success': True, 'figdata': get_figdata(data)}
        except Exception as e:
            return {'success': False, 'Error': str(e)}
    else:
        return {'success': False, 'Error': "Unable to receive data"}
    
if __name__=="__main__":
    import uvicorn
    uvicorn.run(app,host="0.0.0.0",port=5000)
