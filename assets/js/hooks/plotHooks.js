import {initPlot} from "../plot"
import useChannel from "./plotChannel"

const init = () => {
    const plotElements = document.querySelectorAll('#plot-container [id^="plot-"');
    for (let i = 0; i < plotElements.length; i += 1) {
        const plotId = plotElements[i].id;
        const plotEl = document.getElementById(plotId);
        if (plotEl) {
            const data = plotEl.dataset.payload;
            initPlot(plotEl, data);
            useChannel("plot:" + plotId);
        }
    }
}

const PlotlyInstance = {
    mounted() {
        this.handleEvent("updateOnHooks", () => init());
    }
}

export default PlotlyInstance;