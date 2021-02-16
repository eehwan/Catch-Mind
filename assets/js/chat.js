import { getSocket } from "./sockets";

const chatMessages = document.querySelector(".chatMessages");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");

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
    if (chatInput.value) {
        appendMessage(chatInput.value);
        getSocket().emit(window.events.sendMessage, { message: chatInput.value });
        chatInput.value = "";
    }
}
export const enableChat = () => {
    chatInput.disabled = false;
    chatForm.addEventListener("submit", handleChatSubmit);
};
export const disableChat = () => {
    chatInput.disabled = true;
    chatForm.removeEventListener("submit", handleChatSubmit);
};
enableChat();