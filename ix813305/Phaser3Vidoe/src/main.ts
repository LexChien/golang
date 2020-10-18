import Phaser from 'phaser'

// import HelloWorldScene from './scenes/HelloWorldScene'
import Videoscene from './scenes/VideoScence'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: 1024,
	height: 640,
	// physics: {
	// 	default: 'arcade',
	// 	arcade: {
	// 		gravity: { y: 200 }
	// 	}
	// },
	parent: 'CanvasDiv',
	dom: {
        createContainer: true
    },
	scene: [Videoscene]
}

export default new Phaser.Game(config)
