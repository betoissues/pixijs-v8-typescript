import { Actor } from './Actor';
import { Config } from './Config';
import { PosXY } from './types';
import { Direction } from './enums';

export class Player extends Actor {
    constructor(spriteFile: string, position: PosXY) {
        super(spriteFile, position);
        this.interactive = true;
    }

    move(direction: Direction, speed: PosXY) {
        this.x += speed.x * Config.MOVE_STEP;
        this.y += speed.y * Config.MOVE_STEP;
        this.tilePos.x += speed.x;
        this.tilePos.y += speed.y;
        this.direction = direction;
    }
}
