import { disableChat, enableChat } from "./chat";
import { handleClear, disable, enable } from "./drawing";
import { getSocket } from "./sockets";
const palete = document.querySelector("palete");
const waiting = document.querySelector("#waiting");

export const handleGameStart = ({painter}) => {
    disable();
    handleClear();
    palete.className = "guesser";
    
    console.clear();
    console.log(`Painter: ${painter.nickname}`);
};

export const handleGameEnd = ({ winner, word }) => {
    disable();
    palete.className = "waiting";
    waiting.addEventListener("click", handleReady);
    enableChat();

    if(winner) {
        console.log(`Game ended \n Winner: ${winner.nickname} \n Word: ${word}`);
    }
    else {
        console.log("Painter has left");
    }
};

export const handlePainter =  ({ word }) => {
    enable();
    palete.className = "painter";
    disableChat();

    console.log(`You are Painter !! Draw < ${word} > and let others guess.`)
};
const handleReady = () => {
    getSocket().emit(window.events.ready);
    waiting.removeEventListener("click", handleReady);
    
    console.log("ready")
}

waiting.addEventListener("click", handleReady);