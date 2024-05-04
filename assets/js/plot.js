import Plotly from "plotly.js-dist";

export const initPlot = async (plotEl, payload) => {
    Plotly.newPlot(plotEl, payload, {}, {displayModeBar: false});
}

export const updatePlot = async (plotId, payload) => {
    const plotEl = document.getElementById("plot-" + plotId);
    if (!plotEl) {return;}
    Plotly.newPlot(plotEl, [payload], {displayModeBar: false});
}

export default {
    initPlot,
    updatePlot
}