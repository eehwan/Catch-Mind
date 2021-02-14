import events from "./events";

let sockets = [];
const socketController = (socket, io) => {
    // login    
    socket.on(events.setNickname, ({ nickname }) => {
        while (sockets.map(socket=>socket.nickname).includes(nickname)) {
            nickname = nickname + "!";
        }
        socket.nickname = nickname;
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" joined !!`, color: "rgb(0, 122, 255)"});

        sockets.push({ id: socket.id, nickname: socket.nickname });
        io.emit(events.updateSockets, { sockets });
    });
    socket.on(events.sendMessage, ({ message }) => {
        socket.broadcast.emit(events.messageAnnounce, { message, nickname: socket.nickname || socket.id });
    });
    // logout
    socket.on("disconnect", () => {
        if (socket.nickname) {
            socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}"  left !!!`, color: "rgb(255, 149, 0)"});

            sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
            io.emit(events.updateSockets, { sockets });
        }
    });
    socket.on(events.left, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" left !!!`, color: "rgb(255, 149, 0)"});
    });
    // reconnection due to lags
    socket.on(events.reconnection, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" reconnected !`, color: "rgb(0, 122, 255)"});
    });
    // drawing
    socket.on(events.beforePaint, ({ x, y }) => {
        socket.broadcast.emit(events.beforePaint, { x, y });
    });
    socket.on(events.beginPaint, ({ x, y }) => {
        socket.broadcast.emit(events.beginPaint, { x, y });
    });
    socket.on(events.changeColor, ({ color }) => {
        socket.broadcast.emit(events.changeColor, { color });
    });
    socket.on(events.fill, () => socket.broadcast.emit(events.fill));
    socket.on(events.clear, () => socket.broadcast.emit(events.clear));
};

export default socketController;