import Phaser from 'phaser'
import { Buttons } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import NinePatch from 'phaser3-rex-plugins/plugins/ninepatch.js';

export default class HelloWorldScene extends Phaser.Scene {
    constructor() {
        super('hello-world')
    }
    public text1: any;
    public con = 0;

    preload() {
        this.load.image('nine', 'sprite/set_up_06.png');
        this.load.image('BG', 'sprite/desktop_bg01.jpg');
        this.load.image('firebarld', 'sprite/HHA_firebarld_fx01.png');
        this.load.multiatlas('spr', 'sprite/test.json', 'sprite'); //命名/JSON文件/圖片路徑
        this.load.multiatlas('fish01', 'sprite/fish01.json', 'sprite');
    }

    create() {
        //背景
        this.add.sprite(640, 360, 'spr', 'UI_CHOOSE_bg.jpg'); //X位置/Y位置/圖集名稱/使用圖片
        this.add.sprite(640, 664, 'spr', 'UI_CHOOSE_bg_02.png');
        // this.add.sprite(640, 360, 'BG');

        //高亮圖
        this.add.image(1040, 170, 'firebarld');
        this.add.image(1040, 540, 'firebarld').setBlendMode(Phaser.BlendModes.SCREEN);

        //未拉深(直接更改大小)
        let nine_normal = this.add.image(640, 340, 'nine');
        // nine_normal.scaleX = 1;
        // nine_normal.scaleY = 2;
        nine_normal.displayHeight = 400;
        //九宮格(插件)
        this.add.nineslice(
            210, 110,   // this is the starting x/y location
            340, 440,   // the width and height of your object
            'nine', // a key to an already loaded image
            88,         // the width and height to offset for a corner slice
            24          // (optional) pixels to offset when computing the safe usage area
        );

        //字體
        this.text1 = this.add.text(100, 100, "套用字體", { font: "20px fontMin", fill: "#FFFFFF" });
        let text2 = this.add.text(100, 150, "Arial字", { font: "20px Arial", fill: "#FFFFFF" });
        let text3 = this.add.text(100, 200, "無指定字", { font: "20px", fill: "#FFFFFF" });
        let text4 = this.add.text(100, 250, "系統字");
        text4.setFontSize(20);
        text4.setFontFamily('fontMin');
        text4.setStroke("000000", 3);
        this.text1.setText('百家樂魚鳥蟲見習廳繁體簡體百家乐鱼鸟虫见习厅繁体简体0132456789abcdefgABCDEFG ' + this.text1.style.fontFamily)
        text2.setText('百家樂魚鳥蟲見習廳繁體簡體百家乐鱼鸟虫见习厅繁体简体0132456789abcdefgABCDEFG ' + text2.style.fontFamily)
        text3.setText('百家樂魚鳥蟲見習廳繁體簡體百家乐鱼鸟虫见习厅繁体简体0132456789abcdefgABCDEFG ' + text3.style.fontFamily)
        text4.setText('百家樂魚鳥蟲見習廳繁體簡體百家乐鱼鸟虫见习厅繁体简体0132456789abcdefgABCDEFG ' + text4.style.fontFamily)

        //按鍵反應
        // this.input.on('pointerup', this.Ondown, this);

        //序列動畫
        this.anims.create({
            key: 'swim',
            frames: this.anims.generateFrameNames('fish01', { start: 1, end: 14, prefix: 'HHA_025_a_', suffix: '.png' }),
            frameRate: 24,
            repeat: -1
        });
        let fish03 = this.add.sprite(800, 400, 'fish01');
        fish03.play('swim');

        //Button
        var background = this.add.sprite(300, 350, 'spr', 'desktop_bg_b01.png').setScale(0.3);
        var background2 = this.add.sprite(300, 450, 'spr', 'desktop_bg_b01.png').setScale(0.3);
        var txt = this.add.text(300, 350, "點我看影片", { font: "30px Arial", fill: "#FFFFFF",align: 'center', });
        txt.setOrigin(0.5).setStroke("000000", 3);
        var buttons = this.rexUI.add.buttons({
            // x:500,y:500,width:300,height:300,
            // background: background,
            buttons: [background],
            click: {
                mode: 'pointerup',
                clickInterval: 1000
            },
        })
        buttons.on('button.click', (button, index, pointer, event) => {
            this.scene.start('video');
        });
        buttons.on('button.over', (button, index, pointer, event) => {
            txt.setScale(1.3);
        })
        buttons.on('button.out', (button, index, pointer, event) => {
            txt.setScale(1);
        })

        var buttons02 = new Buttons(this, {
            // x:500,y:500,width:300,height:300,
            // background: background2,
            buttons: [background2],
        });
        buttons02.on('button.click', (button, index, pointer, event) => {
            console.log('按下哈哈');
        })
        
    }

    update() {
        // this.con++;
        // if (this.con == 100) {
        //     console.log('撥放');
        //     // this.fish.play('swim',true);
        // }
    }

    Ondown() {
        console.log('按下');
    }
}
