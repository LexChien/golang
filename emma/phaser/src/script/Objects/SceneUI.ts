import Phaser from 'phaser'

export default class SceneUI {
    constructor(scene) {
        // super(scene)
        this.m_Scene = scene

        //沒有add進這個Group  需要用到到時候再加
        //上方
        this.btn_BetLog = scene.add.sprite(1169, 38, 'main', 'UI_Bet_Log_01.png');
        this.btn_Setting = scene.add.sprite(1240, 38, 'main', 'UI_TOP_Setup_01.png');
        this.dropDown = scene.add.sprite(162, 40, 'main', 'area_choose_A01.png');
        this.dropDown_t = scene.add.sprite(279, 32, 'main', 'area_choose_A02.png');
        // this.txt_dropDown = scene.add.text(24, 39, "見習廳(10-1000)", { font: "22px fontMin", fill: "#ffef6e", }).setStroke("271913", 2).setOrigin(0, 0.5);
        // scene.add.text(24, 50, "見習廳(10-1000)", { font: "22px fontMin", fill: "#ffef6e", }).setStroke("271913", 2).setOrigin(0, 0.5);
        // scene.add.text(24, 70, "見習廳(10-1000)", { font: "22px fontMin", fill: "#ffef6e", }).setStroke("271913", 2).setOrigin(0, 0.5);

        //下方
        this.bg_down = scene.add.sprite(640, 680, 'main', 'UI_down_01.png');
        this.coin_icon = scene.add.sprite(152, 691, 'main', 'set_up_Chips.png').setScale(0.7);
        this.namebg = scene.add.sprite(276, 692, 'main', 'MG_UI_player_crtframe_a01a.png'); //
        this.chip_setting = scene.add.sprite(1021, 676, 'main', 'Change_Coins_01.png');
        // this.btn_auto = scene.add.sprite(1151, 690, 'main', 'UI_Auto_bn01.png');

        this.spr_head = scene.add.sprite(67, 671, 'head', 'profile_picture_01.png').setScale(0.75);
        this.spr_headbox = scene.add.sprite(69, 671, 'head', 'Player_box_02.png');

        for (let i = 0; i < 5; i++) {
            let chip = scene.add.sprite(493 + 106 * i, 694, 'main', 'UI_Chips_' + (13 + i) + '.png');
            this.chips.push(chip);
        }

        this.btn_Setting.setInteractive();
        this.btn_Setting.on('pointerdown', () => this.btnDown());  //設定紐按鍵事件

        scene.add.existing(this);
    }
    private m_Scene: Phaser.Scene;
    private bg_down; //下方背景條
    private btn_auto; //自動重複按紐
    private btn_BetLog; //押注紀錄按紐
    private btn_Setting; //設定按紐
    private spr_head; //頭像
    private spr_headbox; //頭像框
    private coin_icon; //金幣圖示
    private namebg; //姓名框
    private chip_setting; //籌碼設定紐
    //下拉物件拆出去
    private dropDown; //下拉切換廳館
    private dropDown_t; //廳館下拉三角形
    private txt_dropDown; //下拉文字
    //籌碼物件拆出去
    private chips: any[] = []; //籌碼們


    btnDown() {
        console.log('btnDown');
    }
}
