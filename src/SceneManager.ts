import { Container } from 'pixi.js';
import { Scene } from './Scene';
import { Config } from './Config';

export class SceneManager {
    container: Container;
    scene!: Scene;
    constructor() {
        this.container = new Container();
        this.container.interactive;
    }

    start(sceneName: keyof typeof Config.scenes){
        if (this.scene) {
            this.scene.remove();
        }

        this.scene = new Config.scenes[sceneName]();
    }
}
