import { rand } from "$lib/helpers/number.helper";

export enum CatState {
    WALK,
    SLEEP,
    EAT
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
    el?: HTMLImageElement;

    public constructor(id: number, name: string, x: number, y: number) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.stateTimer = rand(2, 6);
        this.updateSpeedAndDirection();
    }

    public updateState() {
        let vals = Object.values(CatState) as CatState[];
        vals = vals.slice(vals.length / 2);
        this.state = vals[0];
        this.stateTimer = rand(5, 10);
        this.updateSpeedAndDirection();
        //return CatState[Math.floor(Math.random() * vals.length)];
    }

    public move(deltaTime: number) {
        if (this.state === CatState.WALK) {
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
        const speed = rand(25, 50);
        const dir = Math.random() * Math.PI * 2;
        this.vx = Math.cos(dir) * speed;
        this.vy = Math.sin(dir) * speed;
    }
}