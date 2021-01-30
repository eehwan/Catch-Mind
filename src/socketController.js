const socketController = socket => {
    socket.on("enter", () => socket.broadcast.emit("systemAnnounce", { message: `${socket.id} entered`}))
      socket.on("newMessage", ({ message }) => {
          socket.broadcast.emit("messageAnnounce", { message, nickname: socket.nickname || socket.id });
      });
    socket.on("setNickname", ({ nickname }) => {
      socket.nickname = nickname;
      socket.broadcast.emit("systemAnnounce", { message: `${socket.id} changed Nickname to "${socket.nickname}"`});
    });
};

export default socketController;