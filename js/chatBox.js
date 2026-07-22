import { Command } from "./command";
import { CommandComponent } from "./commandComponent";

const chatWindow = document.querySelector("#chatBox")
const sendButton = document.querySelector("#sendButton")
const textInput = document.querySelector("#textInput")

class ChatBoxComponent{
	constructor(player, players, room, msg, canvas,updateLastMapChange){
		this.player = player
		this.room = room
		this.commandComponent = new CommandComponent(this.player, players, this.room, msg, canvas,updateLastMapChange);

		//Set chat button listener
    	sendButton.addEventListener("click", e => {
			const msg = textInput.value;
			if(msg.replace(" ", "") != ""){
				if(msg.slice(0,1) == "/"){
					this.evaluateCommand(msg)
				}else{
					this.room.actions.chat.send({nick: this.player.nick, msg: msg})
					this.player.chatComponent.setMessage(msg);
					displayMessage(this.player.nick, msg);
				}
				textInput.value = ""
        	}
    	});

		textInput.onfocus = e => {
			if(this.player.movementComponent.canMove){
				this.player.movementComponent.canMove = false
			}
		}
		textInput.onblur = e => {
			if(!this.player.movementComponent.canMove && !this.player.movementComponent.lockTyping){
				this.player.movementComponent.canMove = true
			}
		}
	}
	evaluateCommand(msg){
		let args = msg.slice(1).split(" ");
		for(let i = 0; i < this.commandComponent.commands.length; i++){
			const command= this.commandComponent.commands[i];
			if(args[0].toLowerCase() == command.name.toLowerCase()){
				if(args.length-1 == command.nArgs){
					args.splice(0,1)
					return command.execute(this.commandComponent, args.splice(0,1))
				}else{
					serverMessage("This command requires an argument", "white");
					return;
				}
			}
		}
		serverMessage("No such command", "red");
		return;
	}
}

function displayMessage(nick, msg){
	const p = document.createElement("p");
	nick = nick.slice(0,15)
	if(nick.length > 15){
		nick += "..." 
	}
	p.textContent = nick + ": " + msg;
	chatWindow.append(p)
	chatWindow.scroll(0, chatWindow.scrollHeight)
}

function serverMessage(msg, color){
	const p = document.createElement("p");
	p.style.color = color;
	p.textContent = "[CLIENT]: " + msg;
	chatWindow.append(p)
	chatWindow.scroll(0, chatWindow.scrollHeight)
}

export {displayMessage, serverMessage, ChatBoxComponent}
