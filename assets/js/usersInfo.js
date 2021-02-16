export const handlePlayers = ({ players }) => {
    let usersInfo = document.querySelector(".usersInfo");
    usersInfo.remove();
    const chatContainer = document.querySelector(".chatContainer");
    usersInfo = document.createElement("div");
    usersInfo.className = "usersInfo";
    const usersCnt = document.createElement("div");
    usersCnt.className = "userCnt";
    switch(players.length) {
        case 0:
            usersCnt.innerText = `No one, here !!`;
            break;
        case 1:
            usersCnt.innerText = `You are alone !!`;
            break;
        default:
            usersCnt.innerText = `${players.length} Users, here !!`;
            break;
    };
    usersInfo.appendChild(usersCnt);

    players.forEach(player => {
        const user = document.createElement("div");
        user.className = "user";
        const nickname = document.createElement("span");
        nickname.className = "nickname";
        nickname.innerText = `${player.nickname}`;
        const score = document.createElement("span");
        score.className = "score";
        score.innerText = `${player.score}`;
        user.append(nickname);
        user.append(score);
        usersInfo.appendChild(user);
    });
    chatContainer.insertBefore(usersInfo, chatContainer.firstChild);
};