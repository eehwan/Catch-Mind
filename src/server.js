import express from "express";
import path from "path";
import socketIO from "socket.io";
import morgan from "morgan";
import socketController from "./socketController";
import dotenv from "dotenv";
import events from "./events";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

const handleListening = () => {
    const today = new Date();
    console.log(`✔ Listening on PORT: ${PORT} // ${today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()}`);
}

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.resolve(__dirname, "static")));
app.use(morgan("dev"));

app.get("/", (req, res) => res.render("home", { events: JSON.stringify(events) }));

const server = app.listen(PORT, handleListening);

const io = socketIO(server);
io.on("connection", socket => socketController(socket, io));