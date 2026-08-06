const volumeSlider = document.querySelector("#sfxVolume");

class VolumeControl{
    constructor(players){
        this.players = players
        this.volume = 1
        volumeSlider.addEventListener("change", e => {
            this.setVolume(volumeSlider.value)
        })
    }

    setVolume(volume){
        this.volume = volume/100
        volumeSlider.value = volume
        this.players.forEach(player => {
            player.sfx.volume = this.volume
        });
    }
}
export {VolumeControl}