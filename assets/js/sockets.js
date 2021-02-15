import { handleSystemAnnounce, handleMessageAnnounce } from "./announce";
import { handleBeforePaint, handleBeginPaint, handleClear, handleFill } from "./drawing";
import { handlePlayers } from "./players";

let socket = null;

export const getSocket = () => socket;

export const updateSocket = (aSocket) => socket = aSocket;

export const initSockets = (aSocket) => {
    updateSocket(aSocket);
    socket = aSocket;
    socket.on(window.events.systemAnnounce, handleSystemAnnounce);
    socket.on(window.events.messageAnnounce, handleMessageAnnounce);

    socket.on(window.events.beforePaint, handleBeforePaint);
    socket.on(window.events.beginPaint, handleBeginPaint);
    socket.on(window.events.fill, handleFill);
    socket.on(window.events.clear, handleClear);

    socket.on(window.events.updatePlyers, ({ players }) => handlePlayers(players));
    socket.on(window.events.gameStart, ({ painter, word }) => console.log(`${painter} : ${word}`));
}