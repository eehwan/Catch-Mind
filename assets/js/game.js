import { handleGameAnnounce, handleSystemAnnounce } from "./announce";
import { disableChat, enableChat } from "./chat";
import { handleClear, disable, enable } from "./drawing";
import { getSocket } from "./sockets";
const palete = document.querySelector("palete");
const waiting = document.querySelector("#waiting");

export const handleGameStart = ({painter}) => {
    if (painter.id == getSocket().id) {
        return
    }

    disable();
    handleClear();
    palete.className = "guesser";
    
    const text = `Guess what he draws! <br><br>Painter: ${painter.nickname}`;
    handleGameAnnounce({ message: text, color: "#000000"});
};

export const handleGameEnd = ({ painter, winner, word }) => {
    disable();
    palete.className = "waiting";
    waiting.addEventListener("click", handleReady);
    enableChat();
    let text = null;
    switch(winner) {
        case("left"):
            text = `Player has left!<br><br>Word was < ${word} >`;
            break
        case("no one"):
            text = `No one got the right answer! <br><br> Word was < ${word} > <br><br> ${painter.nickname} -5 points <br>other players +5 points`;
            break
        default:
            text = `Game Ended ! <br><br>Winner: ${winner.nickname} <br> Word was < ${word} > <br><br> ${painter.nickname} +5 points <br>${winner.nickname} +10 points`;
    }
    handleGameAnnounce({ message: text, color: "#000000"});
};

export const handlePainter =  ({ word }) => {
    handleClear();
    enable();

    palete.className = "painter";
    disableChat();

    const text = `Draw < ${word} > and let others guess.`;
    handleGameAnnounce({ message: text, color: "#000000"});
};
const handleReady = () => {
    getSocket().emit(window.events.ready);
    waiting.removeEventListener("click", handleReady);
    
    handleGameAnnounce({ message: "Get set", color: "#000000"});
}

waiting.addEventListener("click", handleReady);