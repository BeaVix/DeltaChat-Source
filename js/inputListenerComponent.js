const sendButton = document.querySelector("#sendButton")
class InputListenerComponent{
    constructor(player, players, room, musicPlayer){
    this.player = player
    this.players = players;
    this.musicPlayer = musicPlayer;
    this.animationComponent = player.animationComponent;
    this.movementComponent = player.movementComponent;
    this.room = room;
    this.lastKeyPressed;
    window.addEventListener("keydown", e => {
        if(this.movementComponent.canMove){
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                    this.movementComponent.movement[1] = -1
                    this.animationComponent.offset = 96;
                    break;
                case "arrowdown":
                case "s":
                    this.movementComponent.movement[1] = 1
                    this.animationComponent.offset = 0
                    break;
                case "arrowright":
                case "d":
                    this.movementComponent.movement[0] = 1
                    this.animationComponent.offset = 64
                    break;
                case "arrowleft":
                case "a":
                    this.movementComponent.movement[0] = -1
                    this.animationComponent.offset = 32
                    break;
                case "m":
                    if(!this.musicPlayer.paused){
                        this.musicPlayer.pause()
                    }else{
                        this.musicPlayer.play()
                    }
                    break;
                case "e":
                    const playerTest = this.testHitbox();
                    if(playerTest){
                        this.room.actions.hit.send({target: playerTest.id, side: this.player.movementComponent.lastMovement});
                    }
                break;
                case "g":
                    if(!this.player.grabbing && !this.player.grabbedBy){
                        const playerTest = this.testHitbox();
                        if(playerTest){
                            this.player.grabbing = playerTest.id;
                            playerTest.grabbedBy = this.player.id;
                            playerTest.animationComponent.rotation = 90;
                            playerTest.movementComponent.pos = this.player.movementComponent.pos
                            this.room.actions.grab.send(playerTest.id)
                            this.player.playSound("snd_board_lift")
                        }
                    }else{
                        this.room.actions.release.send({side: this.player.movementComponent.lastMovement, target: this.player.grabbing})
                        const peer = this.searchById(this.player.grabbing)
                        peer.grabbedBy = undefined;
                        peer.animationComponent.rotation = 0;
                        peer.movementComponent.pos = [this.player.movementComponent.pos[0], this.player.movementComponent.pos[1]-25]
                        this.player.grabbing = undefined;
                    }
                    break;
                default:
                break;
            }
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                case "arrowdown":
                case "s":
                case "arrowright":
                case "d":
                case "arrowleft":
                case "a":
                    this.player.sleep = false
                    if(this.lastKeyPressed != e.key){
                        this.room.actions.animationChanged.send(this.animationComponent.offset);
                    }else{
                        this.lastKeyPressed = e.key;
                    }
                    
                break;
            }
        }
        if(e.key.toLowerCase() == "enter"){
            sendButton.click();
        }

});
    window.addEventListener("keyup", e =>{
        if(this.movementComponent.canMove){
            switch(e.key.toLowerCase()){
                case "arrowup":
                case "w":
                case "arrowdown":
                case "s":
                    this.movementComponent.movement[1] = 0
                    break;
                case "arrowright":
                case "d":
                case "arrowleft":
                case "a":
                    this.movementComponent.movement[0] = 0
                default:
                    break;
            }
            if(!this.movementComponent.movement[0] && !this.movementComponent.movement[1]){
                this.animationComponent.offset = 0
                room.actions.animationChanged.send(this.animationComponent.offset);
            }
        }
    })
    }
    searchById(id){
        for (let i = 0; i < this.players.length; i++) {
            const peer = this.players[i];
            if(id == peer.id){
                return peer;
            }    
        }
    }

    testHitbox(){
        for (let i = 0; i < this.players.length; i++) {
            const playerTest = this.players[i];
            if(playerTest.id != this.player.id && !playerTest.muted){
                const hit = this.movementComponent.testHitbox(playerTest.movementComponent.pos, playerTest.animationComponent.size);
                if(hit){
                    return playerTest;
                }
            }
        }
    }
}



export{InputListenerComponent}