import Phaser from 'phaser'
import RoomIcon from './RoomIcon';

export default class clock extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, roomicon) {
        super(scene, x, y, texture, frame)
        this.m_Scene = scene;
        this.m_RoomIcon = roomicon;

        this.clock_num = scene.add.text(x, y + 2, '60', { font: "27px fontMin", fill: "#ffffff" }).setOrigin(0.5);
    }

    private m_Scene: Phaser.Scene;
    private m_RoomIcon: RoomIcon;

    private clock_num: Phaser.GameObjects.Text; //倒數數字

    init() {
        this.m_RoomIcon.add(this.clock_num);

    }

}