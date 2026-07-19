class ChatComponent{
    constructor(){
        this.messageColor = "#ffffff";
        this.messageBorder = "#000000"
        this.messageOpacity = "ff"
        this.messageOpacityD = 255;
        this.messageFade;
        this.messageTimer;
        this.message = "";
    }

    setMessage(msg){
        if(this.messageTimer){
            clearTimeout(this.messageTimer);
        }
        if(this.messageFade){
            clearInterval(this.messageFade)
        }
        this.messageOpacity = "ff"
        this.messageOpacityD = 255;
        this.message = msg;
        let obj = this;
        this.messageTimer = setTimeout(() => {
            obj.messageFade = window.setInterval(() => obj.fade(obj), 10);
        }, 6000)
    }

    //Message fading animation
    fade(obj){
        obj.messageOpacity = obj.messageOpacityD.toString(16);
        if(obj.messageOpacityD > 15){
            obj.messageOpacityD -= 2;
        }else{
            obj.message = "";
            clearInterval(obj.messageFade);
        }
    }
}

export {ChatComponent}