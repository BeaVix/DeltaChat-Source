const nextSongBtn = document.querySelector("#next-song");
const previousSongBtn = document.querySelector("#previous-song");
const nowPlaying = document.querySelector("#now-playing");

class songPlayer{
	constructor(soundOff){
		this.musicPlayer = new Audio();
		this.songs = [
			"castletown_empty",
			"castletown",
			"castle_funk",
			"paradise_paradise"
		]
		this.songIndex = 0;

		this.musicPlayer.loop = true;
		this.musicPlayer.volume = 0.4;
		if(!soundOff){
			this.musicPlayer.autoplay = true;
		}

		this.changeSong(this.songIndex)

		nextSongBtn.onclick = e => {
			if(this.songIndex < this.songs.length-1){
				this.songIndex += 1;
			}else{
				this.songIndex = 0;
			}
			this.changeSong(this.songIndex);
		}

		previousSongBtn.onclick = e => {
			if(this.songIndex > 0){
				this.songIndex -= 1;
			}else{
				this.songIndex = this.songs.length-1;
			}
			this.changeSong(this.songIndex)
		}
	}
	changeSong(){
			this.musicPlayer.src = this.songs[this.songIndex] + ".ogg";
			nowPlaying.textContent = "Now playing: "+this.songs[this.songIndex];
	}
}

export {songPlayer}