<script lang="ts">
	import Kitty from '$lib/components/Kitty.svelte';
	import type { Cat } from '$lib/models/cat';

	export let cats: Cat[] = [];
	export let catSize: number;
	export let worldHeight: number;
	export let focusedCatId: string | null = null;
	export let overlayZIndex = -100;
	export let onCatClick: (cat: Cat) => void;
	export let onOverlayClick: () => void;
</script>

<div class="cat-world">
	{#each cats as cat (cat.id)}
		<Kitty
			{cat}
			size={catSize}
			focused={focusedCatId === cat.id}
			maxY={worldHeight}
			on:click={() => onCatClick(cat)}
		/>
	{/each}
	<div class="overlay" style:z-index={overlayZIndex} on:click={onOverlayClick}></div>
</div>

<style>
	.cat-world {
		position: relative;
		width: 100%;
		height: 100%;
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
