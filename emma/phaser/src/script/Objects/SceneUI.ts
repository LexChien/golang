import Phaser from 'phaser'

export default class SceneUI {
    constructor(scene) {
        // super(scene)
        this.m_Scene = scene;

        //上方
        this.btn_BetLog = scene.add.sprite(1169, 38, 'main', 'UI_Bet_Log_01.png');
        this.btn_Setting = scene.add.sprite(1240, 38, 'main', 'UI_TOP_Setup_01.png');
        this.marqee_bg = scene.add.sprite(724, 38, 'main', 'marquee_bar_00.png');
        this.marqee_icon = scene.add.sprite(339, 39, 'main', 'UI_icon_bulletin.png');
        this.dropDown = scene.add.sprite(162, 40, 'main', 'area_choose_A01.png');
        this.dropDown_t = scene.add.sprite(284, 40, 'main', 'area_choose_A02.png');
        this.txt_dropDown = scene.add.text(24, 39, "見習廳(10-1000)", { font: "22px fontMin", fill: "#ffef6e", }).setStroke("271913", 2).setOrigin(0, 0.5);

        //下方
        scene.add.sprite(640, 680, 'main', 'UI_down_01.png'); //下方背景條
        scene.add.sprite(152, 691, 'main', 'set_up_Chips.png').setScale(0.7); //金幣圖示
        scene.add.sprite(276, 692, 'main', 'MG_UI_player_crtframe_a01a.png'); //金幣底圖
        scene.add.sprite(242, 654, 'main', 'Player_name_01.png'); //姓名框
        this.bg_down_shine = scene.add.sprite(1177, 645, 'main', 'UI_down_corner_shine.png');
        this.txt_name = scene.add.text(242, 656, '我是名子與暱稱', { font: "17px Arial", fill: "#ffffff", }).setOrigin(0.5, 0.5);
        this.chip_setting = scene.add.sprite(1021, 676, 'main', 'Change_Coins_01.png');
        this.btn_auto = scene.add.sprite(1151, 690, 'lang', 'UI_Auto_bn01.png');
        this.coin_tip = scene.add.sprite(276, 633, 'lang', 'Gem_For_Coin.png');

        this.spr_head = scene.add.sprite(67, 671, 'head', 'profile_picture_01.png').setScale(0.75);
        scene.add.sprite(69, 671, 'head', 'Player_box_02.png'); //頭像框

        for (let i = 0; i < 5; i++) {
            let chip = scene.add.sprite(493 + 106 * i, 694, 'main', 'UI_Chips_' + (13 + i) + '.png');
            this.chips.push(chip);
        }

        this.coin_tip.setVisible(false);

        this.btn_Setting.setInteractive();
        this.btn_Setting.on('pointerdown', () => this.btnDown());  //設定紐按鍵事件

        scene.add.existing(this);
    }
    private m_Scene: Phaser.Scene;
    private bg_down_shine: Phaser.GameObjects.Sprite; //下方背景條shine
    private btn_auto: Phaser.GameObjects.Sprite; //自動重複按紐
    private btn_BetLog: Phaser.GameObjects.Sprite; //押注紀錄按紐
    private btn_Setting: Phaser.GameObjects.Sprite; //設定按紐
    private spr_head: Phaser.GameObjects.Sprite; //頭像
    private txt_name: Phaser.GameObjects.Text; //姓名
    private chip_setting: Phaser.GameObjects.Sprite; //籌碼設定紐
    private marqee_icon: Phaser.GameObjects.Sprite; //跑馬燈圖示
    private marqee_bg: Phaser.GameObjects.Sprite; //跑馬燈底圖
    private coin_tip: Phaser.GameObjects.Sprite; //點此兌換
    //下拉物件拆出去
    private dropDown: Phaser.GameObjects.Sprite; //下拉切換廳館
    private dropDown_t: Phaser.GameObjects.Sprite; //廳館下拉三角形
    private txt_dropDown: Phaser.GameObjects.Text; //下拉文字
    //籌碼物件拆出去
    private chips: any[] = []; //籌碼們


    btnDown() {
        console.log('btnDown');
    }
}
