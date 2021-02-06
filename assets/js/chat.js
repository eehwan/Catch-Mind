const chatMessages = document.querySelector(".chatMessages");
const chatForm = document.querySelector("chatForm");

const handleChatSubmit = (e) => {
    e.preventDefault();
    const chatInput = document.querySelector("chatInput");
    const li = document.createElement(li);
    li.innerText = `You: ${chatInput.value}`;
    chatForm.appendChild(li);
    chatInput.value = ""
}

if (chatForm) {
    chatForm.addEventListener("submit", handleChatSubmit);
}