const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You: ${message}`);
}
function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
  console.log(`Nickname changed to "${nickname}"`);
}
function handleSystemAnnounce({ message }) {
  console.log(`<<  ${message}  >>`);
}
function handleMessageAnnounce(data) {
  const { message, nickname } = data;
  console.log(`${nickname}: ${message}`);
}

socket.emit("enter")
socket.on("systemAnnounce", handleSystemAnnounce);
socket.on("messageAnnounce", handleMessageAnnounce);