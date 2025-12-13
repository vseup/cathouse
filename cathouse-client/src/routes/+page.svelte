<script lang="ts">
	import { onMount } from 'svelte';
	import catGif from '$lib/assets/sprites/cat01_brown_gifs/cat01_walk_8fps.gif'; // animated cat gif
	import { rand } from '$lib/helpers/number.helper';
	import { Cat } from '$lib/models/cat';

	const NUM_CATS = 40;

	const CAT_WIDTH = 19 * 2.5;
	const CAT_HEIGHT = 17 * 2.5;

	const SIDEBAR_WIDTH = 450;
	const BOTTOMBAR_HEIGHT = 220;

	let catWidth = CAT_WIDTH;
	let catHeight = CAT_HEIGHT;

	let world: HTMLDivElement;
	let cats: Cat[] = [];
	let animationFrameId: number;

	let worldWidth = 0;
	let worldHeight = 0;
	let windowWidth = 0;

	function createCat(id: number, worldWidth: number, worldHeight: number): Cat {
		const x = rand(0, worldWidth - catWidth);
		const y = rand(0, worldHeight - catHeight);

		return new Cat(id, `Kitty-${id}`, x, y);
	}

	function updateCat(cat: Cat, deltaTime: number, worldWidth: number, worldHeight: number) {
		cat.stateTimer -= deltaTime;
		if (cat.stateTimer <= 0) {
			cat.updateState();
		}
		cat.respectBoundaries(worldWidth - catWidth, worldHeight - catHeight);
		cat.move(deltaTime);

		if (!cat.el) return;
		const flip = cat.vx < 0 ? -1 : 1;
		cat.el.style.transform = `translate(${cat.x}px, ${cat.y}px) scaleX(${flip})`;
		cat.el.style.zIndex = `${Math.round(cat.y)}`;
	}

	function updateCatSize() {
		catWidth = Math.min(CAT_WIDTH, worldWidth * 0.1);
		catHeight = catWidth * (CAT_WIDTH / CAT_HEIGHT);
	}

	onMount(() => {
		windowWidth = window.innerWidth;
		worldWidth = world.clientWidth;
		worldHeight = world.clientHeight;
		updateCatSize();

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
			windowWidth = window.innerWidth;
			updateCatSize();
		};
		window.addEventListener('resize', handleResize);

		return () => {
			running = false;
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div
	style={`--cat-width: ${catWidth}px; --cat-height: ${catHeight}px; --sidebar-width: ${SIDEBAR_WIDTH}px; --bottombar-height: ${BOTTOMBAR_HEIGHT}px`}
>
	{#if windowWidth > SIDEBAR_WIDTH * 2}
		<div class="world-wrapper row">
			<div class="world" bind:this={world}>
				{#each cats as cat (cat.id)}
					<img class="cat" src={catGif} alt="Cat" bind:this={cat.el} />
				{/each}
			</div>
			<div class="sidebar"></div>
		</div>
	{:else}
		<div class="bottombar"></div>
		<div class="world-wrapper col">
			<div class="world" bind:this={world}>
				{#each cats as cat (cat.id)}
					<img class="cat" src={catGif} alt="Cat" bind:this={cat.el} />
				{/each}
			</div>
			<div class="bottombar-pad"></div>
		</div>
	{/if}
</div>

<style>
	.world-wrapper {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
	}
	.row {
		display: flex;
		flex-direction: row;
	}
	.col {
		display: flex;
		flex-direction: column;
	}
	.sidebar {
		width: var(--sidebar-width);
		height: 100%;
		background-color: #17823e;
		display: flex;
		flex-direction: column;
	}
	.bottombar {
		height: var(--bottombar-height);
		width: 100%;
		background-color: #17823e;
		position: fixed;
		bottom: 0px;
		border-top-right-radius: 24px;
		border-top-left-radius: 24px;
	}
	.bottombar-pad {
		height: var(--bottombar-height);
		width: 100%;
	}
	.world {
		/*background: #222;*/
		flex: 1 1 auto;
		position: relative;
	}
	.cat {
		position: absolute;
		top: 0;
		left: 0;
		width: var(--cat-width);
		height: var(--cat-height);
		image-rendering: pixelated;
		transform-origin: center center;
	}
	.cat:hover {
		cursor: pointer !important;
	}
</style>
