const body = document.querySelector("body");
const announces = document.querySelector("#jsAnnounce");

export function handleSystemAnnounce({ message }) {
    const systemAnnounce = document.createElement("div");
    systemAnnounce.innerText = message;
    systemAnnounce.className = "systemAnnounce";
    body.appendChild(systemAnnounce);
    console.log(`<< System >>\n${message}`);
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    const announce = document.createElement("div");
    announce.innerText = `${nickname}: ${message}`;
    announce.className = "announce";
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