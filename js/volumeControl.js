const volumeSlider = document.querySelector("#sfxVolume");

class VolumeControl{
    constructor(players){
        this.players = players
        volumeSlider.addEventListener("change", e => {
            this.volume = volumeSlider.value/100
            this.players.forEach(player => {
                player.sfx.volume = this.volume
            });
        })
    }
}
export {VolumeControl}