import React, { useRef, useMemo } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from "chart.js";

import zoomPlugin from "chartjs-plugin-zoom";
import { Line } from "react-chartjs-2";
import jsPDF from "jspdf";
import "chartjs-adapter-date-fns";

import {
    FiDownload,
    FiZoomIn,
    FiZoomOut,
    FiRefreshCw
} from "react-icons/fi";

import { MdPictureAsPdf } from "react-icons/md";

ChartJS.register(
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    zoomPlugin
);

const LiveChart = ({
    data = [],
    title = "",
    lineWidth = 1,
    controls = {}
}) => {
    const chartRef = useRef();

    // 🔄 Transform data
    const chartData = useMemo(() => {
        const datasets = data.map((serie) => {
            const lastX = serie["x-axis"].slice(-100);
            const lastY = serie["y-axis"].slice(-100);

            const formatted = lastX.map((x, i) => ({
                x: new Date(x),
                y: lastY[i]
            }));

            return {
                label: serie.seriesName,
                data: formatted,
                borderColor: serie.color || "#3b82f6",
                backgroundColor: serie.color || "#3b82f6",
                borderWidth: 2,
                tension: 0.4,
                cubicInterpolationMode: "monotone",
                fill: false,
                stepped: false
            };
        });

        return { datasets };
    }, [data, lineWidth]);

    // ⚙️ Options
    const options = {
        responsive: true,
        animation: false,

        interaction: {
            mode: "index",
            intersect: false
        },

        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 15,
                    font: {
                        size: 12,
                        weight: "600"
                    },
                    color: "#6b7280"
                }
            },

            zoom: {
                pan: { enabled: controls.pan ?? true, mode: "x" },
                zoom: {
                    wheel: { enabled: controls.zoomEnabled ?? true },
                    pinch: { enabled: controls.zoomEnabled ?? true },
                    mode: "x"
                }
            }
        },

        layout: {
            padding: 15
        },

        scales: {
            x: {
                type: "time",
                grid: {
                    display: true,
                    color: "rgba(209, 213, 219, 0.3)",
                    drawBorder: false
                },
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: "rgba(209, 213, 219, 0.3)",
                    drawBorder: false
                },
                ticks: {
                    color: "#9ca3af",
                    font: {
                        size: 11
                    }
                }
            }
        },

        elements: {
            point: {
                radius: 3,
                hitRadius: 20,
                hoverRadius: 6,
                hoverBorderWidth: 2
            }
        }
    };

    // 🔘 Controls
    const zoomIn = () => chartRef.current.zoom(1.2);
    const zoomOut = () => chartRef.current.zoom(0.8);
    const resetZoom = () => chartRef.current.resetZoom();

    const downloadPNG = () => {
        const url = chartRef.current.toBase64Image();
        const a = document.createElement("a");
        a.href = url;
        a.download = `${title}.png`;
        a.click();
    };

    const downloadPDF = () => {
        const pdf = new jsPDF();
        const img = chartRef.current.toBase64Image();
        pdf.addImage(img, "PNG", 10, 10, 180, 100);
        pdf.save(`${title}.pdf`);
    };

    return (
        <div className="w-full mx-auto rounded-xl bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 rounded-t-xl border-b border-gray-200">
                <div>
                    <h3 className="font-bold text-lg text-gray-900 tracking-wide">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Real-time analytics dashboard</p>
                </div>

                {/* Toolbar */}
                <div className="flex items-center gap-3">

                    {controls.download && (
                        <>
                            <button
                                onClick={downloadPNG}
                                title="Download PNG"
                                className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                            >
                                <FiDownload className="text-base" />
                            </button>

                            <button
                                onClick={downloadPDF}
                                title="Download PDF"
                                className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                            >
                                <MdPictureAsPdf className="text-base" />
                            </button>
                        </>
                    )}

                    {controls.zoomin && (
                        <button
                            onClick={zoomIn}
                            title="Zoom In"
                            className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                            <FiZoomIn className="text-base" />
                        </button>
                    )}

                    {controls.zoomout && (
                        <button
                            onClick={zoomOut}
                            title="Zoom Out"
                            className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                            <FiZoomOut className="text-base" />
                        </button>
                    )}

                    {controls.reset && (
                        <button
                            onClick={resetZoom}
                            title="Reset View"
                            className="p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all duration-300 transform hover:scale-105"
                        >
                            <FiRefreshCw className="text-base" />
                        </button>
                    )}

                </div>
            </div>

            {/* Chart Container */}
            <div className="p-6 bg-white">
                <Line ref={chartRef} data={chartData} options={options} />
            </div>

        </div>
    );
};

export default LiveChart;