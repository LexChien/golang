import Phaser from 'phaser'
import RoomIcon from './RoomIcon';
import NinePatch from 'phaser3-rex-plugins/plugins/ninepatch.js';
import FileManager from '../Manager/FileManager';
import NetworkManager from '../Manager/NetworkManager';

export default class RoomIcon_MapWindow extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, roomicon) {
        super(scene)
        this.m_Scene = scene;
        this.m_RoomIcon = roomicon;

        this.img_ImapBg = scene.add.sprite(169, 142, 'main', 'road_01.png');
        this.btn_RoadMap = scene.add.sprite(348, 94, 'main', 'road_map_icon_01.png');
        this.btn_History = scene.add.sprite(348, 188, 'main', 'ui_shoe_01.png');
        this.btn_video = scene.add.sprite(317, 260, 'main', 'ui_video_01.png');

        this.img_infoBg = new NinePatch(scene, 128, 260, 256, 38, {
            key: 'main',
            stretchMode: 0,
            columns: [20, undefined, 20],
            rows: [10, undefined, 10],
            baseFrame: 'ui_frame_a01.png',
        });

        this.B_01 = scene.add.sprite(80, 260, 'main', 'choose_UI_TOP_MB05.png');
        this.B_02 = scene.add.sprite(98, 260, 'main', 'choose_UI_TOP_MB05.png');
        this.B_03 = scene.add.sprite(116, 260, 'main', 'choose_UI_TOP_MB05.png');
        this.P_01 = scene.add.sprite(189, 260, 'main', 'choose_UI_TOP_MB02.png');
        this.P_02 = scene.add.sprite(207, 260, 'main', 'choose_UI_TOP_MB02.png');
        this.P_03 = scene.add.sprite(225, 260, 'main', 'choose_UI_TOP_MB02.png');
        this.B_text = scene.add.text(45, 260, FileManager.getSysText(5), { font: "12px fontMin", fill: "#ff4545" }).setOrigin(0.5).setStroke("281010", 2);
        this.P_text = scene.add.text(154, 260, FileManager.getSysText(6), { font: "12px fontMin", fill: "#25a0ff" }).setOrigin(0.5).setStroke("281010", 2);

        this.add(this.img_ImapBg);
        this.add(this.btn_RoadMap);
        this.add(this.btn_History);
        this.add(this.img_infoBg);
        this.add(this.btn_video);
        this.add(this.B_text);
        this.add(this.P_text);
        this.add(this.B_01);
        this.add(this.B_02);
        this.add(this.B_03);
        this.add(this.P_01);
        this.add(this.P_02);
        this.add(this.P_03);

        if (NetworkManager.Language == 'EN') {
            this.B_text.setFontSize(11);
            this.P_text.setFontSize(11);
        }

        this.btn_video.setInteractive();
        this.btn_video.on('pointerdown', () => this.OpenVideo());

    }

    private m_Scene: Phaser.Scene;
    private m_RoomIcon: RoomIcon;

    private img_ImapBg: Phaser.GameObjects.Sprite; //網格背景
    private btn_RoadMap: Phaser.GameObjects.Sprite; //開啟路單
    private btn_History: Phaser.GameObjects.Sprite; //開啟歷史牌型
    private img_infoBg; //路單資訊底圖
    private btn_video: Phaser.GameObjects.Sprite; //觀看影片按鈕

    private B_text: Phaser.GameObjects.Text; //莊問路文字
    private B_01: Phaser.GameObjects.Sprite;
    private B_02: Phaser.GameObjects.Sprite;
    private B_03: Phaser.GameObjects.Sprite;
    private P_text: Phaser.GameObjects.Text; //閒問路文字
    private P_01: Phaser.GameObjects.Sprite;
    private P_02: Phaser.GameObjects.Sprite;
    private P_03: Phaser.GameObjects.Sprite;


    OpenVideo() {
        console.log('OpenVideo');
        this.m_RoomIcon.OpenVideo(true);
    }
}