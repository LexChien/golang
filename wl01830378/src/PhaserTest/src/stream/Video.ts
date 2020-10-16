import flvjs from "~/js/flv.min";

export default class Video {
    private video: any;
    private flvPlayer: any;
    private interval: integer = 0;
    public isPlaying: boolean = false;

    open(scene: Phaser.Scene) {
        if (this.video == undefined || this.video == null) {
            this.video = document.createElement('video');
            this.video.muted = true;
            this.video.width = 512;
            this.video.height = 288;
            scene.add.dom(1280 / 2, 720 / 2, this.video);
            console.log(this.video);
        }

        if (flvjs.isSupported()) {
            this.startVideo();
        }
    }

    close(scene: Phaser.Scene) {
        this.flvPlayer.pause();
        this.flvPlayer.unload();
        this.flvPlayer.detachMediaElement();
        this.flvPlayer.destroy();
        this.flvPlayer = undefined;
        this.isPlaying = false;
        clearInterval(this.interval);
    }

    startVideo() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.flvPlayer = flvjs.createPlayer({
                type: 'flv',
                isLive: true,
                hasAudio: false,
                url: 'http://192.168.0.158:7001/live/movie.flv'
            }, {
                enableStashBuffer: false
            });
            this.flvPlayer.attachMediaElement(this.video);
            this.flvPlayer.load();
            this.flvPlayer.play();
            console.log("!!!!!startVideo!!!!!");


            this.interval = setInterval(() => {
                if (!this.video.buffered.length) {
                    return;
                }
                let end = this.video.buffered.end(0);
                let diff = end - this.video.currentTime;
                if (diff >= 1.5) {
                    this.video.currentTime = end;
                }
            }, 3000);
        }
    }
}