import express from "express";
import path from "path";
import socketIO from "socket.io";
import morgan from "morgan";
import socketController from "./socketController";

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

io.on("connection", socket => socketController(socket));