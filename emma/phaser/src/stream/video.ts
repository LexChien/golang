import flvjs from "~/js/flv.min";
import hlsjs from "~/js/hls.min";

export default class Video {
    private video: any;
    private videoPlayer: any;
    public isPlaying: boolean = false;
    private IP: string = '127.0.0.1';

    open(scene: Phaser.Scene) {
        if (this.video == undefined || this.video == null) {
            this.video = document.createElement('video');
            this.video.muted = true;
            this.video.width = 1280 * 0.6;
            this.video.height = 720 * 0.6;
            scene.add.dom(640, 360, this.video);
            console.log(this.video);
        }
        if (!this.isPlaying) {
            if (flvjs.isSupported())
                this.startVideo_FLV();
            else if (hlsjs.isSupported())
                this.startVideo_HLS();
            else if (this.video.canPlayType('application/vnd.apple.mpegurl'))
                this.startVideo_HLS();
            else
                console.error('無法撥放');
        }

    }

    close() {
        this.videoPlayer.pause();
        this.videoPlayer.unload();
        this.videoPlayer.detachMediaElement();
        this.videoPlayer.destroy();
        this.videoPlayer = undefined;
        this.isPlaying = false;
    }

    startVideo_FLV() {
        console.log('startVideo_FLV');
        this.isPlaying = true;
        this.videoPlayer = flvjs.createPlayer({
            type: 'flv',
            isLive: true,
            hasAudio: false,
            url: 'http://' + this.IP + ':7001/live/movie.flv'
        }, {
            enableStashBuffer: false
        });
        this.videoPlayer.attachMediaElement(this.video);
        this.videoPlayer.load();
        this.videoPlayer.play();
        console.log("!!!!!startVideo!!!!!");
    }

    startVideo_HLS() {
        console.log('startVideo_HLS');
        this.videoPlayer = new hlsjs();
        this.videoPlayer.loadSource('http://' + this.IP + ':7002/live/movie.m3u8');
        this.videoPlayer.attachMedia(this.video);
        this.videoPlayer.play();
    }
}