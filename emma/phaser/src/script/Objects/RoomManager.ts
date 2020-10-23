import Phaser from 'phaser'
import RoomIcon from './RoomIcon';

export default class RoomManager{
    constructor(scene) {
        // super(scene)
        this.m_Scene = scene;

        this.trackGameObject = scene.add.sprite(0, 0, 'main', 'Bar_UI_02.png').setScale(1, 0);
        this.thumbGameObject = scene.add.sprite(0, 0, 'main', 'Bar_UI_01.png')
        var gridTable = scene.rexUI.add.gridTable({
            x: 0,
            y: 720 / 2 - 10,
            anchor: { 'centerX': '50%' },
            width: 1280,
            height: 562,
            scrollMode: 0,
            table: {
                cellWidth: 1180,
                cellHeight: 282,
                columns: 1,
                mask: { padding: 0 },
                reuseCellContainer: true,
            },
            slider: {
                track: this.trackGameObject,
                thumb: this.thumbGameObject,
            },
            scroller: {
                threshold: 0,
                slidingDeceleration: 1,
                backDeceleration: 10000,
            },
            space: {
                left: 33,
                right: 33,
                top: 0,
                bottom: 0,
                slider: {
                    // left: 0,
                    // right: 20,
                    top: 20,
                    // bottom: 20,
                },
            },

            createCellContainerCallback: function (cell, cellContainer) {
                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index;

                if (item.removed) {
                    return null;
                }
                if (cellContainer === null) {
                    var container = new RoomIcon(scene);
                    cellContainer = container;
                } else {
                    // console.log(cell.index + ': reuse cell-container');
                }
                return cellContainer;
            },
            items: this.getItems(this.icon_count)
        });
        gridTable.layout();
        // gridTable.drawBounds(scene.add.graphics(), 0xff0000);
        // console.log(gridTable);
        scene.add.existing(this);
    }

    private m_Scene: Phaser.Scene;
    private trackGameObject; //拉Bar底
    private thumbGameObject; //拉Bar
    public icon_count:number = 5;

    getItems(count){
        var data: any[] = [];
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                // color: Random(0, 0xffffff)
            });
        }
        return data;
    }

}