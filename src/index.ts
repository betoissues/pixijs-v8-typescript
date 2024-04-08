import { Config } from './Config';
import { Game2D } from './Game';

declare global {
    var __PIXI_APP__: typeof Game2D.app;
}

(async () => {
    globalThis.__PIXI_APP__  = Game2D.app;
    await Game2D.init({
        background: "#032d79",
        height: Config.TILE_SIZE * Config.TILE_Y,
        width: Config.TILE_SIZE * Config.TILE_X,
        resolution: window.devicePixelRatio,
        antialias: true,
    });
})();
