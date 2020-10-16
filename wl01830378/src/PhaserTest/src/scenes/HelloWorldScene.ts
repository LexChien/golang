import Phaser from 'phaser'
import Video from '~/stream/Video';

export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('hello-world');
    }

    private btn: Phaser.GameObjects.Sprite;
    private stream: Video = new Video();

    preload() {
        // this.load.setBaseURL('http://labs.phaser.io')
        this.load.setCORS('anonymous');
        this.load.setCORS('Anonymous');
        this.load.image('BG', 'images/UI_CHOOSE_bg.jpg');
        this.load.image('logo', 'images/LOADING_bg.png');
        this.load.image('partical', 'images/enemy.png');
        this.load.image('button', 'images/Close_01.png');
    }

    create() {
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'BG');

        const particles = this.add.particles('partical');

        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');
        logo.scale = 0.5;

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

        this.btn = this.add.sprite(1280 / 2, 600, 'button');
        this.add.text(1280 / 2, 600, 'start', { fontSize: '32px' }).setOrigin(0.5, 0.5);
        this.btn.setInteractive();
        this.btn.on('pointerdown', () => this.btnDown());
        this.btn.on('pointerup', () => this.btnUp());

    }

    btnDown() {
        console.log("btn Down!!!!!!!!!!");
        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 50,
            onUpdate: tween => {
                var value = tween.getValue();
                var color = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(0xFFFFFF), Phaser.Display.Color.ValueToColor(0xB87333), 100, value);
                this.btn.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
            }
        })
        // this.btn.setTint(0xff0000);
    }

    btnUp() {
        console.log("btn Up!!!!!!!!!!");
        this.tweens.addCounter({
            from: 0,
            to: 100,
            duration: 50,
            onUpdate: tween => {
                var value = tween.getValue();
                var color = Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(0xB87333), Phaser.Display.Color.ValueToColor(0xFFFFFF), 100, value);
                this.btn.setTint(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
            }
        })

        if (!this.stream.isPlaying)
            this.stream.open(this);
        else
            this.stream.close(this);
        // this.btn.setTint(0xff0000);
    }
}
