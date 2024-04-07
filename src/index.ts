import { Config } from "./config";
import { Game } from "./Game";

declare global {
    var __PIXI_APP__: Game;
}

(async () => {
    const Game2D: Game = new Game();
    globalThis.__PIXI_APP__  = Game2D;
    await Game2D.init({
        background: "#032d79",
        height: Config.TILE_SIZE * Config.TILE_Y,
        width: Config.TILE_SIZE * Config.TILE_X,
        resolution: window.devicePixelRatio,
        antialias: true,
    });
    await setup();

    async function setup() {
        Game2D.ticker.add((ticker) => {
            Game2D.gameLoop(ticker)
        });
        Game2D.resizeCanvas();
        window.addEventListener('keydown', (e) => {
            Game2D.keyDownHandler(e.code);
        });
    }

    function end() {
    }
})();
