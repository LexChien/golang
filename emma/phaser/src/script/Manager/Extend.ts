
export module StringExtend {
    /** 未輸入string或輸入Space */
    export function isNullOrWhiteSpace(value: string): boolean {
        try {
            if (value == null || value == 'undefined') return true;
            return value.replace(/\s/g, '').length < 1; //扣除空白符號，剩餘文字長度小於1為null
        }
        catch (e) {
            return false;
        }
    }

    /** value[]的值按順序插入Content的{0}中 */
    export function Format(Content: string, value: any[]): string {
        try {
            // replace字串 /{(\d+(:.*)?)}/g 說明
            // g: global 替換所有出現的字，否則只替換第一個
            // i: 不分大小寫，取得第一個符合的字串
            // m: 讀取多行文字
            // /內容/: 斜線中間為要替換的內容文字
            // 內容部分使用括號包覆
            // []: 替換括號內的字元內容 
            // [0-9]查找0~9字元 [a-z]查找小寫a~z字元 [abc]查找字元abc [^abc]查找除了abc外的字元
            // (): 替換括號內的字串內容
            return Content.replace(/{(\d+)?}/gi, function (match, i) {
                return typeof value[i] != 'undefined' && value[i] != null ? value[i] : "";
            })
        }
        catch (e) {
            return "";
        }
    }

    /** 設定大小寫 
     * PatternCase : L 小寫 U 大寫
    */
    export function formatPattern(content: string, PatternCase: string): string {
        switch (PatternCase) {
            case 'L':
                content = content.toLowerCase(); //全小寫
                break;
            case 'U':
                content = content.toUpperCase(); //全大寫
                break;
            default:
                break;
        }
        return content;
    }

    /* 左邊補0 */
    export function padLeft(str: number, len: number) {
        let Res: string = str.toString();
        return Res.length >= len ? Res : new Array(len - Res.length + 1).join("0") + Res;
    }

    /* 右邊補0 */
    export function padRight(str: number, len: number) {
        let Res: string = str.toString();
        return Res.length >= len ? Res : Res + new Array(len - Res.length + 1).join("0");
    }
}

export module Random //亂數生成
{
    //** 產生隨機亂數 min:亂數範圍最小值 max:亂數範圍最大值 */
    export function getRandom(min: number, max: number): number {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    ///** 產生隨機不重複亂數 min:亂數範圍最小值 max:亂數範圍最大值 amo:亂數個數 */
    export function getRandomArray(min: number, max: number, amo: number): Array<number> {
        var arrayTemp: Array<number> = [];
        var ranNum: number = 0;
        var exist: boolean = true;

        if (amo <= (max - min + 1)) {
            for (let i: number = 0; i < amo; i++) {
                exist = true;
                ranNum = 0;
                var count: number = 0;
                do {
                    ranNum = Random.getRandom(min, max);
                    count++;
                    //檢查array是否存在此數字(不存在為-1)
                    if (arrayTemp.indexOf(ranNum) == -1) {
                        arrayTemp.push(ranNum);
                        exist = false;
                        // ShowLog.cc_Log(ranNum);
                    }
                }
                while (exist && count < 10)
            }
        }
        return arrayTemp;
    }

}


export class TimeMgr {
    public static _dServer: number = 0;
    public static _dStart: number = 0;
    public static _dEnding: number = 0;
    public static _dDiff: number = 0;

    //計算client和server時間差
    public static setDiff(ServerT: number) {
        let curTime_: number = Date.now(); //本地時間
        TimeMgr._dDiff = ServerT - curTime_; //本地與server的時間差
        // ShowLog.cc_Log("本地時間 = " + curTime_);
        // ShowLog.cc_Log("server時間 = " + ServerT);
        // ShowLog.cc_Log("時間差 = " + TimeMgr._dDiff);
    }

    //取得現在時間(時間戳ms)
    public static getCurTime(): number {
        let cutTime: number = Date.now() + TimeMgr._dDiff;
        // ShowLog.cc_Log("現在時間 = " + Date.now() + " " + TimeMgr._dDiff);
        return cutTime;
    }
    public static getUTCDate(timezone: number): Date {
        let curDate: Date = new Date();
        curDate.setTime(TimeMgr.getCurTime() + (timezone - 8) * 60 * 60 * 1000);
        return curDate;
    }

    //取得現在時間(Date)
    public static getCurDate(): Date {
        let curDate: Date = new Date();
        curDate.setTime(TimeMgr.getCurTime());
        return curDate;
    }
    public static DataFormat(date: Date, fmt: string): string {
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    public static WaitTime(Time: number) //單位是毫秒
    {
        //使用Promise做異步處理，setTimeout做延遲處理
        return new Promise(r => setTimeout(r, Time));
    }

    public static DateTimezone(offset: number, time: number) {
        let d = new Date(time);
        let utc = d.getTime() + (d.getTimezoneOffset() * 60000);

        // 新增不同時區的日期資料
        return new Date(utc + (3600000 * offset));
    }
}

// export class callBackFunc {
//     target: any = null; //this指向目標
//     cbFunc: Function = null; //回調
//     parameter: any[] = []; //CB Function使用的參數

//     /**
//      * 新增callback
//      * @param Targ callback function中的this
//      * @param Cbf callback function
//      * @param Param 參數
//      */
//     constructor(Targ?: any, Cbf?: Function, Param?: any[]) {
//         if (Targ) {
//             this.target = Targ;
//             this.cbFunc = Cbf;
//             // this.callBackF.bind(this,Param);
//             this.parameter = [];
//             this.parameter.push(...Param);
//             // ShowLog.cc_Log(this.callBackF);
//         }
//     }

//     /** 執行回調 */
//     public invokeCBFunc() {
//         if (this.cbFunc != null) {
//             this.cbFunc.call(this.target, ...this.parameter);
//         }
//     }

//     /** 更改參數 */
//     public resetParam(Param: any[]) {
//         this.parameter = [];
//         this.parameter.push(...Param);
//     }

//     public setNew(Targ: any, Cbf: Function, Param: any[]) {
//         this.target = Targ;
//         this.cbFunc = Cbf;
//         // this.callBackF.bind(this,Param);
//         this.parameter = [];
//         this.parameter.push(...Param);
//         // ShowLog.cc_Log(this.callBackF);
//     }
// }

export module MathExtend {
    /** 顯示小數後位數(尾數會補0) */
    export function roundDecimal(val: number, precision: number) {
        var f = +(Math.floor(+(val * Math.pow(10, precision)).toPrecision(12)) / Math.pow(10, precision)).toPrecision(12);
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
            s += '.';
        }
        for (var i = s.length - s.indexOf('.'); i <= precision; i++) {
            s += "0";
        }
        return s;
    }

    /** 顯示小數後位數(尾數會不補0) */
    export function round(val: number, precision: number) {
        var f = +(Math.floor(+(val * Math.pow(10, precision)).toPrecision(12)) / Math.pow(10, precision)).toPrecision(12);
        var s = f.toString();
        return s;
    }

    /** 千分位數字 */
    export function FormatNumber(n: number): string {
        let arr = n.toString().split(".");
        let re = /(\d{1,3})(?=(\d{3})+$)/g;
        return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
    }

    /** 小數加法 */
    export function Plus(A: number, ...B: number[]): number {
        let res = A;
        for (let i: number = 0; i < B.length; i++) res = A + B[i];
        return +res.toPrecision(12);
    }

    /** 小數減法 */
    export function Minus(A: number, ...B: number[]): number {
        let res = A;
        for (let i: number = 0; i < B.length; i++) res = A - B[i];
        return +res.toPrecision(12);
    }

    /** 小數乘法 */
    export function Times(A: number, ...B: number[]): number {
        let res = A;
        for (let i: number = 0; i < B.length; i++) res = A * B[i];
        return +res.toPrecision(12);
    }
}
