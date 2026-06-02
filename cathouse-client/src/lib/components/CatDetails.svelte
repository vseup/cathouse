<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import type { Cat } from '$lib/models/cat';
	import { toEur } from '$lib/helpers/number.helper';

	export let cat: Cat;
</script>

<div class="cat-details">
	<span class="cat-name">{cat.name}</span>
	<img
		class="cat-img"
		src={cat.srcIdle}
		alt="Cat named {cat.name}"
		style:transform="scaleX({cat.vx < 0 ? -1 : 1})"
	/>
	<Spacer height={24} />
	<p class="cat-descr">Spendenbetrag: <b>{toEur(cat.donation)}</b></p>
	<p class="cat-descr">Unterstützer*in: {cat.donor ?? 'Anonym'}</p>
</div>

<style>
	.cat-details {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
		padding: 24px;
		background-color: var(--color-green-darken-1);
		border-radius: 16px;
		box-sizing: border-box;
		color: var(--color-text-light);
	}
	.cat-name {
		font-weight: 800;
		font-size: 24px;
	}
	.cat-img {
		width: 35%;
		height: auto;
		image-rendering: pixelated;
	}
	.cat-descr {
		font-size: 14px;
	}
</style>
