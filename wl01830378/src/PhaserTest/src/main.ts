import Phaser from 'phaser'

import HelloWorldScene from './scenes/HelloWorldScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1280,
	height: 720,
	parent: 'CanvasDiv',
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
	dom: {
		createContainer: true
	},
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 0 }
		}
	},
	scene: [HelloWorldScene]
}
var game = new Phaser.Game(config);
export default game;
window.onload = function () {
	window.focus();
	resize();
	window.addEventListener('resize', resize, false);
}

function resize() {
	var canvas = document.getElementsByTagName('canvas');
	var canvItem: any = canvas.item(0);
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var windowRatio = windowWidth / windowHeight;
	var gameRatio = parseFloat(game.config.width.toString()) / parseFloat(game.config.height.toString());
	if (windowRatio < gameRatio) {
		canvItem.style.width = windowWidth + 'px';
		canvItem.style.height = (windowWidth / gameRatio) + 'px';
	} else {
		canvItem.style.width = (windowHeight * gameRatio) + 'px';
		canvItem.style.height = windowHeight + 'px';
	}
	// console.log(canvItem.style.width + " " + canvItem.style.height);
}