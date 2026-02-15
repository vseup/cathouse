import { rand } from "$lib/helpers/number.helper";
import { getIdleImageByType, getLoveImageByType, getImageByTypeAndState } from "$lib/helpers/cat.helper";
import { CatState, CatType } from "$lib/constants/cat.sprites";

export class Cat {
    id: string;
    x: number = 0;
    y: number = 0;
    vx: number = 0;
    vy: number = 0;
    donation: number;
    state: CatState = CatState.WALK;
    stateTimer: number = 0;
    name: string;
    donor?: string;
    type: CatType;
    srcIdle: string;
    srcLove: string;
    src: string;


    public constructor(id: string, name: string, x: number, y: number, donation: number, type: CatType, donor?: string) {
        this.id = id;
        this.name = name;
        this.x = x;
        this.y = y;
        this.stateTimer = rand(8, 15);
        this.donation = donation;
        this.donor = donor;
        this.type = type;
        this.srcIdle = getIdleImageByType(this.type);
        this.srcLove = getLoveImageByType(this.type);
        this.src = getImageByTypeAndState(this.type, this.state);
        this.updateState();
    }

    public updateState(state?: null | CatState) {
        let vals = Object.values(CatState) as CatState[];
        vals = vals.slice(vals.length / 2);
        let index = Math.floor(Math.floor(Math.random() * vals.length));

        if (state != null) {
            index = vals.indexOf(state);
        } else {
            while (vals[index] === CatState.CUDDLE) {
                index = Math.floor(Math.floor(Math.random() * vals.length));
            }
        }

        this.state = vals[index];
        this.src = getImageByTypeAndState(this.type, this.state);
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
