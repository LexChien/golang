///<reference path="js/babylon.d.ts" />
///<reference path="js/babylon.gui.d.ts" />

class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;

    constructor(canvasElement: string) {
        // Create canvas and engine.
        this._canvas = document.getElementById(canvasElement) as HTMLCanvasElement;
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        this._scene = new BABYLON.Scene(this._engine);
        this._camera = new BABYLON.ArcRotateCamera("Camera", 1, 0, 1, new BABYLON.Vector3(0, 0, 0), this._scene);
        this._camera.setTarget(BABYLON.Vector3.Zero()); // Target the camera to scene origin.
        this._camera.attachControl(this._canvas, true);// Attach the camera to the canvas.
        this._camera.panningSensibility = 0; //这个值用来控制平移的灵敏度，为0就是完全不响应平移
        this._camera.lowerRadiusLimit = this._camera.radius; //控制縮放
        this._camera.upperRadiusLimit = this._camera.radius;

        var light = new BABYLON.PointLight("Point", new BABYLON.Vector3(5, 10, 5), this._scene);

        // var spm = new BABYLON.SpritePackedManager("spm", "sprite/test.plist.png", 3, this._scene);
        // var sprite1 = new BABYLON.Sprite("player", spm);
        // sprite1.playAnimation(0, 3, true, 2000, null);
        // sprite1.position.y = -0.3;
        // sprite1.size = 1;
        // sprite1.invertU = 0;

        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

        var button = BABYLON.GUI.Button.CreateImageWithCenterTextButton("but", "Click me!", "sprite/desktop_bg_b01.png");
        button.width = 0.2;
        button.height = "40px";
        button.color = "white";
        button.background = "green";
        advancedTexture.addControl(button);
    }

    doRender(): void {
        // Run the render loop.
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // The canvas/window resize event handler.
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'.
    let game = new Game('renderCanvas');

    // Create the scene.
    game.createScene();

    // Start render loop.
    game.doRender();
});