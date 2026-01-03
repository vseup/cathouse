<script lang="ts">
	import { onMount } from 'svelte';
	import { rand } from '$lib/helpers/number.helper';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import Kitty from '$lib/components/Kitty.svelte';
	import { CatState, CatType } from '$lib/constants/cat.sprites';
	import { Cat } from '$lib/models/cat';
	import Participate from '$lib/components/modals/participate/Participate.svelte';
	import Success from '$lib/components/modals/success/Success.svelte';
	import DonationsModal from '$lib/components/modals/donations/DonationsModal.svelte';
	import MoreModal from '$lib/components/modals/more/MoreModal.svelte';

	const NUM_CATS = 40;

	const SIDEBAR_WIDTH = 450;
	const BOTTOMBAR_HEIGHT = 220;

	const CAT_SIZE_DIVISOR = 16;
	const CAT_SIZE_MIN = 48;
	const CAT_SIZE_MAX = 80;

	$: catSize = Math.min(Math.max(worldWidth / CAT_SIZE_DIVISOR, CAT_SIZE_MIN), CAT_SIZE_MAX);

	let world: HTMLDivElement;
	let overlay: HTMLDivElement;
	let cats: Cat[] = [];
	let focusedCat: Cat | null = null;
	let animationFrameId: number;

	let worldWidth = 0;
	let worldHeight = 0;
	let windowWidth = 0;

	let showParticipate = false;
	let newCat: Cat | null = null;
	let showLearnMore = false;

	function createCat(id: number, worldWidth: number, worldHeight: number): Cat {
		const x = rand(0, worldWidth - catSize);
		const y = rand(0, worldHeight - catSize);

		const types = Object.values(CatType) as CatType[];
		const typeIndex = Math.floor(Math.random() * types.length);

		return new Cat(
			id,
			`Kitty-${id}`,
			x,
			y,
			rand(1, 100),
			types[typeIndex],
			id % 2 === 0 ? 'Max Mustermann' : undefined
		);
	}

	function updateCat(cat: Cat, deltaTime: number, worldWidth: number, worldHeight: number) {
		cat.stateTimer -= deltaTime;
		if (cat.stateTimer <= 0) {
			cat.updateState();
		}
		cat.respectBoundaries(worldWidth - catSize, worldHeight - catSize);
		cat.move(deltaTime);
	}

	function focusCat(cat: Cat) {
		cat.updateState(CatState.CUDDLE);
		focusedCat = cat;
		overlay.style.zIndex = `${worldHeight + 1}`;
	}

	function clearFocus() {
		focusedCat = null;
		overlay.style.zIndex = `-100`;
	}

	onMount(() => {
		windowWidth = window.innerWidth;
		worldWidth = world.clientWidth;
		worldHeight = world.clientHeight;

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
				updateCat(cat, deltaTime, worldWidth, worldHeight);
			}

			cats = [...cats];
			animationFrameId = requestAnimationFrame(loop);
		}

		animationFrameId = requestAnimationFrame(loop);

		const handleResize = () => {
			worldWidth = world.clientWidth;
			worldHeight = world.clientHeight;
			windowWidth = window.innerWidth;
		};
		window.addEventListener('resize', handleResize);

		return () => {
			running = false;
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div style={`--sidebar-width: ${SIDEBAR_WIDTH}px; --bottombar-height: ${BOTTOMBAR_HEIGHT}px;`}>
	{#if windowWidth > SIDEBAR_WIDTH * 2}
		<div class="world-wrapper row">
			<div class="world" bind:this={world}>
				{#each cats as cat (cat.id)}
					<Kitty
						{cat}
						size={catSize}
						focused={focusedCat?.id === cat.id}
						maxY={worldHeight}
						on:click={() => {
							cat === focusedCat ? clearFocus() : focusCat(cat);
						}}
					/>
				{/each}
				<div
					class="overlay"
					bind:this={overlay}
					on:click={() => {
						clearFocus();
					}}
				></div>
			</div>
			<Sidebar
				donation={cats.map((c) => c.donation).reduce((a, b) => a + b, 0)}
				cat={focusedCat}
				{cats}
				searchTerm={focusedCat ? focusedCat.name : ''}
				clear={() => clearFocus()}
				select={(term) => {
					const idx = cats.findIndex((el) =>
						el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
					);
					if (idx < 0) return;
					focusCat(cats[idx]);
				}}
				openParticipate={() => (showParticipate = true)}
				openLearnMore={() => (showLearnMore = true)}
			/>
		</div>
	{:else}
		<div class="bottombar"></div>
		<div class="world-wrapper col">
			<div class="world" bind:this={world}>
				{#each cats as cat (cat.id)}
					<Kitty
						{cat}
						size={catSize}
						focused={focusedCat?.id === cat.id}
						maxY={worldHeight}
						on:click={() => {
							cat === focusedCat ? clearFocus() : focusCat(cat);
						}}
					/>
				{/each}
				<div
					class="overlay"
					bind:this={overlay}
					on:click={() => {
						clearFocus();
					}}
				></div>
			</div>
			<div class="bottombar-pad"></div>
		</div>
	{/if}
	{#if showParticipate}
		<Participate
			zIndex={worldHeight + 50}
			close={() => (showParticipate = false)}
			onSaved={(c) => (newCat = c)}
		/>
	{/if}
	{#if newCat != null}
		<Success zIndex={worldHeight + 50} close={() => (newCat = null)} cat={newCat} />
	{/if}
	{#if showLearnMore}
		<MoreModal zIndex={worldHeight + 50} close={() => (showLearnMore = false)} />
	{/if}
</div>

<style>
	.world-wrapper {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		background: var(--color-bg);
	}
	.bottombar {
		height: var(--bottombar-height);
		width: 100%;
		background-color: var(--color-green);
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
		flex: 1 1 auto;
		position: relative;
	}
	.overlay {
		top: 0;
		left: 0;
		background: var(--color-bg);
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0.75;
		z-index: -100;
	}
</style>
