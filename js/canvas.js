import { AnimationComponent } from "./animationComponent";
import { Background } from "./bg";

const canvas = document.querySelector("#canvas");
const c = canvas.getContext("2d")
let showMessage = false;
let bg = new Background("castle_town.png", true, 3, "fountain", [147,-1]);
bg.animationComponent.size = [24,64]

bg.sprite.onload = (e => {
    setCanvas()
})

function clearScreen(){
    if(!bg.sprite.complete){
        c.fillStyle = '#aaaaaa';
        c.fillRect(0, 0, 700, 540);
        c.fillStyle = '#000000';
    }else{
        c.drawImage(bg.sprite, 0,0);
    }
}

function setCanvas(){
	if(bg.sprite.width == 640){
        canvas.width = bg.sprite.width;
        canvas.height = bg.sprite.height;
        c.scale(1,1)
    }else{
        canvas.width = bg.sprite.width*2;
        canvas.height = bg.sprite.height*2;
        c.scale(2,2)
    }
	c.imageSmoothingEnabled = false;
    c.textAlign = "center";
}

function setBg(background){
    switch(background.toLowerCase()){
        case "castletown":
            bg.setSrc("castle_town.png");
            bg.animated = true;
        break;
        case "castletown_1":
            bg.setSrc("Castle_Town_Chapter_1.png");
            bg.animated = false;
            c.scale(1,1)
        break;
        default:
            return 0;
    }
    return bg;
}

//Draws frame
function draw(timestamp, players){
    clearScreen();
    if(bg.animated){
        c.drawImage(bg.animationComponent.sprite, bg.animationComponent.frame[0], bg.animationComponent.frame[1], bg.animationComponent.size[0], bg.animationComponent.size[1], bg.animatedPos[0], bg.animatedPos[1], bg.animationComponent.size[0], bg.animationComponent.size[1])
        bg.animationComponent.update(timestamp);
    }
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if(!player.muted){
            drawPlayer(player);
            player.animationComponent.update(timestamp);
            player.sleepBubble.update(timestamp);
        }
    }
    bg.animationComponent.update(timestamp)
}

function drawText(x, y, str, strokeColor = "#000000", color="#ffffff",size="10px",font="Determination mono") {
    if(str){
        const maxWidth = 80;    //pixels per lines
        c.font = size + " " + font
        c.strokeStyle= strokeColor
        c.linewidth = 8
        let words = str.split(" ");
        let lines = [];
        let currentLine = words[0];

        for (let i = 1; i < words.length; i++) {
            let word = words[i];
            let width = c.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);

        for (let i = lines.length; i > 0; i--) {
            const line = lines[i-1];
            const height = y + 10*(i-lines.length);
            c.strokeText(line, x, height);
            c.fillStyle = color;
            c.fillText (line, x, height);    
        }
    }

}

function drawPlayer(player){
    const x = player.movementComponent.pos[0];
    const y = player.movementComponent.pos[1];
    const height = player.animationComponent.size[1]
    const width = player.animationComponent.size[0]
    const sprite = player.animationComponent.sprite;
    const chat = player.chatComponent; 
    if(sprite.complete){
        if(player.animationComponent.rotation){     //player is rotated
            c.save();
            c.translate(x + width /2, y + height /2)
            c.rotate(player.animationComponent.rotation * Math.PI / 180)
            c.drawImage(sprite, 0, 16, width, -height, -25, height/2, width, -height);
            c.restore();
        }else{
            c.drawImage(sprite, player.animationComponent.frame[0], player.animationComponent.frame[1], width, height, x, y, width, height);    //Draws sprite
        }
        
    }
    if(player.sleep){
        if(!player.sleepBubble.currentFrame){
            c.drawImage(player.sleepBubble.sprite, x, y-16)
        }else{
            c.drawImage(player.sleepBubble.sprite, x, y-17)
        }
    }
    drawText(x+player.animationComponent.size[0]/2, y+25, player.nick,"#000000","#ffff00");     //Draws nickname
    drawText(x+8, y-5,chat.message, chat.messageBorder+chat.messageOpacity, chat.messageColor+chat.messageOpacity);    //Draws message

}

export {setCanvas, draw, bg, setBg}