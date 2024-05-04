import {Socket} from "phoenix"
import {updatePlot} from "../plot"

const useChannel = (topic) => {
    let socket = new Socket("/socket", {params: {token: window.userToken}})
    socket.connect()

    let channel = socket.channel(topic, {token: window.userToken})
    channel.join()
        .receive("ok", resp => { console.log("Joined successfully", resp) })
        .receive("error", resp => { console.log("Unable to join", resp) })

    channel.on("plotUpdated", (response) => {
        const payload = response.data[0];
        updatePlot(payload.id, payload);
    });

    return channel
}

export default useChannel