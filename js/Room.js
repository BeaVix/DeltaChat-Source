class Room{
    constructor(room, player){
        this.room = room;

        this.actions = {}
        this.actions.chat = room.makeAction("chat");
        this.actions.move = room.makeAction("move");
        this.actions.changeAvatar = room.makeAction("changeAvatar");
        this.actions.playerInfo = room.makeAction("playerInfo");
        this.actions.hit = room.makeAction("hit");
        this.actions.mute = room.makeAction("mute");
        this.actions.mapChanged = room.makeAction("mapChanged");
        this.actions.animationChanged = room.makeAction("animationChanged");
        this.actions.grab = room.makeAction("grab");
        this.actions.release = room.makeAction("release");
        this.actions.playSound = room.makeAction("playSound");
    }
}

export {Room}