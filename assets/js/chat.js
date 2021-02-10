import { getSocket } from "./sockets";

const chatMessages = document.querySelector(".chatMessages");
const chatForm = document.querySelector("#chatForm");

export const appendMessage = (message, nickname) => {
    const author = document.createElement("span");
    author.className = nickname? "others" : "self";
    author.innerText = `${nickname? nickname : "You"} : `;
    const text = document.createElement("span");
    text.className = "text";
    text.innerText = message;
    const li = document.createElement("li");
    li.appendChild(author);
    li.appendChild(text);
    chatMessages.appendChild(li);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const handleChatSubmit = (e) => {
    e.preventDefault();
    const chatInput = document.querySelector("#chatInput");
    if (chatInput.value) {
        appendMessage(chatInput.value);
        getSocket().emit(window.events.sendMessage, { message: chatInput.value });
        chatInput.value = "";
    }
}

if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmit);
}