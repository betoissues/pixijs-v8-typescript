import { Container, Ticker } from 'pixi.js';
import { Game2D } from './Game';

export class Scene {
    container: Container;

    constructor() {
        this.container = new Container();
        this.container.interactive = true;
        this.create();
        Game2D.app.ticker.add(this.update, this);
    }

    create() {}
    update(ticker: Ticker) {}
    destroy() {}

    remove() {
        Game2D.app.ticker.remove(this.update, this);
        this.destroy();
        this.container.destroy();
    }
}
