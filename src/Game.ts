import { Application, Assets, ApplicationOptions, Container, Sprite, Ticker } from 'pixi.js';
import { Player } from './actor';
import { MapGrid } from './MapGrid';
import { Config } from './config';
import { Direction } from './enums';

export class Game extends Application {
    grid!: MapGrid;
    mainPlayer!: Player;
    keys: {};

    constructor() {
        super()
        this.keys = {
            up: { pressed: false, timestamp: 0 },
            left: { pressed: false, timestamp: 0 },
            down: { pressed: false,  timestamp: 0 },
            right: { pressed: false,  timestamp: 0 },
            space: { pressed: false, timestamp: 0 },
        };
    }

    override async init(config?: Partial<ApplicationOptions>|undefined) {
        await super.init(config);
        window.addEventListener("resize", () => {
            this.resizeCanvas();
        });
        document.getElementById("game")!.appendChild(this.canvas);

        this.grid = new MapGrid();

        const ssheet = await Assets.load("./assets/sprite.json");
        this.mainPlayer = new Player(ssheet.textures.sprite4, {
            x: 8,
            y: 8,
        });

        this.grid.addChild(this.mainPlayer);
        this.addChild(this.grid);
    }

    addChild(child: Container|Sprite) {
        this.stage.addChild(child);
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
        // User ticker.deltaTime
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
            screenWidth / this.canvas.width,
            screenHeight / this.canvas.height,
        );

        let enlargedWidth;
        let enlargedHeight;

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
        this.canvas.style.width = `${enlargedWidth}px`;
        this.canvas.style.height = `${enlargedHeight}px`;
        this.canvas.style.marginLeft =
            this.canvas.style.marginRight = `${horizontalMargin}px`;
        this.canvas.style.marginTop =
            this.canvas.style.marginBottom = `${verticalMargin}px`;
    }
}
