import flvjs from "~/js/flv.min";
import hlsjs from "~/js/hls.min";

export default class Video {
    private video: any;
    private player: any;
    private interval: integer = 0;
    public isPlaying: boolean = false;
    private static videoIP: string = 'http://192.168.0.158';
    private static appName: string = 'live';

    open(scene: Phaser.Scene) {
        if (this.video == undefined || this.video == null) {
            this.video = document.createElement('video');
            this.video.muted = true;
            this.video.width = 512;
            this.video.height = 288;
            this.video.autoplay = true;
            this.video.setAttribute('playsinline', 'playsinline');
            this.video.setAttribute('webkit-playsinline', 'webkit-playsinline');
            scene.add.dom(1280 / 2, 720 / 2, this.video);
            console.log(this.video);
        }

        this.startVideo('movie');
    }

    close() {
        if (flvjs.isSupported() || hlsjs.isSupported()) {
            this.player.pause();
            this.player.unload();
            this.player.detachMediaElement();
            this.player.destroy();
            this.player = undefined;
        } else{
            this.video.pause();
            this.video.src = "";
        }
        this.isPlaying = false;
        clearInterval(this.interval);
    }

    startVideo(room: string) {
        if (!this.isPlaying) {
            this.isPlaying = true;
            if (flvjs.isSupported()) {
                this.player = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    url: Video.videoIP + ':' + 7001 + '/' + Video.appName + '/' + room + '.flv'
                }, {
                    enableStashBuffer: false
                });
                this.player.attachMediaElement(this.video);
                this.player.load();
                this.player.play();
                console.log("!!!!!startVideo!!!!!");
            }
            else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.video.src = Video.videoIP + ':' + 7002 + '/' + Video.appName + '/' + room + '.m3u8';
                this.video.addEventListener('loadedmetadata', this.playVideo.bind(this, this.video));
            }
            else if (hlsjs.isSupported()) {
                this.player = new hlsjs();
                this.player.loadSource(Video.videoIP + ':' + 7002 + '/' + Video.appName + '/' + room + '.m3u8');
                this.player.attachMedia(this.video);
                this.player.on(hlsjs.Events.MANIFEST_PARSED, this.playVideo.bind(this, this.video));
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