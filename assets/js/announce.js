const body = document.querySelector("body");
const announces = document.querySelector("#jsAnnounce");
const chatMessages = document.querySelector(".chatMessages");
const systemAnnounces = document.querySelector(".systemAnnounces");
import { appendMessage } from "./chat";

export function handleSystemAnnounce({ message, color }) {
    const div = document.createElement("div");
    div.innerText = message;
    div.style.backgroundColor = color;
    systemAnnounces.appendChild(div);
    setTimeout(() => div.style.display = "none", 2000);
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    appendMessage(message, nickname);
}