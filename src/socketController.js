import events from "./events";

const socketController = socket => {
    socket.on(events.enter, () => socket.broadcast.emit(events.systemAnnounce, { message: `${socket.id} entered`}));
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" joined !!`, color: "rgb(0, 122, 255)"});
    });
    socket.on(events.sendMessage, ({ message }) => {
        socket.broadcast.emit(events.messageAnnounce, { message, nickname: socket.nickname || socket.id });
    });
    socket.on(events.disconnect, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" left !!`, color: "rgb(255, 149, 0)"});
    });
    socket.on(events.reconnecting, ()=> {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" reconnecting ...`, color: "rgb(25, 125, 55)"});
    });   
    socket.on(events.reconnection, ()=> {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" reconnected !!`, color: "rgb(0, 122, 255)"});
    });
};

export default socketController;