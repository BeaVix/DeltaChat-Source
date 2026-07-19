class MovementComponent{
    constructor(speed, pos, animationComponent){
        this.speed = [speed,speed];
        this.pos = pos;
        this.animationComponent = animationComponent
        this.movement = [0,0]
        this.lastMovement = [1,0];
        this.yAcc = 0; 
        this.canMove = true;
        this.lockTyping = false;
        this.hitboxPos = [10, 0]
        this.hitboxSize = [20,20]
    }
    
    move(){
        if((this.movement[0] == -1 && this.pos[0] > 0) || (this.movement[0] == 1 && this.pos[0] < 320 - this.animationComponent.size[0]) ){
            this.pos[0] += this.movement[0]*this.speed[0];
        }
        if((this.movement[1] == -1 && this.pos[1]> 0) || (this.movement[1] == 1 && this.pos[1] < 240 - this.animationComponent.size[1])){
            this.pos[1] += this.movement[1]*this.speed[1];
        }
        
        if(this.movement[0]){
            this.lastMovement[0] = this.movement[0];
        }
        if(this.movement[1]){
            this.lastMovement[1] = this.movement[1];
        }
    }

    testHitbox(posO, sizeO){ 	// Position of the hitbox, width and heigth, position of entity
        const hitboxPos = [this.pos[0]+this.hitboxPos[0], this.pos[1]+this.hitboxPos[1]]
        return(
        (hitboxPos[0] < posO[0] + sizeO[0] &&
        hitboxPos[0]  > posO[0]) ||
        (hitboxPos[1] < posO[1] + sizeO[1] &&
        hitboxPos[1] > posO[1])
    );
}
}

export {MovementComponent}