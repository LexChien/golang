import Phaser from 'phaser'
import { ScrollablePanel } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
import RoomIcon from '~/object/RoomIcon';

export default class bacScene extends Phaser.Scene {
    constructor() {
        super('bac')
    }

    private icons: RoomIcon;
    private cursors;

    preload() {
        this.load.multiatlas('bac', 'sprite/bac.json', 'sprite');
        this.load.image('BG', 'sprite/Scene_A.png');
    }

    create() {
        this.add.sprite(640, 360, 'BG'); //背景

        //上方
        this.add.sprite(1151, 690, 'bac', 'UI_Auto_bn01.png'); //自動重複按紐
        this.add.sprite(1169, 38, 'bac', 'UI_Bet_Log_01.png'); //紀錄按紐
        let btnnn = this.add.sprite(1240, 38, 'bac', 'UI_TOP_Setup_01.png'); //設定按紐
        this.add.sprite(162, 40, 'bac', 'area_choose_A01.png'); //切換廳館
        this.add.sprite(279, 32, 'bac', 'area_choose_A02.png'); //廳館下拉三角形
        this.add.text(24, 39, "見習廳(10-1000)", { font: "22px fontMin", fill: "#ffef6e", }).setStroke("271913", 2).setOrigin(0, 0.5);

        // let spr = this.add.sprite(623, 207, 'bac', 'ui_table_a01.png'); //對其用

        let trackGameObject = this.add.sprite(1239, 351, 'bac', 'Bar_UI_02_2.png').setScale(1, 89.5);
        // let trackGameObject = this.add.sprite(1239, 349, 'bac', 'Bar_UI_02.png').setDisplaySize(8, 547);
        let thumbGameObject = this.add.sprite(1239, 111, 'bac', 'Bar_UI_01.png')
        let panel = this.rexUI.add.scrollablePanel({
            x: 623,
            y: 720 / 2,
            anchor: 0.5,
            width: 1280,
            height: 562,
            scrollMode: 0,
            panel: {
                child: this.CreatElement(),
                mask: {
                    padding: 1,
                    updateMode: 0
                }
            },

            slider: {
                track: trackGameObject,
                thumb: thumbGameObject,
                position: 0,
            },
            clamplChildOY: true,
            scroller: {
                threshold: 0,
                slidingDeceleration: false,
                backDeceleration: false,
            },
        })
        panel.layout();
        // panel.drawBounds(this.add.graphics(), 0xff0000);  //畫線用

        //下方
        this.add.sprite(640, 680, 'bac', 'UI_down_01.png'); //下方背景條
        this.add.sprite(67, 671, 'bac', 'profile_picture_01.png').setScale(0.75); //頭像
        this.add.sprite(69, 671, 'bac', 'Player_box_02.png'); //頭像框
        this.add.sprite(152, 691, 'bac', 'set_up_Chips.png').setScale(0.7); //B
        this.add.sprite(276, 692, 'bac', 'MG_UI_player_crtframe_a01a.png'); //姓名框
        this.add.sprite(1021, 676, 'bac', 'Change_Coins_01.png'); //籌碼設定紐
        this.add.sprite(493, 672, 'bac', 'UI_Chips_13.png'); //籌碼
        this.add.sprite(599, 694, 'bac', 'UI_Chips_14.png'); //籌碼
        this.add.sprite(705, 694, 'bac', 'UI_Chips_15.png'); //籌碼
        this.add.sprite(811, 694, 'bac', 'UI_Chips_16.png'); //籌碼
        this.add.sprite(917, 694, 'bac', 'UI_Chips_17.png'); //籌碼


        // btnnn.setInteractive();
        // btnnn.on('pointerdown', () => this.btnDown());  //設定紐按鍵事件


        // this.icons = new RoomIcon(this, 500, 200);
        // console.log(this.icons)


        this.cursors = this.input.keyboard.createCursorKeys(); //輸入控制
    }

    update() {
        if (this.cursors.left.isDown) {
            this.icons.x -= 10;
        }
        else if (this.cursors.right.isDown) {
            this.icons.x += 10;
        }
    }

    public CreatElement() {
        let sizer = this.rexUI.add.sizer({
            orientation: 'y',
            space: { left: 0, right: 0, top: 140, bottom: 140, item: 282 }
        })
        for (let i = 0; i < 6; i++) {
            // sizer.add(this.add.sprite(0, 0, 'bac', 'ui_table_a01.png'));
            sizer.add(new RoomIcon(this));
        }
        sizer.layout();
        // sizer.drawBounds(this.add.graphics(), 0xff0000);
        // console.log(sizer);
        return sizer;
    }

    btnDown() {
        console.log('btnDown');
    }
}

