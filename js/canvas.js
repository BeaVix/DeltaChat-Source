import { selfId } from "trystero";
import { AnimationComponent } from "./animationComponent";
import { Background } from "./bg";
import { Player } from "./Player";

class Canvas{
    constructor(bg){
        this.canvas = document.querySelector("#canvas");
        this.c = canvas.getContext("2d")
        this.showMessage = false;
        this.bg = bg;
        this.cameraPosition = [0,0]
        this.cameraSize = [320, 240]
    }

    setDrawQueue(){
        this.drawQueue = []
        this.bg.objects.forEach(object => {
            if(object.image){
                this.drawQueue.push({data: object, animationComponent: new AnimationComponent(object.frames, object.image, object.size)})
            }
        });
    }
    

    clearScreen(player){
        if(!this.bg.animationComponent.sprite.complete){
            this.c.fillStyle = '#aaaaaqa';
        }else{
            const startingPositionX = (this.cameraSize[0]/2 - player.animationComponent.size[0]/2)
            const startingPositionY = (this.cameraSize[1]/2 - player.animationComponent.size[1]/2)
            if(player.movementComponent.pos[0] != startingPositionX){
                this.cameraPosition[0] = player.movementComponent.pos[0] - startingPositionX
            }
            if(player.movementComponent.pos[1] != startingPositionY){
                this.cameraPosition[1] = player.movementComponent.pos[1] - startingPositionY

            }
            this.c.fillStyle = '#000000';
            this.c.fillRect(0, 0, 800, 540);
            this.c.drawImage(this.bg.animationComponent.sprite, this.bg.animationComponent.frame[0] + this.cameraPosition[0], this.cameraPosition[1], this.cameraSize[0], this.cameraSize[1], 0,0,this.cameraSize[0], this.cameraSize[1])
            this.c.fillStyle = '#000000';
            this.c.fillRect(this.bg.size[0]-this.cameraPosition[0], 0-this.cameraPosition[1], 200, 580)
            this.c.fillRect(-this.bg.size[0]-this.cameraPosition[0], 0-this.cameraPosition[1], this.bg.size[0], 580)

            /*
            this.c.fillStyle = '#ff0000';
            this.bg.hitboxes.forEach(hitbox => {
                this.c.fillRect(hitbox.pos[0]-this.cameraPosition[0], hitbox.pos[1]-this.cameraPosition[1], hitbox.size[0], hitbox.size[1])
            });*/
        }   
    }

    setCanvas(){
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.c.scale(2,2);
        this.c.imageSmoothingEnabled = false;
        this.c.textAlign = "center";
    }

    /*Draws frame*/
    draw(timestamp, players){
        //Check if size of draw queue is consistent with number of objects to draw
        this.setDrawQueue()
        this.drawQueue.push(...players)

        this.clearScreen(players[0]);
        
        //y-sort sprites
            this.drawQueue.sort((a,b) => {
            if(a instanceof Player && !(b instanceof Player)){
                return (a.movementComponent.pos[1] + a.animationComponent.size[1]*2) - (b.data.pos[1]+ b.data.size[1] )*b.data.scale 
            }else if( b instanceof Player && !(a instanceof Player)){
                return ( a.data.pos[1] + a.data.size[1])*a.data.scale - (b.movementComponent.pos[1] + b.animationComponent.size[1]*2)
            }else if (a instanceof Player && b instanceof Player){
                return a.movementComponent.pos[1] - b.movementComponent.pos[1]
            }else{
                return  a.data.pos[1]*a.data.scale - b.data.pos[1]*b.data.scale
            }
        })

        //Draw objects in the queue
        this.drawQueue.forEach(object => {
            if(object instanceof Player){
                this.drawPlayer(object)
                object.animationComponent.update(timestamp)
                object.sleepBubble.update(timestamp)
                object.typingBubble.update(timestamp)
            }else{
                this.c.scale(object.data.scale,object.data.scale)
                if(object.data.frames){
                    this.c.drawImage(object.animationComponent.sprite, object.animationComponent.frame[0], object.animationComponent.frame[1], object.data.size[0],object.data.size[1], object.data.pos[0] - this.cameraPosition[0]/object.data.scale, object.data.pos[1]- this.cameraPosition[1]/object.data.scale, object.data.size[0],object.data.size[1])
                    object.animationComponent.update(timestamp)
                }else{
                    this.c.drawImage(object.animationComponent.sprite, object.data.pos[0] - this.cameraPosition[0]/object.data.scale, object.data.pos[1] - this.cameraPosition[1]/object.data.scale)
                }
                this.c.scale(1/object.data.scale,1/object.data.scale)
            }
        })

        this.bg.animationComponent.update(timestamp)
    }

    drawText(x, y, str, strokeColor = "#000000", color="#ffffff",size="10px",font="Determination mono") {
        if(str){
            const maxWidth = 100;    //pixels per lines
            this.c.font = size + " " + font
            this.c.strokeStyle= strokeColor
            this.c.linewidth = 8
            let words = str.split(" ");
            let lines = [];
            let currentLine = words[0];

            //wrap text
            for (let i = 1; i < words.length; i++) {
                let word = words[i];
                let width = this.c.measureText(currentLine + " " + word).width;
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
                this.c.strokeText(line, x, height);
                this.c.fillStyle = color;
                this.c.fillText (line, x, height);    
            }
        }

    }

    drawPlayer(player){
        let x,y;
        if(player.id == selfId){
            x = this.cameraSize[0]/2 - player.animationComponent.size[0]/2
            y = this.cameraSize[1]/2 - player.animationComponent.size[0]/2
        }else{
            x = player.movementComponent.pos[0] - this.cameraPosition[0];
            y = player.movementComponent.pos[1]- this.cameraPosition[1];
        }
        
        const height = player.animationComponent.size[1]
        const width = player.animationComponent.size[0]
        const sprite = player.animationComponent.sprite;
        const chat = player.chatComponent; 
        if(sprite.complete){
            if(player.animationComponent.rotation){     //player is rotated
                this.c.save();
                this.c.translate(x + width /2, y + height /2)
                this.c.rotate(player.animationComponent.rotation * Math.PI / 180)
                this.c.drawImage(sprite, 0, 16, width, -height, -25, height/2, width, -height);
                this.c.restore();
            }else{
                this.c.drawImage(sprite, player.animationComponent.frame[0], player.animationComponent.frame[1], width, height, x, y , width, height);    //Draws sprite
            }
            
        }
        if(player.animationComponent.animation == "sleep"){
            if(!player.sleepBubble.currentFrame){
                this.c.drawImage(player.sleepBubble.sprite, x, y-16)
            }else{
                this.c.drawImage(player.sleepBubble.sprite, x, y-17)
            }
        }
        if(player.isTyping){
            if(!player.typingBubble.currentFrame){
                this.c.drawImage(player.typingBubble.sprite, x, y-16)
            }else{
                this.c.drawImage(player.typingBubble.sprite, x, y-17)
            }
        }
        this.drawText(x+width/2, y+height+8, player.nick,"#000000","#ffff00");     //Draws nickname
        this.drawText(x+8, y-5,chat.message, chat.messageBorder+chat.messageOpacity, chat.messageColor+chat.messageOpacity);    //Draws message

    }
}

export {Canvas}