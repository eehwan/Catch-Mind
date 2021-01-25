import express from "express";
import path from "path";
import socketIO from "socket.io";

const PORT = 5006
const app = express();

const handleListening = () => console.log(`✔ Listening on PORT: ${PORT}`);

app.listen(PORT, handleListening);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.resolve(__dirname, "static")));
app.get("/", (req, res) => res.render("home"));