import Phaser from 'phaser'

export default class RoomIcon extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.m_Scene = scene

        this.BG = scene.add.sprite(590, 140, 'main', 'ui_table_a01.png');
        this.favorite = scene.add.sprite(26, 22, 'main', 'heartBtn_01.png');
        this.ui_zoomin = scene.add.sprite(345, 213, 'main', 'ui_zoom_in.png');
        this.ui_video = scene.add.sprite(191, 260, 'main', 'ui_video_01.png');
        this.ui_tablelog = scene.add.sprite(317, 260, 'main', 'ui_game_table_log_01.png');
        this.tag_F01_type = scene.add.sprite(451, 21, 'main', 'ui_table_F01_01.png');
        this.tag_F02_type = scene.add.sprite(583, 21, 'main', 'ui_table_F01_04.png');
        // this.txt_F01 = scene.add.text(451, 23, "一般", { font: "20px fontMin", fill: "#ffef6e" }).setStroke("630202", 2).setOrigin(0.5);
        // this.txt_F02 = scene.add.text(583, 23, "特殊", { font: "20px fontMin", fill: "#b39b44" }).setOrigin(0.5);
        this.img_goodroad = scene.add.sprite(452, 74, 'main', 'good_road_01.png');
        this.img_roomtype_bg = scene.add.sprite(588, 74, 'main', 'ui_table_F02_01.png');
        this.img_roomtype_c = scene.add.sprite(633, 74, 'main', 'ui_table_F02_02.png');
        this.btn_info = scene.add.sprite(408, 144, 'main', 'ui_explanation_01.png');
        this.img_btn_bg = scene.add.sprite(520, 227, 'main', 'ui_ok_no_reture_frame.png');
        this.btn_ok = scene.add.sprite(435, 226, 'main', 'ui_ok_no_reture_a01.png');
        this.btn_cancel = scene.add.sprite(520, 226, 'main', 'ui_ok_no_reture_b01.png');
        this.btn_double = scene.add.sprite(605, 226, 'main', 'ui_ok_no_reture_c01.png');
        this.add(this.tag_F01_type);
        this.add(this.tag_F02_type);
        // this.add(this.txt_F01);
        // this.add(this.txt_F02);
        this.add(this.BG);
        this.add(this.favorite);
        this.add(this.ui_zoomin);
        this.add(this.ui_video);
        this.add(this.ui_tablelog);
        this.add(this.img_goodroad);
        this.add(this.img_roomtype_bg);
        this.add(this.img_roomtype_c);
        this.add(this.btn_info);
        this.add(this.img_btn_bg);
        this.add(this.btn_ok);
        this.add(this.btn_cancel);
        this.add(this.btn_double);


        this.tag_F01_type.setInteractive();
        this.tag_F01_type.on('pointerdown', () => this.ChangeRoomBG(0));
        this.tag_F02_type.setInteractive();
        this.tag_F02_type.on('pointerdown', () => this.ChangeRoomBG(1));


        scene.add.existing(this);
    }
    private m_Scene: Phaser.Scene;
    private BG; //底圖板
    private favorite; //我的最愛
    private ui_zoomin; //放大影片按鈕
    private ui_video; //切換影片按鈕
    private ui_tablelog; //觀看紀錄按鈕
    private tag_F01_type: Phaser.GameObjects.Sprite; //一般背景標籤
    private tag_F02_type: Phaser.GameObjects.Sprite; //特殊背景標籤
    private txt_F01; //一般背景文字
    private txt_F02; //特殊背景文字
    private img_goodroad; //好路
    private img_roomtype_bg; //一般免傭切換底圖
    private img_roomtype_c; //一般免傭切換圈圈
    private btn_info; //更多資訊
    private img_btn_bg; //確定按鈕背景
    private btn_ok; //確定按鈕
    private btn_cancel; //取消按鈕
    private btn_double; //重複按鈕

    ChangeRoomBG(type: number) {
        console.log('ChangeRoomBG ' + type);
        if (type == 0) {
            this.tag_F01_type.setFrame('ui_table_F01_01.png');
            this.tag_F02_type.setFrame('ui_table_F01_04.png');
        } else {
            this.tag_F01_type.setFrame('ui_table_F01_02.png');
            this.tag_F02_type.setFrame('ui_table_F01_03.png');
        }
    }

}
