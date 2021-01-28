import express from "express";
import path from "path";
import socketIO from "socket.io";
import morgan from "morgan";

const PORT = 5006
const app = express();

const handleListening = () => console.log(`✔ Listening on PORT: ${PORT}`);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(morgan("dev"));

app.get("/", (req, res) => res.render("home"));

const server = app.listen(PORT, handleListening);
const io = socketIO(server);

io.on("connection", socket => {
  socket.on("enter", () => socket.broadcast.emit("systemAnnounce", { message: `${socket.id} entered`}))
  socket.on("newMessage", ({ message }) => {
      socket.broadcast.emit("messageAnnounce", { message, nickname: socket.nickname || socket.id });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
    socket.broadcast.emit("systemAnnounce", { message: `${socket.id} changed Nickname to "${socket.nickname}"`});
  });
});