import { getSocket, initSockets } from "./sockets";

const NICKNAME = "nickname";
const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";
let nickname = localStorage.getItem(NICKNAME);

const body = document.querySelector("body");
const jsLogin = document.querySelector("#jsLogin");
const nicknameInput = document.querySelector("#jsNicknameInput");
const logoutBtn = document.querySelector("#logoutBtn");

const chatMessages = document.querySelector(".chatMessages");
const systemAnnounces = document.querySelector(".systemAnnounces");

const login = nickname => {
    if (!getSocket()) {
        const socket = io("/");
        initSockets(socket);
    }
    getSocket().emit(window.events.setNickname, { nickname });
    document.getElementById("chatInput").focus();
}

const handleSubmit = (e) => {
    e.preventDefault();
    if (nicknameInput.value) {
        nickname = nicknameInput.value;
        localStorage.setItem(NICKNAME, nickname);
        nicknameInput.value = "";
        body.className = LOGGED_IN;
        login(nickname);
    }
}

const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem(NICKNAME);
    chatMessages.innerHTML = "";
    body.className = LOGGED_OUT;
    getSocket().emit(window.events.left);
    chatMessages.innerHTML = "";
    systemAnnounces.innerHTML = "";
    nicknameInput.focus();
}

if (nickname == null) {
    body.className = LOGGED_OUT;
    nicknameInput.focus();
}else {
    body.className = LOGGED_IN;
    login(nickname);
}
jsLogin.addEventListener("submit", handleSubmit);
logoutBtn.addEventListener("click", handleLogout);