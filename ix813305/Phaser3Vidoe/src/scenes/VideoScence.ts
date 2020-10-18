import Phaser from 'phaser'
import flvjs from "~/js/flv.min"
import Hls from "~/js/hls.min"
export default class cd extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}
    element :any;
    logo:any;
    addr:string = "192.168.0.102";//影片ip
	preload()
    {
        this.load.image('button', 'images/Close_01.png');
        this.load.image('LOADING', 'images/LOADING_bg.png');
    }

    create()
    {
        this.logo = this.add.sprite(500, 300, 'LOADING');

        var start = this.add.sprite(100, 550, 'button');//播放影片
        this.add.text(100, 550, 'play', { fontSize: '32px' }).setOrigin(0.5, 0.5);
        start.setInteractive();
        start.on('pointerup', () => this.startPlay());

        var close = this.add.sprite(300, 550, 'button');//關閉影片
        this.add.text(300, 550, 'close', { fontSize: '32px' }).setOrigin(0.5, 0.5);
        close.setInteractive();
        close.on('pointerup', () => this.close());
        
    }
    startPlay() {
        this.logo.setVisible(false);
        var video_url ='';
        var video :any = document.createElement('video');
        video.muted = true;
        video.setAttribute('playsinline', 'playsinline');
        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        video.controls = true;
        video.width = 600;
        video.height = 400;
        video.autoplay = true;
        this.element = this.add.dom(500, 300, video);
        console.log(video);
        if (flvjs.isSupported()) {
            video_url ='http://'+this.addr+':7001/live/movie.flv';
            var flvPlayer = flvjs.createPlayer({
                type: 'flv',
                url: video_url,
                isLive: true,
                hasAudio: false,
            },
            {
                enableStashBuffer: false
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
            flvPlayer.play();
            this.add.text(400, 800, 'flv play', { fontSize: '32px' }).setOrigin(0.5, 0.5);

        }
        else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            //判斷是否為 ios
            // alert("2");
            this.add.text(400, 800, 'hls play', { fontSize: '32px' }).setOrigin(0.5, 0.5);
            video_url ='http://'+this.addr+':7002/live/movie.m3u8';
            video.src = video_url;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        } 
        else{
            alert("無法撥放");
        }
        
    }
    close(){
        this.element.setVisible(false);
        this.logo.setVisible(true);
        
    }
}
