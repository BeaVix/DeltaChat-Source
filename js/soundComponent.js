class SoundComponent{
    constructor(volumeSlider){
        this.audio = new Audio();
        this.audio.autoplay = true;
        this.volumeSlider = volumeSlider
        this.setVolume(this.volumeSlider.value)
        this.volumeSlider.addEventListener("change", e=>{
            this.setVolume(this.volumeSlider.value);
        })
    }

    playSound(src){
        this.audio.src = src + ".wav"
    }

    setVolume(volume){ // Volume given as a range between 0 and 100
        this.audio.volume = volume / 100
        this.volume = 100
        this.volumeSlider.value = volume
    }
}

export {SoundComponent}