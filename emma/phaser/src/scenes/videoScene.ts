import Phaser from 'phaser'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components.js';

export default class videoScene extends Phaser.Scene {
    constructor() {
        super('video')
    }

    preload() {
        this.load.image('BG', 'sprite/desktop_bg01.jpg');
    }

    create() {
        this.add.sprite(640, 360, 'BG');
        var background2 = this.add.sprite(200, 650, 'spr', 'desktop_bg_b02.png').setScale(0.3);
        var buttons02 = new Buttons(this, {
            buttons: [background2],
        });
        buttons02.on('button.click', (button, index, pointer, event) => {
            this.scene.start('hello-world');
        })
        var txt = this.add.text(200, 650, "點我返回", { font: "30px Arial", fill: "#FFFFFF",align: 'center', });
        txt.setOrigin(0.5).setStroke("000000", 3);
    }
}
