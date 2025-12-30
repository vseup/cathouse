<script lang="ts">
	import { toEur } from '$lib/helpers/number.helper';
	import type { Cat } from '$lib/models/cat';
	export let cat: Cat;
	export let size: number;
	export let focused: boolean;
	export let maxY: number;

	let hovered: boolean = false;

	$: flip = cat.vx < 0 ? -1 : 1;
	$: wrapperStyle =
		`width: ${size}px;` +
		`height: ${size}px;` +
		`transform: translate(${cat.x}px, ${cat.y}px);` +
		`z-index: ${focused ? maxY + 10 : Math.round(cat.y)};`;
</script>

<div class="cat-wrapper" style={wrapperStyle}>
	{#if focused}
		<div class="focus-bg-wrapper"><div class="focus-bg" style:z-index={1}></div></div>
	{/if}
	<img class="cat-img" src={cat.src} alt="Cat" style:z-index={2} style:transform="scaleX({flip})" />
	{#if hovered || focused}
		<div class="name">{cat.name} ({toEur(cat.donation)})</div>
	{/if}
	<button
		class="cat-btn"
		aria-label="focus cat"
		tabindex="-1"
		style:z-index={4}
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
		on:click
	></button>
</div>

<style>
	.focus-bg-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.focus-bg {
		position: absolute;
		top: 75%;
		left: -25%;
		background: radial-gradient(black 0%, transparent 50%);
		width: 150%;
		height: 50%;
	}
	.cat-wrapper {
		position: absolute;
		top: 0;
		left: 0;
	}
	.cat-img {
		position: absolute;
		top: 0;
		left: 0;
		image-rendering: pixelated;
		transform-origin: center center;
		width: 100%;
		height: auto;
	}
	.cat-btn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		cursor: pointer;
		background: none;
		border: none;
	}
	.name {
		position: absolute;
		top: -10px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 14px;
		color: #fff;
		padding: 4px;
		border-radius: 4px;
		background-color: black;
		text-align: center;
		text-wrap: nowrap;
		transform-origin: center center;
	}
</style>
