/*<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import catGif from '$lib/assets/sprites/cat01_brown_gifs/cat01_walk_8fps.gif'; // animated cat gif
    import Cat from '$lib/components/cati.svelte';

    const NUM_CATS = 40;
    const CAT_WIDTH = 76; // CSS size of gif
    const CAT_HEIGHT = 68;

    let container: HTMLDivElement;
    let cats: Cat[] = [];
    let animationFrameId: number;

    function createCat(id: number, worldWidth: number, worldHeight: number): Cat {
        const x = rand(0, worldWidth - CAT_WIDTH);
        const y = rand(0, worldHeight - CAT_HEIGHT);

        return new Cat(id, x, y);
    }

    function updateCat(cat: Cat, deltaTime: number, worldWidth: number, worldHeight: number) {
        cat.stateTimer -= deltaTime;
        if (cat.stateTimer <= 0) {
            cat.state = choice(['walk', 'sleep', 'play', 'eat']);
            const minT = cat.state === 'sleep' ? 4 : 2;
            const maxT = cat.state === 'sleep' ? 10 : 6;
            cat.stateTimer = rand(minT, maxT);

            if (cat.state !== 'sleep') {
                const speed = rand(25, 70);
                const dir = Math.random() * Math.PI * 2;
                cat.vx = Math.cos(dir) * speed;
                cat.vy = Math.sin(dir) * speed;
            }
        }

        if (cat.state === 'walk') {
            cat.x += cat.vx * dt;
            cat.y += cat.vy * dt;
        } else if (cat.state === 'play') {
            // zig-zag a bit
            const angleChange = rand(-1, 1) * dt;
            const speed = Math.hypot(cat.vx, cat.vy) || 40;
            const angle = Math.atan2(cat.vy, cat.vx) + angleChange;
            cat.vx = Math.cos(angle) * speed;
            cat.vy = Math.sin(angle) * speed;
            cat.x += cat.vx * dt;
            cat.y += cat.vy * dt;
        } else if (cat.state === 'eat') {
            cat.x += cat.vx * dt * 0.3;
            cat.y += cat.vy * dt * 0.3;
        }
        // sleep = no movement

        // borders: keep gif fully inside container
        if (cat.x < 0) {
            cat.x = 0;
            cat.vx = Math.abs(cat.vx);
        } else if (cat.x + CAT_WIDTH > worldWidth) {
            cat.x = worldWidth - CAT_WIDTH;
            cat.vx = -Math.abs(cat.vx);
        }

        if (cat.y < 0) {
            cat.y = 0;
            cat.vy = Math.abs(cat.vy);
        } else if (cat.y + CAT_HEIGHT > worldHeight) {
            cat.y = worldHeight - CAT_HEIGHT;
            cat.vy = -Math.abs(cat.vy);
        }
    }

    onMount(() => {
        let worldWidth = container.clientWidth;
        let worldHeight = container.clientHeight;

        cats = Array.from({ length: NUM_CATS }, (_, i) => createCat(i, worldWidth, worldHeight));

        let last = performance.now();
        let running = true;

        function loop(currentTime: number) {
            if (!running) return;
            const deltaTime = (currentTime - last) / 1000;
            last = currentTime;

            worldWidth = container.clientWidth;
            worldHeight = container.clientHeight;

            for (const cat of cats) {
                updateCat(cat, deltaTime, worldWidth, worldHeight);
            }

            // apply CSS transforms to move the GIFs
            for (const cat of cats) {
                if (!cat.el) continue;
                const flip = cat.vx < 0 ? -1 : 1;
                cat.el.style.transform = `translate(${cat.x}px, ${cat.y}px) scaleX(${flip})`;
                cat.el.style.zIndex = `${Math.round(cat.y)}`;
            }

            animationFrameId = requestAnimationFrame(loop);
        }

        animationFrameId = requestAnimationFrame(loop);

        const handleResize = () => {
            worldWidth = container.clientWidth;
            worldHeight = container.clientHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            running = false;
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    });

    onDestroy(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
</script>

<div class="world" bind:this={container}>
    {#each cats as cat (cat.id)}
        <img class="cat" src={catGif} alt="Cat" bind:this={cat.el} />
    {/each}
</div>

<style>
    .world {
        position: fixed;
        inset: 0;
        background: #222;
    }
    .cat {
        position: absolute;
        top: 0;
        left: 0;
        width: 76px;
        height: 68px;
        image-rendering: pixelated;
        transform-origin: center center;
    }
    .cat:hover {
        background-color: red;
        cursor: pointer !important;
    }
</style>
*/

//https://tierheim-starnberg.de/wp-json/wp/v2/pages/20786 display-counter\" data-value=\"16\"