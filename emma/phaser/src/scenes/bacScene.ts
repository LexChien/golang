import Phaser from 'phaser'
import SceneUI from '~/script/Objects/SceneUI';
import RoomManager from '~/script/Objects/RoomManager';
import FileManager from '~/script/Manager/FileManager';
import AtlasMgr from '~/script/Manager/AniAtlasMgr';

export default class bacScene extends Phaser.Scene {
    constructor() {
        super('bac')
    }

    private cursors;

    preload() {
        this.load.image('BG', 'sprite/Scene_A.png');
        //加載字串表
        this.load.json('system', 'excel/SystemText.json');
        this.load.json('message', 'excel/MessageData.json');
        //加載圖集
        new AtlasMgr(this);
    }

    create() {
        //加載JSON資料
        new FileManager(this);
        //背景
        this.add.sprite(640, 360, 'BG');
        //產生scrollview
        new RoomManager(this);
        //產生UI物件
        new SceneUI(this);

        this.cursors = this.input.keyboard.createCursorKeys(); //輸入控制

        // console.log(FileManager.getSysText(5)); //測試取得語系系統字
        // console.log(FileManager.getMsgDate(3)); //測試取得語系msg
        // this.add.sprite(640, 360, 'lang', 'Choose_Player_01.png'); //測試語系圖

    }

    update() {
        // if (this.cursors.left.isDown) {
        //     this.icons.x -= 10;
        // }
        // else if (this.cursors.right.isDown) {
        //     this.icons.x += 10;
        // }
    }

}

