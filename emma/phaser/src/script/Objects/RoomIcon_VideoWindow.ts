import Phaser from 'phaser'
import RoomIcon from './RoomIcon';

export default class RoomIcon_VideoWindow extends Phaser.GameObjects.Container {
    constructor(scene, roomicon) {
        super(scene)
        this.m_Scene = scene;
        this.m_RoomIcon = roomicon;

        this.ui_zoomin = scene.add.sprite(345, 213, 'main', 'ui_zoom_in.png');
        this.img_signalBg = scene.add.sprite(64, 260, 'main', 'ui_frame_a01.png');
        this.img_signal = scene.add.sprite(64, 260, 'main', 'ui_ internet_05.png');
        this.ui_video = scene.add.sprite(191, 260, 'main', 'ui_video_01.png');
        this.ui_tablelog = scene.add.sprite(317, 260, 'main', 'ui_game_table_log_01.png');

        this.add(this.ui_zoomin);
        this.add(this.img_signalBg);
        this.add(this.img_signal);
        this.add(this.ui_video);
        this.add(this.ui_tablelog);

        this.ui_tablelog.setInteractive();
        this.ui_tablelog.on('pointerdown', () => this.pointerdown());
    }

    private m_Scene: Phaser.Scene;
    private m_RoomIcon: RoomIcon;

    private ui_zoomin: Phaser.GameObjects.Sprite; //放大影片按鈕
    private img_signalBg: Phaser.GameObjects.Sprite; //訊號底圖
    private img_signal: Phaser.GameObjects.Sprite; //訊號
    private ui_video: Phaser.GameObjects.Sprite; //切換影片按鈕
    private ui_tablelog: Phaser.GameObjects.Sprite; //觀看紀錄按鈕

    pointerdown(){
        console.log('按下');
    }
}