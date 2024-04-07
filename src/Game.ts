import { Application, Assets, ApplicationOptions, Container, Sprite, Ticker } from 'pixi.js';
import { Player } from './Player';
import { Config } from './Config';
import { Direction } from './enums';
import { SceneManager } from './SceneManager';

class Game {
    app: Application;
    mainPlayer!: Player;
    keys: {};
    scenes: SceneManager;

    constructor() {
        this.app = new Application();
        this.scenes = new SceneManager();
        this.keys = {
            up: { pressed: false, timestamp: 0 },
            left: { pressed: false, timestamp: 0 },
            down: { pressed: false,  timestamp: 0 },
            right: { pressed: false,  timestamp: 0 },
            space: { pressed: false, timestamp: 0 },
        };
    }

    async init(initConfig?: Partial<ApplicationOptions>|undefined) {
        await this.app.init(initConfig);
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });
        document.getElementById("game")!.appendChild(this.app.canvas);

        this.scenes.start("StartScene");

        const ssheet = await Assets.load("./assets/sprite.json");
        this.mainPlayer = new Player(ssheet.textures.sprite4, {
            x: 8,
            y: 8,
        });

        this.scenes.container.addChild(this.mainPlayer);
        this.app.stage.addChild(this.scenes.container);

        this.resizeCanvas();
        window.addEventListener('keydown', (e) => {
            this.keyDownHandler(e.code);
        });
    }

    addChild(child: Container) {
        this.app.stage.addChild(child);
    }

    keyDownHandler(key: string) {
        switch (key) {
            case "ArrowUp":
            case "KeyW":
                this.mainPlayer.move(Direction.UP, { x: 0, y: -1 });
                break;
            case "ArrowDown":
            case "KeyS":
                this.mainPlayer.move(Direction.DOWN, { x: 0, y: 1 });
                break;
            case "ArrowLeft":
            case "KeyA":
                this.mainPlayer.move(Direction.LEFT, { x: -1, y: 0 });
                break;
            case "ArrowRight":
            case "KeyD":
                this.mainPlayer.move(Direction.DOWN, { x: 1, y: 0 });
                break;
        }
    }

    gameLoop(ticker: Ticker) {
        // Use ticker.deltaTime to normalize loop
    }

    resizeCanvas() {
        // screen size
        const screenWidth = Math.max(
            document.documentElement.clientWidth,
            window.innerWidth || 0,
        );
        const screenHeight = Math.max(
            document.documentElement.clientHeight,
            window.innerHeight || 0,
        );

        // scale factor
        const scale = Math.min(
            screenWidth / this.app.canvas.width,
            screenHeight / this.app.canvas.height,
        );

        let enlargedWidth: number;
        let enlargedHeight: number;

        if (scale >= 1) {
            enlargedWidth = Math.floor(Config.TILE_SIZE * Config.TILE_X);
            enlargedHeight = Math.floor(Config.TILE_SIZE * Config.TILE_Y);
        } else {
            enlargedWidth = Math.floor(scale * Config.TILE_SIZE * Config.TILE_X);
            enlargedHeight = Math.floor(scale * Config.TILE_SIZE * Config.TILE_Y);
        }

        // margins for centering
        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        // reset css properties
        this.app.canvas.style.width = `${enlargedWidth}px`;
        this.app.canvas.style.height = `${enlargedHeight}px`;
        this.app.canvas.style.marginLeft =
            this.app.canvas.style.marginRight = `${horizontalMargin}px`;
        this.app.canvas.style.marginTop =
            this.app.canvas.style.marginBottom = `${verticalMargin}px`;
    }
}

// Singleton Game
export const Game2D = new Game();
