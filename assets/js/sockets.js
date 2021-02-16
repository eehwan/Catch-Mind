import { handleSystemAnnounce, handleMessageAnnounce } from "./announce";
import { handleBeforePaint, handleBeginPaint, handleClear, handleFill } from "./drawing";
import { handleGameEnd, handleGameStart, handlePainter } from "./game";
import { handlePlayers } from "./usersInfo";

let socket = null;

export const getSocket = () => socket;

// export const updateSocket = (aSocket) => socket = aSocket;

export const initSockets = (aSocket) => {
    socket = aSocket;
    socket.on(window.events.systemAnnounce, handleSystemAnnounce);
    socket.on(window.events.messageAnnounce, handleMessageAnnounce);

    socket.on(window.events.beforePaint, handleBeforePaint);
    socket.on(window.events.beginPaint, handleBeginPaint);
    socket.on(window.events.fill, handleFill);
    socket.on(window.events.clear, handleClear);

    socket.on(window.events.updatePlyers, handlePlayers);
    socket.on(window.events.gameStart, handleGameStart);
    socket.on(window.events.gameEnd, handleGameEnd);
    socket.on(window.events.painter, handlePainter);
}