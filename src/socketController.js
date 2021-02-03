import events from "./events";

const socketController = socket => {
    socket.on(events.enter, () => socket.broadcast.emit(events.systemAnnounce, { message: `${socket.id} entered`}));
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" joined !!`});
    });
    socket.on(events.newMessage, ({ message }) => {
        socket.broadcast.emit(events.messageAnnounce, { message, nickname: socket.nickname || socket.id });
    });
    socket.on(events.disconnect, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" just leaved !!` });
    })
};

export default socketController;