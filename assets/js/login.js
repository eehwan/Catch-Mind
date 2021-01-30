import { initSockets } from "./sockets";

const NICKNAME = "nickname";
const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";

const body = document.querySelector("body");
let nickname = sessionStorage.getItem(NICKNAME);
const jsLogin = document.querySelector("#jsLogin");

const login = nickname => {
    const socket = io("/");
    socket.emit(window.events.setNickname, { nickname });
    console.log(`Nickname changed to "${nickname}"`);
    initSockets(socket);
}

const handleSubmit = (e) => {
    e.preventDefault();
    const nicknameInput = document.querySelector("#jsNicknameInput");
    nickname = nicknameInput.value;
    sessionStorage.setItem(NICKNAME, nickname);
    nicknameInput.value = "";
    body.className = LOGGED_IN;
    login(nickname);
}

if (nickname == null) {
    body.className = LOGGED_OUT;
    if (jsLogin) {
        jsLogin.addEventListener("submit", handleSubmit);
    }
}else {
    body.className = LOGGED_IN;
    login(nickname)
}
  