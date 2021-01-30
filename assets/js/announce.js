export function handleSystemAnnounce({ message }) {
    console.log(`<< System >>\n${message}`);
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    console.log(`${nickname}: ${message}`);
}
export function sendMessage(message) {
    window.socket.emit(window.events.newMessage, { message });
    console.log(`You: ${message}`);
}
