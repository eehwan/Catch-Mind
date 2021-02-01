const announces = document.querySelector("#jsAnnounce");
const systemAnnounces = document.querySelector(".systemAnnounces");
export function handleSystemAnnounce({ message }) {
    const systemAnnounce = document.createElement("div");
    systemAnnounce.innerText = message;
    systemAnnounces.appendChild(systemAnnounce);
    console.log(`<< System >>\n${message}`);
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    const announce = document.createElement("div");
    announce.innerText = `${nickname}: ${message}`;
    announce.style.color = "#000000";
    announces.appendChild(announce);
}
export function sendMessage(message) {
    window.socket.emit(window.events.newMessage, { message });
    const announce = document.createElement("div");
    announce.innerText = `You: ${message}`;
    announce.style.color = "#353535";
    announces.appendChild(announce);
}