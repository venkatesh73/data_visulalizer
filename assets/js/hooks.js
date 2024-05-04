import PlotlyInstance from "./hooks/plotHooks"

export default () => {
    let hooks = {
        PlotlyInstance
    }
    console.debug("Loaded hooks ....", hooks);
    return hooks;
}