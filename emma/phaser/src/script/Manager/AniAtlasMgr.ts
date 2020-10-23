import { StringExtend } from './Extend';
import NetworkManager from './NetworkManager';

export default class AtlasMgr {
    static ins: AtlasMgr;
    private strPlayerHead: string = "profile_picture_";

    constructor(scene) {
        AtlasMgr.ins = this;

        let json_name = 'sprite/lang_' + NetworkManager.Language
        scene.load.atlas('lang', json_name + '.png', json_name + '.json'); //語系
        scene.load.atlas('main', 'sprite/MainUI.png', 'sprite/MainUI.json'); //主UI
        scene.load.atlas('setting', 'sprite/Setting.png', 'sprite/Setting.json'); //所有彈框設定路單押注記錄介面UI
        scene.load.atlas('head', 'sprite/PlayerHead.png', 'sprite/PlayerHead.json'); //頭像相關
        scene.load.atlas('bgObj', 'sprite/bg.png', 'sprite/bg.json'); //背景相關
        scene.load.atlas('calculator', 'sprite/Calculator.png', 'sprite/Calculator.json'); //小鍵盤

        console.log('加載圖集完成');
    }

    //同圖集更換圖片方法(語系同理)：Sprite.setFrame('名稱.png')
    //不同圖集更換圖片方法：Sprite.setTexture('圖集key','名稱.png')

    //獲取頭像名稱
    public getPlayerHeadName(id: number) {
        let picName: string = "";
        if (id == -1) picName = this.strPlayerHead + StringExtend.padLeft(1, 2);
        else picName = this.strPlayerHead + StringExtend.padLeft(id + 1, 2);
        return picName;
    }

} 