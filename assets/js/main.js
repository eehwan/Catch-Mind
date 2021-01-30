const NICKNAME = "nickname";
const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";

const body = document.querySelector("body");
const nickname = sessionStorage.getItem(NICKNAME);
const jsLogin = document.querySelector("#jsLogin");

if (nickname == null) {
  body.className = LOGGED_OUT;
}else {
  body.className = LOGGED_IN;
}

const handleSubmit = (e) => {
  e.preventDefault();
  const nicknameInput = document.querySelector("#jsNicknameInput");
  sessionStorage.setItem(NICKNAME);
  nicknameInput.value = "";
}
if (jsLogin) {
  jsLogin.addEventListener("submit", handleSubmit);
}


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