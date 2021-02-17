const chatMessages = document.querySelector(".chatMessages");
const systemAnnounces = document.querySelector(".systemAnnounces");
import { appendMessage } from "./chat";

export function handleSystemAnnounce({ message, color, center = false }) {
    const div = document.createElement("div");
    div.innerHTML = message;
    div.style.backgroundColor = color;
    if(center) {
        div.className = "center"
    }
    systemAnnounces.appendChild(div);
    setTimeout(() => div.style.display = "none", 5000);

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