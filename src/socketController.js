import events from "./events";

const socketController = socket => {
    // login    
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" joined !!`, color: "rgb(0, 122, 255)"});
    });
    socket.on(events.sendMessage, ({ message }) => {
        socket.broadcast.emit(events.messageAnnounce, { message, nickname: socket.nickname || socket.id });
    });
    // logout
    socket.on("disconnect", () => {
        if (socket.nickname) {
            socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}"  left !!!`, color: "rgb(255, 149, 0)"});
        }
    });
    socket.on(events.left, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" left !!!`, color: "rgb(255, 149, 0)"});
    });
    // reconnection due to lags
    socket.on(events.reconnection, ()=> {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" reconnected !`, color: "rgb(0, 122, 255)"});
    });
};

export default socketController;