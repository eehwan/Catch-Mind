import { handleSystemAnnounce, handleMessageAnnounce } from "./announce";
import { beforePaint, beginPaint, handleColor, handleFill, handleClear } form "./drawing";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => socket = aSocket;

export const initSockets = (aSocket) => {
    updateSocket(aSocket);
    aSocket.on(window.events.systemAnnounce, handleSystemAnnounce);
    aSocket.on(window.events.messageAnnounce, handleMessageAnnounce);

    
    aSocket.on(window.events.beforePaint, ({ x, y }) => beforePaint(x, y));
    aSocket.on(window.events.beginPaint, ({ x, y }) => beginPaint(x, y));
    aSocket.on(window.events.changeColor, ({ color }) => handleColor(color));
    aSocket.on(window.events.fill, handleFill);
    aSocket.on(window.events.clear, handleClear);

    aSocket.on(window.events.updateSockets, ({ sockets }) => console.log(sockets));
}