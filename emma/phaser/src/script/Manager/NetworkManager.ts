import Phaser from 'phaser'

export default class NetworkManager{
    constructor(scene){
        NetworkManager.ins = this;
    }

    static ins: NetworkManager;
    public static Language: string = "TC";

} 