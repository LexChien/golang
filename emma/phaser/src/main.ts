import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	physics: {
		default: 'arcade',
	},
	plugins: {
		global: [NineSlicePlugin.DefaultCfg,],
		scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }],
	},
	scene: [HelloWorldScene]
}

export default new Phaser.Game(config)
