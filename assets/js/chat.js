const chatMessages = document.querySelector(".chatMessages");
const chatForm = document.querySelector("#chatForm");

const appendMessage = (text, nickname) => {
    const li = document.createElement("li");
    li.className = nickname? "other" : "self";
    li.innerHTML = `${nickname ? nickname : "You"} : ${text}`;
    chatMessages.appendChild(li);
}

const handleChatSubmit = (e) => {
    e.preventDefault();
    const chatInput = document.querySelector("#chatInput");
    appendMessage(chatInput.value);
    chatInput.value = ""
}

if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmit);
}