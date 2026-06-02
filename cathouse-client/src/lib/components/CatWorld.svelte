<script lang="ts">
	import Kitty from '$lib/components/Kitty.svelte';
	import type { Cat } from '$lib/models/cat';

	export let cats: Cat[] = [];
	export let catSize: number;
	export let worldHeight: number;
	export let selectedCatId: string | null = null;
	export let overlayZIndex = -100;
	export let onCatClick: (cat: Cat) => void;
	export let onBackgroundClick: () => void;
</script>

<div class="cat-world">
	{#each cats as cat (cat.id)}
		<Kitty
			{cat}
			size={catSize}
			focused={selectedCatId === cat.id}
			maxY={worldHeight}
			on:click={() => onCatClick(cat)}
		/>
	{/each}
	<button
		type="button"
		class="overlay"
		aria-label="Auswahl aufheben"
		style:z-index={overlayZIndex}
		on:click={onBackgroundClick}
	></button>
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
		border: none;
		opacity: 0.75;
		z-index: -100;
		padding: 0;
		cursor: default;
		appearance: none;
	}
</style>
