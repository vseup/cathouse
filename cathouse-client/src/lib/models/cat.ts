import { rand } from "$lib/helpers/number.helper";
import cat01GifWalk from '$lib/assets/sprites/cat01_brown_gifs/cat01_walk_8fps.gif';
import cat01GifSleep from '$lib/assets/sprites/cat01_brown_gifs/cat01_sleep_8fps.gif';
import cat01GifSit from '$lib/assets/sprites/cat01_brown_gifs/cat01_sit_8fps.gif';
import cat01GifLie from '$lib/assets/sprites/cat01_brown_gifs/cat01_liedown_8fps.gif';
import cat01GifRun from '$lib/assets/sprites/cat01_brown_gifs/cat01_run_12fps.gif';
import cat01GifClean from '$lib/assets/sprites/cat01_brown_gifs/cat01_clean_8fps.gif';
import cat01GifCuddle from '$lib/assets/sprites/cat01_brown_gifs/cat01_cuddle_8fps.gif';
import cat01GifBaking from '$lib/assets/sprites/cat01_brown_gifs/cat01_baking_8fps.gif';

export enum CatState {
    WALK,
    SLEEP,
    SIT,
    LIE,
    RUN,
    CLEAN,
    BAKING,
    CUDDLE
}

export class Cat {
    id: number;
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    state: CatState = CatState.WALK;
    stateTimer: number = 0;
    name: string;
    src: string = cat01GifWalk;
    el?: HTMLImageElement;


    public constructor(id: number, name: string, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.stateTimer = rand(8, 15);
        this.updateSpeedAndDirection();
    }

    public updateState(state?: null | CatState) {
        let vals = Object.values(CatState) as CatState[];
        vals = vals.slice(vals.length / 2);
        const images = [cat01GifWalk, cat01GifSleep, cat01GifSit, cat01GifLie, cat01GifRun, cat01GifClean, cat01GifBaking, cat01GifCuddle];
        let index = Math.floor(Math.floor(Math.random() * vals.length));

        if (state != null) {
            index = vals.indexOf(state);
        } else {
            while (vals[index] === CatState.CUDDLE) {
                index = Math.floor(Math.floor(Math.random() * vals.length));
            }
        }

        this.state = vals[index];
        this.src = images[index];
        this.stateTimer = this.state === CatState.CUDDLE ? 2 : rand(8, 15);
        this.updateSpeedAndDirection();
    }

    public move(deltaTime: number) {
        if (this.state === CatState.WALK || this.state === CatState.RUN) {
            this.x += this.vx * deltaTime;
            this.y += this.vy * deltaTime;
        }
    }

    public respectBoundaries(maxX: number, maxY: number) {
        const speed = rand(10, 40);
        let changeNeeded = false;

        let angle = Math.random() * Math.PI * 2;
        let dx = Math.cos(angle);
        let dy = Math.sin(angle);

        if (this.x < 0) {
            // right
            this.x = 0;
            dx = Math.abs(dx);
            changeNeeded = true;
        } else if (this.x > maxX) {
            // left
            this.x = maxX;
            dx = -Math.abs(dx);
            changeNeeded = true;
        }

        if (this.y < 0) {
            // down
            this.y = 0;
            dy = Math.abs(dy);
            changeNeeded = true;
        } else if (this.y > maxY) {
            // up
            this.y = maxY;
            dy = -Math.abs(dy);
            changeNeeded = true;
        }

        if (changeNeeded) {
            // normalize 
            const len = Math.hypot(dx, dy) || 1;
            dx /= len;
            dy /= len;
            this.vx = dx * speed;
            this.vy = dy * speed;
        }
    }

    private updateSpeedAndDirection() {
        let speed = rand(25, 40);
        if (this.state === CatState.RUN) {
            speed = rand(80, 100);
        }
        const dir = Math.random() * Math.PI * 2;
        this.vx = Math.cos(dir) * speed;
        this.vy = Math.sin(dir) * speed;
    }
}