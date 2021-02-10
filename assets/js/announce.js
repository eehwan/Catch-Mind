const body = document.querySelector("body");
const announces = document.querySelector("#jsAnnounce");
const chatMessages = document.querySelector(".chatMessages");

export function handleSystemAnnounce({ message, color }) {
    const systemAnnounce = document.createElement("div");
    systemAnnounce.innerText = message;
    systemAnnounce.className = "systemAnnounce";
    systemAnnounce.style.backgroundColor = color;
    body.appendChild(systemAnnounce);
}
export function handleMessageAnnounce(data) {
    const { message, nickname } = data;
    const li = document.createElement("li");
    li.className = nickname? "other" : "self";
    li.innerHTML = `${nickname ? nickname : "You"} : ${message}`;
    chatMessages.appendChild(li);
}