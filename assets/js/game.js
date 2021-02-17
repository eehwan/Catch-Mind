import { handleSystemAnnounce } from "./announce";
import { disableChat, enableChat } from "./chat";
import { handleClear, disable, enable } from "./drawing";
import { getSocket } from "./sockets";
const palete = document.querySelector("palete");
const waiting = document.querySelector("#waiting");

export const handleGameStart = ({painter}) => {
    disable();
    handleClear();
    palete.className = "guesser";
    
    const text = `Guess what he draws! <br><br>Painter: ${painter.nickname}`;
    handleSystemAnnounce({ message: text, color: "#000000", center: true });
};

export const handleGameEnd = ({ painter, winner, word }) => {
    disable();
    palete.className = "waiting";
    waiting.addEventListener("click", handleReady);
    enableChat();
    let text = null;
    switch(winner) {
        case(null):
            text = `Word: ${word}<br><br>Painter has left! `;
            break
        case("no one"):
            text = `Word: ${word} <br><br> No one got the right answer! <br><br>${painter.nickname} -5 points <br>other players +5 points`;
            break
        default:
            text = `Winner: ${winner.nickname} <br> Word: ${word} <br><br>Game ended ! <br><br> ${painter.nickname} +5 points <br>${winner.nickname} +10 points`;
    }
    handleSystemAnnounce({ message: text, color: "#000000", center: true });
};

export const handlePainter =  ({ word }) => {
    enable();
    palete.className = "painter";
    disableChat();

    const text = `Draw < ${word} > and let others guess.`;
    handleSystemAnnounce({ message: text, color: "#000000", center: true });
};
const handleReady = () => {
    getSocket().emit(window.events.ready);
    waiting.removeEventListener("click", handleReady);
    
    handleSystemAnnounce({ message: "Ready", color: "#000000", center: true });
}

waiting.addEventListener("click", handleReady);