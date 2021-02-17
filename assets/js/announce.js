const chatMessages = document.querySelector(".chatMessages");
const systemAnnounces = document.querySelector(".systemAnnounces");
const body = document.querySelector("body");
let gameAnnounce = document.querySelector(".gameAnnounce");
import { appendMessage } from "./chat";

export function handleGameAnnounce({ message, color }) {
    if (gameAnnounce) {
        body.removeChild(gameAnnounce);
    }
    const div = document.createElement("div");
    div.className = "gameAnnounce";
    div.innerHTML = message;
    div.style.backgroundColor = color;
    body.appendChild(div);

    const li = document.createElement("li");
    li.innerHTML = message;
    li.className = "gameAnnounce";
    chatMessages.appendChild(li);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

export function handleSystemAnnounce({ message, color }) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.style.backgroundColor = color;
    systemAnnounces.appendChild(div);
    setTimeout(() => div.style.display = "none", 3000);

    const li = document.createElement("li");
    li.innerHTML = message;
    li.className = "systemMessage";
    chatMessages.appendChild(li);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    appendMessage(message, nickname);
}