import React, { useState } from 'react';
import PLot from './PLot';
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";

export default function Home() {
    const [isplot, setIsplot] = useState(false);
    const [plotComponent, setPlotComponent] = useState(null);
    const [eqdata, setEqdata] = useState({
        equation: '',
        ylabel: 'Y',
        xlabel: 'X',
        dstart: 0,
        dend: 10,
        dno: 10,
        linecolor: "red",
        mcolor: "black",
        mecolor: "black",
        linetype: 'normal'
    });

    const loadplot = async (e) => {
        e.preventDefault();

        if (!eqdata.equation.trim()) {
            alert("Please enter a valid equation.");
            return;
        }
        console.log(eqdata.linetype);

        setIsplot(false); // optional: reset

        try {
            const res = await fetch("http://localhost:8000/getplot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(eqdata),
            });

            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

            const data = await res.json();

            if (data.success) {
                setPlotComponent(<PLot figdata={data.figdata} success={true} />);
                setIsplot(true);
            } else {
                setPlotComponent(<PLot figdata={false} success={false} />);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setPlotComponent(<PLot figdata={false} success={false} />);
        }
    };

    const handleformchange = (e) => {
        const { name, value } = e.target;
        setEqdata((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center bg-main w-screen h-[calc(100vh-64px)] p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl h-full border rounded-lg shadow-lg">

                {/* Input Section */}
                <form
                    onSubmit={loadplot}
                    className="bg-light border-r-1 rounded-l-lg p-6 flex flex-col justify-between"
                >
                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="equation" className="block mb-2 font-semibold text-gray-800">
                                Enter Your Equation:
                            </label>
                            <input
                                type="text"
                                name="equation"
                                id="equation"
                                onChange={handleformchange}
                                className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex gap-2">
                            <div>
                                <label htmlFor="dstart" className="block mb-2 font-semibold text-gray-800">
                                    Start:
                                </label>
                                <input
                                    type="number"
                                    name="dstart"
                                    id="dstart"
                                    inputMode='numeric'
                                    min={-100}
                                    max={100}
                                    value={eqdata.dstart}
                                    onChange={handleformchange}
                                    className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="dend" className="block mb-2 font-semibold text-gray-800">
                                    End:
                                </label>
                                <input
                                    type="number"
                                    name="dend"
                                    id="dend"
                                    inputMode='numeric'
                                    min={0}
                                    max={100}
                                    value={eqdata.dend}
                                    onChange={handleformchange}
                                    className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label htmlFor="dno" className="block mb-2 font-semibold text-gray-800">
                                    No. of Dots:
                                </label>
                                <input
                                    type="number"
                                    name="dno"
                                    id="dno"
                                    inputMode="numeric"
                                    min={5}
                                    max={100}
                                    value={eqdata.dno}
                                    onChange={handleformchange}
                                    className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="xlabel" className="block mb-2 font-semibold text-gray-800">
                                X-Axis Label:
                            </label>
                            <input
                                type="text"
                                name="xlabel"
                                id="xlabel"
                                value={eqdata.xlabel}
                                onChange={handleformchange}
                                className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="ylabel" className="block mb-2 font-semibold text-gray-800">
                                Y-Axis Label:
                            </label>
                            <input
                                type="text"
                                name="ylabel"
                                id="ylabel"
                                value={eqdata.ylabel}
                                onChange={handleformchange}
                                className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-semibold text-gray-800">
                                Line Type:
                            </label>
                            <ToggleGroup
                                type="single"
                                defaultValue="normal"
                                value={eqdata.linetype}
                                onValueChange={(value) => {
                                    console.log("Toggle value changed:", value);
                                    setEqdata((prev) => ({
                                        ...prev,
                                        linetype: value || prev.linetype,
                                    }));
                                }}
                                className="bg-white"
                                variant="outline"
                                size="default"
                            >
                                <ToggleGroupItem
                                    value="normal"
                                    aria-label="Normal Line"
                                    className="data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:border data-[state=on]:border-black"
                                >
                                    Normal
                                </ToggleGroupItem>

                                <ToggleGroupItem
                                    value="smooth"
                                    aria-label="Smooth Line"
                                    className="data-[state=on]:bg-black data-[state=on]:text-white data-[state=on]:border data-[state=on]:border-black"
                                >
                                    Smooth
                                </ToggleGroupItem>
                            </ToggleGroup>

                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                type="submit"
                                className="my-btn bg-black p-2 rounded-lg w-1/2 text-lg font-medium text-white duration-200  ease-out "
                            >
                                PLOT
                            </button>
                        </div>
                    </div>
                </form>

                {/* Graph Display Section */}
                <div className=" text-white p-4 flex items-center justify-center text-lg font-medium min-h-[300px] col-span-2">
                    {isplot ? (
                        plotComponent
                    ) : (
                        <div className="text-center w-full h-full flex items-center justify-center rounded-md">
                            Let's Plot
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
