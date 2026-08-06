const onlineNumber = document.querySelector("#online-number");
const onlineList = document.querySelector("#online-list")

function updateOnline(players){
    onlineNumber.textContent = players.length
    onlineList.textContent = "";
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const p = document.createElement("p")
        const img = document.createElement("img");
        const text = document.createTextNode(" "+player.nick)
        const span = document.createElement("span");

        img.style.imageRendering = "crisp-edges";
        img.style.marginLeft = "5px"
        img.style.width = "15px"
        img.src ="portrait_" + player.animationComponent.avatar + ".png"

        span.textContent = "ID: "+player.id
        span.style.marginLeft = "1rem"

        p.append(img)
        p.append(text);
        p.append(span)

        onlineList.append(p);
    }
}

export {updateOnline}