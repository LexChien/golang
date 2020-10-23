import Phaser from 'phaser'
import FileManager from '../Manager/FileManager';
import NetworkManager from '../Manager/NetworkManager';
import RoomIcon from './RoomIcon';

export default class TableTypeCtrl extends Phaser.GameObjects.Container {
    constructor(scene: Phaser.Scene, roomicon) {
        super(scene)
        this.m_Scene = scene;
        this.m_RoomIcon = roomicon;

        this.BG = scene.add.sprite(590, 140, 'main', 'ui_table_a01.png');
        this.tag_F01_type = scene.add.sprite(451, 21, 'main', 'ui_table_F01_01.png');
        this.tag_F02_type = scene.add.sprite(583, 21, 'main', 'ui_table_F01_04.png');
        this.img_roomtype_bg = scene.add.sprite(588, 74, 'main', 'ui_table_F02_01.png');
        this.img_roomtype_c = scene.add.sprite(633, 74, 'main', 'ui_table_F02_02.png');
        this.add(this.tag_F01_type);
        this.add(this.tag_F02_type);
        this.add(this.BG);

        this.txt_tabelType_0 = scene.add.text(451, 23, "一般", { font: "20px fontMin", fill: "#ffef6e" }).setStroke("630202", 2).setOrigin(0.5);
        this.txt_tabelType_1 = scene.add.text(583, 23, "特殊", { font: "20px fontMin", fill: "#b39b44" }).setOrigin(0.5);
        this.txt_betType = scene.add.text(574, 74, "非免傭", { font: "20px fontMin", fill: "#ffffff" }).setOrigin(0.5);

        this.group_normal = scene.add.group();
        let text01, text02;
        let pos = [[1040, 194], [785, 194], [912, 89], [1083, 89], [742, 89]];
        let str = ['1:0.95', '1:0.95', '1:8', '1:11', '1:11'];
        this.arry_normal_text = [];
        for (let i = 0; i < 5; i++) {
            text01 = scene.add.text(pos[i][0], pos[i][1], FileManager.getSysText(13 + i), { font: "20px fontMin", fill: "#b8ffcc" }).setOrigin(0.5);
            text02 = scene.add.text(pos[i][0], pos[i][1] + 39, str[i], { font: "20px fontMin", fill: "#b8ffcc" }).setOrigin(0.5);
            this.arry_normal_text.push([text01, text02]);
            this.add(text01);
            this.add(text02);
            this.group_normal.add(text01);
            this.group_normal.add(text02);
        }
        // this.group_special = scene.add.group();
        // //[莊,閒,和,莊對,閒對,大,小,莊天王,閒天王,莊龍寶,閒龍寶,幸運6]
        // pos = [];
        // str = [];
        // this.arry_special_text = [];
        // for (let i = 0; i < 12; i++) {
        //     text01 = scene.add.text(pos[i][0], pos[i][1], FileManager.getSysText(13 + i), { font: "20px fontMin", fill: "#b8ffcc" }).setOrigin(0.5);
        //     text02 = scene.add.text(pos[i][0], pos[i][1] + 39, str[i], { font: "20px fontMin", fill: "#b8ffcc" }).setOrigin(0.5);
        //     this.arry_special_text.push([text01, text02]);
        //     this.add(text01);
        //     this.add(text02);
        //     this.group_special.add(text01);
        //     this.group_special.add(text02);
        // }

        this.add(this.img_roomtype_bg);
        this.add(this.img_roomtype_c);

        this.add(this.txt_tabelType_0);
        this.add(this.txt_tabelType_1);
        this.add(this.txt_betType);

        if (NetworkManager.Language == 'EN') {
            this.txt_betType.setFontSize(18);
        }

        this.tag_F01_type.setInteractive();
        this.tag_F01_type.on('pointerdown', () => this.ChangeRoomBG(0));
        this.tag_F02_type.setInteractive();
        this.tag_F02_type.on('pointerdown', () => this.ChangeRoomBG(1));
    }

    private m_Scene: Phaser.Scene;
    private m_RoomIcon: RoomIcon;

    private BG: Phaser.GameObjects.Sprite; //底圖板
    private tag_F01_type: Phaser.GameObjects.Sprite; //一般背景標籤
    private tag_F02_type: Phaser.GameObjects.Sprite; //特殊背景標籤
    private img_roomtype_bg: Phaser.GameObjects.Sprite; //免傭切換底圖
    private img_roomtype_c: Phaser.GameObjects.Sprite; //免傭切換圈圈
    private txt_tabelType_0: Phaser.GameObjects.Text; //一般背景文字
    private txt_tabelType_1: Phaser.GameObjects.Text; //特殊背景文字
    private txt_betType: Phaser.GameObjects.Text; //非免傭/免傭
    private group_normal: Phaser.GameObjects.Group; //一般狀態文字群組 
    private group_special: Phaser.GameObjects.Group; //特殊狀態文字群組 

    private arry_normal_text: Phaser.GameObjects.Text[][]; //[[莊,1:0.95],[閒,1:0.95],[和...],[莊對...],[閒對...]]
    private arry_special_text: Phaser.GameObjects.Text[][]; //特殊的[莊,閒,和,莊對,閒對,大,小,莊天王,閒天王,莊龍寶,閒龍寶,幸運6]

    ChangeRoomBG(type: number) {
        if (type == 0) {
            this.tag_F01_type.setFrame('ui_table_F01_01.png');
            this.tag_F02_type.setFrame('ui_table_F01_04.png');
            this.txt_tabelType_0.setColor('#ffef6e');
            this.txt_tabelType_0.setStroke("630202", 2);
            this.txt_tabelType_1.setColor('#b39b44');
            this.txt_tabelType_1.setStroke("000000", 0);
            this.BG.setFrame('ui_table_a01.png');
            this.img_roomtype_bg.setFrame('ui_table_F02_01.png');
            this.img_roomtype_c.setFrame('ui_table_F02_02.png');
        } else {
            this.tag_F01_type.setFrame('ui_table_F01_02.png');
            this.tag_F02_type.setFrame('ui_table_F01_03.png');
            this.txt_tabelType_0.setColor('#b39b44');
            this.txt_tabelType_0.setStroke('000000', 0);
            this.txt_tabelType_1.setColor('#ffef6e');
            this.txt_tabelType_1.setStroke("034181", 2);
            this.BG.setFrame('ui_table_b01.png');
            this.img_roomtype_bg.setFrame('ui_table_F04_01.png');
            this.img_roomtype_c.setFrame('ui_table_F04_02.png');
        }
    }
}