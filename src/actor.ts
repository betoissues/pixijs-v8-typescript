import { Container, Sprite } from 'pixi.js';
import { Config } from './Config';
import { PosXY } from './types';
import { Direction } from './enums';

export class Actor extends Container {
    sprite: Sprite;
    tilePos: PosXY;
    direction: Direction;
    constructor(spriteFile: string, position: PosXY) {
        super();
        this.sprite = Sprite.from(spriteFile);
        this.x = position.x * Config.MOVE_STEP;
        this.y = position.y * Config.MOVE_STEP;
        this.setSize(Config.TILE_SIZE);

        this.addChild(this.sprite);
        this.tilePos = position;
        this.direction = Direction.DOWN;
    }
}

export class Player {
    actor: Actor;
    constructor(spriteFile: string, position: PosXY) {
        this.actor = new Actor(spriteFile, position);
        this.actor.interactive = true;
    }

    move(direction: Direction, speed: PosXY) {
        this.actor.x += speed.x * Config.MOVE_STEP;
        this.actor.y += speed.y * Config.MOVE_STEP;
        this.actor.tilePos.x += speed.x;
        this.actor.tilePos.y += speed.y;
        this.actor.direction = direction;
    }
}
