import { Ticker } from 'pixi.js';
import { Scene } from './Scene';

export class StartScene extends Scene {
    constructor() {
        super();
        this.container.label = "StartScene";
    }

    override update(ticker: Ticker) {
    }
}
