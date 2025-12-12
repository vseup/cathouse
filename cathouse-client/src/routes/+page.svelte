<script lang="ts">
	import { onMount } from 'svelte';
	import catGif from '$lib/assets/sprites/cat01_brown_gifs/cat01_walk_8fps.gif'; // animated cat gif
	import { rand } from '$lib/helpers/number.helper';
	import { Cat } from '$lib/models/cat';

	const NUM_CATS = 40;
	const CAT_WIDTH = 76;
	const CAT_HEIGHT = 68;

	let world: HTMLDivElement;
	let cats: Cat[] = [];
	let animationFrameId: number;

	function createCat(id: number, worldWidth: number, worldHeight: number): Cat {
		const x = rand(0, worldWidth - CAT_WIDTH);
		const y = rand(0, worldHeight - CAT_HEIGHT);

		return new Cat(id, `Kitty-${id}`, x, y);
	}

	function updateCat(cat: Cat, deltaTime: number, worldWidth: number, worldHeight: number) {
		cat.stateTimer -= deltaTime;
		if (cat.stateTimer <= 0) {
			cat.updateState();
		}
		cat.respectBoundaries(worldWidth - CAT_WIDTH, worldHeight - CAT_HEIGHT);
		cat.move(deltaTime);

		if (!cat.el) return;
		const flip = cat.vx < 0 ? -1 : 1;
		cat.el.style.transform = `translate(${cat.x}px, ${cat.y}px) scaleX(${flip})`;
		cat.el.style.zIndex = `${Math.round(cat.y)}`;
	}

	onMount(() => {
		let worldWidth = world.clientWidth;
		let worldHeight = world.clientHeight;

		cats = Array.from({ length: NUM_CATS }, (_, i) => createCat(i, worldWidth, worldHeight));

		let last = performance.now();
		let running = true;

		function loop(currentTime: number) {
			if (!running) return;
			const deltaTime = (currentTime - last) / 1000; // in seconds
			last = currentTime;

			worldWidth = world.clientWidth;
			worldHeight = world.clientHeight;

			for (const cat of cats) {
				if (!cat.el) continue;
				updateCat(cat, deltaTime, worldWidth, worldHeight);
			}
			animationFrameId = requestAnimationFrame(loop);
		}

		animationFrameId = requestAnimationFrame(loop);

		const handleResize = () => {
			worldWidth = world.clientWidth;
			worldHeight = world.clientHeight;
		};
		window.addEventListener('resize', handleResize);

		return () => {
			running = false;
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="world" bind:this={world}>
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
		cursor: pointer !important;
	}
</style>
