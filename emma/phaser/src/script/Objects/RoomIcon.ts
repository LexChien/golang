import Phaser from 'phaser'
import FileManager from '../Manager/FileManager';
import NetworkManager from '../Manager/NetworkManager';
import clock from './clock';
import RoomIcon_MapWindow from './RoomIcon_MapWindow';
import RoomIcon_VideoWindow from './RoomIcon_VideoWindow';
import TableTypeCtrl from './TableTypeCtrl';

export default class RoomIcon extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.m_Scene = scene;
        this.obj_tabelBG = new TableTypeCtrl(scene, this);
        this.obj_VideoWindow = new RoomIcon_VideoWindow(scene, this);
        this.obj_MapWindow = new RoomIcon_MapWindow(scene, this);
        this.favorite = scene.add.sprite(26, 22, 'main', 'heartBtn_01.png');
        this.ui_perple = scene.add.sprite(317, 22, 'main', 'ui_person_A01.png');
        this.img_goodroadBG = scene.add.sprite(452, 74, 'main', 'good_road_01.png');
        this.img_goodroad = scene.add.sprite(452, 74, 'lang', 'good_road_word_07.png');
        this.btn_info = scene.add.sprite(408, 144, 'main', 'ui_explanation_01.png');
        this.img_btn_bg = scene.add.sprite(520, 227, 'main', 'ui_ok_no_reture_frame.png');
        this.btn_ok = scene.add.sprite(435, 226, 'main', 'ui_ok_no_reture_a01.png');
        this.btn_cancel = scene.add.sprite(520, 226, 'main', 'ui_ok_no_reture_b01.png');
        this.btn_double = scene.add.sprite(605, 226, 'main', 'ui_ok_no_reture_c01.png');
        this.mClock = new clock(scene, 520, 144, 'main', 'BP_Max_00.png', this);
        this.img_overpeople = scene.add.sprite(776, 148, 'lang', 'no_empty_seat.png');

        this.txt_roomInfo = scene.add.text(111, 22, "1001 / 第60局", { font: "20px fontMin", fill: "#ffef6e" }).setOrigin(0.5);
        this.txt_people = scene.add.text(221, 22, "9999", { font: "20px fontMin", fill: "#ffef6e" }).setOrigin(0.5);
        this.txt_betRange = scene.add.text(307, 22, "999-9999", { font: "20px fontMin", fill: "#3f2606" }).setOrigin(0.5);
        this.txt_percentB_text = scene.add.text(860, 21, FileManager.getSysText(7), { font: "20px fontMin", fill: "#f5e66a" }).setStroke("4a0000", 2).setOrigin(0.5);
        this.txt_percentB_num = scene.add.text(919, 21, '9999999', { font: "20px fontMin", fill: "#f5e66a" }).setStroke("4a0000", 2).setOrigin(0.5);
        this.txt_percentP_text = scene.add.text(1038, 21, FileManager.getSysText(8), { font: "20px fontMin", fill: "#f5e66a" }).setStroke("171c2d", 2).setOrigin(0.5);
        this.txt_percentP_num = scene.add.text(1097, 21, '9999999', { font: "20px fontMin", fill: "#f5e66a" }).setStroke("171c2d", 2).setOrigin(0.5);
        this.txt_orderId = scene.add.text(1070, 269, "", { font: "15px fontMin", fill: "#ffffff" }).setStroke("000000", 2).setOrigin(0.5);


        this.add(this.obj_tabelBG);
        this.add(this.favorite);
        this.add(this.ui_perple);
        this.add(this.img_goodroadBG);
        this.add(this.img_goodroad);
        this.add(this.btn_info);
        this.add(this.img_btn_bg);
        this.add(this.btn_ok);
        this.add(this.btn_cancel);
        this.add(this.btn_double);
        this.add(this.mClock);
        this.add(this.img_overpeople);
        this.add(this.obj_VideoWindow);
        this.add(this.obj_MapWindow);

        this.add(this.txt_roomInfo);
        this.add(this.txt_people);
        this.add(this.txt_betRange);
        this.add(this.txt_percentB_text);
        this.add(this.txt_percentB_num);
        this.add(this.txt_percentP_text);
        this.add(this.txt_percentP_num);
        this.add(this.txt_orderId);

        this.OpenVideo(false);
        this.img_overpeople.visible = false;
        this.mClock.init();


        scene.add.existing(this);
    }
    private m_Scene: Phaser.Scene;
    private obj_tabelBG: TableTypeCtrl; //背景控制
    private favorite: Phaser.GameObjects.Sprite; //我的最愛
    private ui_perple: Phaser.GameObjects.Sprite; //下注人數按鈕
    private obj_VideoWindow: RoomIcon_VideoWindow; //影片視窗
    private obj_MapWindow: RoomIcon_MapWindow; //路單視窗
    private img_goodroadBG: Phaser.GameObjects.Sprite; //好路背景
    private img_goodroad: Phaser.GameObjects.Sprite; //好路
    private btn_info: Phaser.GameObjects.Sprite; //更多資訊
    private img_btn_bg: Phaser.GameObjects.Sprite; //確定按鈕背景
    private btn_ok: Phaser.GameObjects.Sprite; //確定按鈕
    private btn_cancel: Phaser.GameObjects.Sprite; //取消按鈕
    private btn_double: Phaser.GameObjects.Sprite; //重複按鈕

    private txt_roomInfo: Phaser.GameObjects.Text; //桌號+局號
    private txt_people: Phaser.GameObjects.Text; //人數
    private txt_betRange: Phaser.GameObjects.Text; //押注範圍
    private txt_percentB_text: Phaser.GameObjects.Text; //押注比例莊
    private txt_percentB_num: Phaser.GameObjects.Text; //押注比例莊
    private txt_percentP_text: Phaser.GameObjects.Text; //押注比例閒
    private txt_percentP_num: Phaser.GameObjects.Text; //押注比例閒
    private txt_orderId: Phaser.GameObjects.Text; //BT單號
    private mClock: clock; //倒數
    private img_overpeople: Phaser.GameObjects.Sprite; //人數已滿

    OpenVideo(op: boolean) {
        if (op) {
            this.obj_VideoWindow.visible = true;
            this.obj_MapWindow.visible = false;
        } else {
            this.obj_VideoWindow.visible = false;
            this.obj_MapWindow.visible = true;
        }
    }



}
