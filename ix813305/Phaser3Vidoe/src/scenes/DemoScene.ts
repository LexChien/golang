import Phaser from 'phaser'
const Random = Phaser.Math.Between;

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
export default class DemoScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}
    print:any;
	preload()
    {
        this.load.image('button', 'images/ui_table_a01.png');
        this.load.image('UI_CHOOSE_bg', 'images/UI_CHOOSE_bg.jpg');
        
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create()
    {
        var gridTable = this.rexUI.add.gridTable({
            x: 640,
            y: 300,
            width: 1280,
            height: 500,

            scrollMode: 0,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

            table: {
                cellWidth: 1180,
                cellHeight: 280,

                columns: 1,

                mask: {
                    padding: 2,
                },

                reuseCellContainer: true,
            },
          
            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            space: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
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
                    
                    cellContainer = scene.rexUI.add.label({
                        width: width,
                        height: height,

                        orientation: 0,
                        background: scene.add.sprite(0, 0, 'button').setOrigin(0.5, 0.5),//scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                        icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, 0x0),
                        text: scene.add.text(0, 0, ''),

                        space: {
                            icon: 10,
                            left: 15,
                        }
                    });
                    // console.log(cell.index + ': create new cell-container');
                } else {
                    // console.log(cell.index + ': reuse cell-container');
                }

                cellContainer.setAlpha(1);
                // Set properties from item value
                cellContainer.setMinSize(width, height); // Size might changed in this demo
                cellContainer.getElement('text').setText(item.id); // Set text of text object
                cellContainer.getElement('icon').setFillStyle(item.color); // Set fill color of round rectangle object
                // cellContainer.getElement('background').setStrokeStyle(2, COLOR_DARK).setDepth(0);
                return cellContainer;
            },
            items: getItems(100)
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        this.print = this.add.text(0, 0, '');
      
        // var scene = this;
        // gridTable
        //     .on('cell.over', function (cellContainer, cellIndex) {
        //         cellContainer.getElement('background')
        //             .setStrokeStyle(2, COLOR_LIGHT)
        //             .setDepth(1);
        //     }, this)
        //     .on('cell.out', function (cellContainer, cellIndex) {
        //         cellContainer.getElement('background')
        //             .setStrokeStyle(2, COLOR_DARK)
        //             .setDepth(0);
        //     }, this)
        //     .on('cell.swiperight', function (cellContainer, cellIndex) {
        //         // var scene = cell.scene;
        //         scene.print.text += 'swipe-right (' + cellIndex + ': ' + cellContainer.text + ')\n';                
        //         // 1. Fade-out cellContainer
        //         // 2. Mark `item.removed` to `true`
        //         // 3. Narrow down cell height
        //         // 4. Reset cell height
        //         // 5. Remove item data from item array                
        //         scene.rexUI.waitComplete(scene.tweens.add({
        //             targets: cellContainer,
        //             alpha: 0,
        //             x: '+=150',
        //             duration: 500
        //         }))
        //             .then(function () {
        //                 gridTable.items[cellIndex].removed = true;
        //                 var cell = gridTable.getElement('table').getCell(cellIndex);
        //                 return scene.rexUI.waitComplete(scene.tweens.add({
        //                     targets: cell,
        //                     height: 0,
        //                     duration: 500,
        //                     onUpdate: function () {
        //                         gridTable.refresh(); // Invoke *createCellContainerCallback* for each cell again
        //                     }
        //                 }));
        //             })
        //             .then(function () {
        //                 var cell = gridTable.getElement('table').getCell(cellIndex);
        //                 cell.setDeltaHeight(0);
        //                 Phaser.Utils.Array.RemoveAt(gridTable.items, cellIndex);
        //                 gridTable.refresh();
        //             })
        //     }, this)

        this.add.text(0, 580, 'Swipe-right cell to remove it')

    }
}
var getItems = function (count) {
    var data :any[] = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id:i,
            color: Random(0, 0xffffff)
        });
    }
    return data;
}

