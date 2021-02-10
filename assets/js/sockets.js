import { handleSystemAnnounce, handleMessageAnnounce } from "./announce";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => socket = aSocket;

export const initSockets = (aSocket) => {
    const { events } = window;
    updateSocket(aSocket);
    aSocket.on(events.systemAnnounce, handleSystemAnnounce);
    aSocket.on(events.messageAnnounce, handleMessageAnnounce);
}