import { Container, Sprite } from 'pixi.js';
import { Config } from './config';
import { PosXY } from './types';
import { Direction } from './enums';

export class Actor extends Container {
    sprite: Sprite;
    tileX: number;
    tileY: number;
    direction: Direction;
    constructor(spriteFile: string, position: PosXY) {
        super();
        this.sprite = Sprite.from(spriteFile);
        this.x = position.x * Config.MOVE_STEP;
        this.y = position.y * Config.MOVE_STEP;
        this.setSize(Config.TILE_SIZE);

        this.addChild(this.sprite);
        this.tileX = position.x;
        this.tileY = position.y;
        this.direction = Direction.DOWN;
    }
}

export class Player extends Actor {
    constructor(spriteFile: string, position: PosXY) {
        super(spriteFile, position);
        this.interactive = true;
    }

    move(direction: Direction, speed: PosXY) {
        this.x += speed.x * Config.MOVE_STEP;
        this.y += speed.y * Config.MOVE_STEP;
        this.tileX += speed.x;
        this.tileY += speed.y;
        this.direction = direction;
    }
}
