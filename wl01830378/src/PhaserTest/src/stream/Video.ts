import flvjs from "~/js/flv.min";
import hlsjs from "~/js/hls.min";

export default class Video {
    private video: any;
    private player: any;
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

        this.startVideo('http://192.168.0.158:7001/live/movie.flv');
    }

    close() {
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = undefined;
        this.isPlaying = false;
        clearInterval(this.interval);
    }

    startVideo(videoUrl: string) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            if (flvjs.isSupported()) {
                this.player = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    url: videoUrl
                }, {
                    enableStashBuffer: false
                });
                this.player.attachMediaElement(this.video);
                this.player.load();
                this.player.play();
                console.log("!!!!!startVideo!!!!!");
            }
            else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
                //判斷是否為 ios
                // alert("2");
                this.video.src = videoUrl;
                this.video.addEventListener('loadedmetadata', this.playVideo.bind(this, this.video));
            }
            else if (hlsjs.isSupported()) {
                // alert("1");
                var hls = new hlsjs();
                hls.loadSource(videoUrl);
                hls.attachMedia(this.video);
                hls.on(hlsjs.Events.MANIFEST_PARSED, this.playVideo.bind(this, this.video));
            }
            else {
                alert('Can\'t download stream');
                this.isPlaying = false;
                return;
            }

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

    playVideo(video: any) {
        video.play();
    }
}