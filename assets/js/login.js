import { handleClear } from "./drawing";
import { getSocket, initSockets } from "./sockets";

const NICKNAME = "nickname";
const LOGGED_IN = "loggedIn";
const LOGGED_OUT = "loggedOut";
let nickname = sessionStorage.getItem(NICKNAME);

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

    // Canvas,채팅,알림 초기화
    chatMessages.innerHTML = "";
    systemAnnounces.innerHTML = "";
    handleClear();
}

const handleSubmit = (e) => {
    e.preventDefault();
    if (nicknameInput.value) {
        nickname = nicknameInput.value;
        sessionStorage.setItem(NICKNAME, nickname);
        nicknameInput.value = "";
        body.className = LOGGED_IN;
        login(nickname);
    }
}

const handleLogout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem(NICKNAME);
    body.className = LOGGED_OUT;
    nicknameInput.focus();
    getSocket().emit(window.events.left);
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