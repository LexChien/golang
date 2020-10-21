import Phaser from 'phaser'
import SceneUI from '~/object/SceneUI';
import RoomManager from '~/object/RoomManager';
const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class bacScene extends Phaser.Scene {
    constructor() {
        super('bac')
    }

    private cursors;

    preload() {
        this.load.multiatlas('bac', 'sprite/bac.json', 'sprite');
        this.load.image('BG', 'sprite/Scene_A.png');
    }

    create() {
        this.add.sprite(640, 360, 'BG'); //背景

        var gridTable = new RoomManager(this); //scrollview type:GridTable
        var UI = new SceneUI(this);  //UI物件 type:group

        this.cursors = this.input.keyboard.createCursorKeys(); //輸入控制
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

