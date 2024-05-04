// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import { LongPoll } from 'phoenix';
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import topbar from "../vendor/topbar"
import getHooks from "./hooks"
// import {socket} from "./hooks/plotChannel"

let hooks = getHooks();

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {params: {_csrf_token: csrfToken}, hooks})
liveSocket.enableDebug()

const socket = liveSocket.getSocket();
socket.timeout = 3000; // Timeout after 3s instead of 10s
liveSocket.connect();

// Show progress bar on live navigation and form submits
topbar.config({barColors: {0: "#29d"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

console.log(socket.channels);

const channel = socket.channels.find((e) => e.state === 'joining');
if (channel) {
    setTimeout(() => {
        if (channel.state === 'errored') {
            console.warn('LiveView connection failed. This could be due to a proxy or firewall blocking websockets. Falling back to long polling.');
            liveSocket.disconnect();
            const pollingLiveSocket = new LiveSocket('/live', Socket, {
                params: { _csrf_token: csrfToken },
                transport: LongPoll,
                hooks,
            });
            pollingLiveSocket.connect();
        }
    }, 3500);
}


// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

