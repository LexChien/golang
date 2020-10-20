import Phaser from 'phaser'

export default class RoomIcon extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene)
        this.m_Scene = scene

        this.BG = scene.add.sprite(0, 0, 'bac', 'ui_table_a01.png');
        this.add(this.BG);

        this.add(scene.add.sprite(-50, 0, 'bac', 'area_choose_B03.png'));
        this.add(scene.add.sprite(50, 0, 'bac', 'area_choose_A02.png'));
        // this.add(scene.add.sprite(x + 100, y, 'bac', 'area_choose_B03.png'));
        scene.add.existing(this);
    }
    private m_Scene: Phaser.Scene;
    private BG;

}
