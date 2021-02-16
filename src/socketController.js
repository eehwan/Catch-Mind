import events from "./events";
import { chooseWord } from "./words";

let players = [];
let onGame = false;
let word = null;
let painter = null;

const socketController = (socket, io) => {
    const sendUpdatePlayers = () => {
        players.sort((player1, player2) => player2.score - player1.score);
        io.emit(events.updatePlyers, { players });
    };
    const choosePainter = () => {
        return players[Math.floor(Math.random() * (players.length - 1))]
    };
    const endGame= (winner, word) => {
        if(winner) {
            winner.score += 10;
        }
        io.emit(events.gameEnd, { winner, word });

        players.forEach(player => player.state = "waiting");
        sendUpdatePlayers();

        onGame = false;
    }
    const startGame = () => {
        if (!onGame) {
            onGame = true;
            players.forEach(player => player.state = "onGame");
            painter = choosePainter();
            word = chooseWord();
            io.emit(events.gameStart, { painter });
            io.to(painter.id).emit(events.painter, { word });
            
            // setTimeout(() => endGame(painter, word), 10000);
        }
        console.log(painter, word);
    };
    // login    
    socket.on(events.setNickname, ({ nickname }) => {
        while (players.map(socket=>socket.nickname).includes(nickname)) {
            nickname = nickname + "@";
        }
        socket.nickname = nickname;
        socket.state = "waiting";
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" joined !!`, color: "rgb(0, 122, 255)"});

        players.push({ id: socket.id, nickname: socket.nickname, score: 0 });
        sendUpdatePlayers();
    });
    socket.on(events.sendMessage, ({ message }) => {
        if (onGame && message == word) {
            const winner = players.find(player => player.id == socket.id);
            endGame(winner, word)
        }
        socket.broadcast.emit(events.messageAnnounce, { message, nickname: socket.nickname || socket.id });
    });
    // logout
    socket.on("disconnect", () => {
        if (socket.nickname) {
            socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}"  left !!!`, color: "rgb(255, 149, 0)"});

            players = players.filter(aSocket => aSocket.id !== socket.id);
            sendUpdatePlayers();
            // 게임 강제 중지
            console.log(socket.id, painter)
            if (onGame===true && painter.id == socket.id) {
                endGame(null, word);
            }
        }
    });
    socket.on(events.left, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" left !!!`, color: "rgb(255, 149, 0)"});

        players = players.filter(aSocket => aSocket.id !== socket.id);
        sendUpdatePlayers();
        // 게임 강제 중지
        console.log(socket.id, painter)
        if (onGame===true && painter.id == socket.id) {
            endGame(null, word);
        }
    });
    // reconnection due to lags
    socket.on(events.reconnection, () => {
        socket.broadcast.emit(events.systemAnnounce, { message: `"${socket.nickname}" reconnected !`, color: "rgb(0, 122, 255)"});
    });
    // ready
    socket.on(events.ready, () => {
        players.find(player => player.id == socket.id).state = "ready";
        
        console.log(`${JSON.stringify(players)}: ready`);
        if (players.length > 1 && players.every(player=> player.state == "ready")) startGame();
    });
    // drawing
    socket.on(events.beforePaint, ({ x, y }) => {
        socket.broadcast.emit(events.beforePaint, { x, y });
    });
    socket.on(events.beginPaint, ({ x, y, color, lineWidth }) => {
        socket.broadcast.emit(events.beginPaint, { x, y, color, lineWidth });
    });
    socket.on(events.fill, ({ color }) => socket.broadcast.emit(events.fill, { color }));
    socket.on(events.clear, () => socket.broadcast.emit(events.clear));
};

export default socketController;