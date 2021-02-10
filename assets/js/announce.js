const chatMessages = document.querySelector(".chatMessages");
const systemAnnounces = document.querySelector(".systemAnnounces");
import { appendMessage } from "./chat";

export function handleSystemAnnounce({ message, color }) {
    const div = document.createElement("div");
    div.innerText = message;
    div.style.backgroundColor = color;
    systemAnnounces.appendChild(div);
    setTimeout(() => div.style.display = "none", 2000);

    const li = document.createElement("li");
    li.innerText = message;
    li.className = "systemMessage";
    // li.style.color = "rgb(225, 25, 25)";
    // li.style.fontWeight = "bolder";
    chatMessages.appendChild(li);
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    appendMessage(message, nickname);
}