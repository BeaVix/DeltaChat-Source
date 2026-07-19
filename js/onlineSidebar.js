const onlineNumber = document.querySelector("#online-number");
const onlineList = document.querySelector("#online-list")

function updateOnline(players){
    onlineNumber.textContent = players.length
    onlineList.textContent = "";
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const p = document.createElement("p")
        const img = document.createElement("img");
        img.style.imageRendering = "crisp-edges";
        img.style.marginLeft = "5px"
        img.style.width = "15px"
        img.src ="portrait_" + player.animationComponent.avatar + ".png"
        p.textContent = "- "+player.nick + " ID: " + player.id;
        p.append(img)
        onlineList.append(p);
    }
}

export {updateOnline}