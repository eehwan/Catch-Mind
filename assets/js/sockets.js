import { handleSystemAnnounce, handleMessageAnnounce, sendMessage } from "./announce";

let socket = null;

export const getSocket = () => window.socket;

export const initSockets = (aSocket) => {
    const { events } = window;
    socket = aSocket;
    socket.on(events.systemAnnounce, handleSystemAnnounce);
    socket.on(events.messageAnnounce, handleMessageAnnounce);
}