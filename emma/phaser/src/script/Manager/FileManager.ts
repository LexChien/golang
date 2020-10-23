import Phaser from 'phaser'
import { StringExtend } from './Extend';
import NetworkManager from './NetworkManager';

export default class FileManager{
    constructor(scene){
        FileManager.ins = this;
        this._lisMsgDate = scene.cache.json.get('message');
        this._lisSysText = scene.cache.json.get('system');
    }

    static ins: FileManager;

    _lisMsgDate; //彈框訊息list
    _lisSysText; //系統字list

    //取得系統字串
    static getSysText(SysId: number, str?: any[]){
        switch (NetworkManager.Language) {
            case "TC":
                if (str) return StringExtend.Format(FileManager.ins._lisSysText[SysId].TC, str);
                else return FileManager.ins._lisSysText[SysId].TC;
            case "SC":
                if (str) return StringExtend.Format(FileManager.ins._lisSysText[SysId].SC, str);
                else return FileManager.ins._lisSysText[SysId].SC;
            case "EN":
                if (str) return StringExtend.Format(FileManager.ins._lisSysText[SysId].EN, str);
                else return FileManager.ins._lisSysText[SysId].EN;
        }
    }

    //取得彈框訊息資料
    static getMsgDate(MsgId: number): MsgData {
        return FileManager.ins._lisMsgDate[NetworkManager.Language][MsgId];
    }

    //取得彈框訊息層級
    static getMsgLayer(MsgId: number): number {
        return FileManager.ins._lisMsgDate[NetworkManager.Language][MsgId].Layer;
    }

    //取得彈框訊息類型
    static getMsgType(MsgId: number): number {
        return FileManager.ins._lisMsgDate[NetworkManager.Language][MsgId].Type;
    }
} 
export class SysText //系統字
{
    TC: string = "";
    SC: string = "";
    EN: string = "";
}
export class MsgData //彈框訊息
{
    Type: number = 0; //框種類
    MsgTitle: string = ""; //標題
    Content: string = ""; //內容
    ButtonText: string = ""; //按鈕文字
    SoundID: number = 0; //音效Id
    Time: number = 0; //倒數
    Layer: number = 0; //層級
}
