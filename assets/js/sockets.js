import { handleSystemAnnounce, handleMessageAnnounce } from "./announce";
import { handlePlayers } from "./players";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => socket = aSocket;

export const initSockets = (aSocket) => {
    updateSocket(aSocket);
    aSocket.on(window.events.systemAnnounce, handleSystemAnnounce);
    aSocket.on(window.events.messageAnnounce, handleMessageAnnounce);

    aSocket.on(window.events.updatePlyers, ({ players }) => handlePlayers(players));
}