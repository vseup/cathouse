<script lang="ts">
	import { toEur } from '$lib/helpers/number.helper';
	import type { Cat } from '$lib/models/cat';

	export let cat: Cat;

	$: createdDate = new Intl.DateTimeFormat('de-DE', {
		timeZone: 'Europe/Berlin',
		day: '2-digit',
		month: '2-digit',
		year: '2-digit'
	}).format(cat.createdAt);
</script>

<div class="cat-list-item">
	<img class="cat-img" src={cat.srcIdle} alt="Katze {cat.name}" />
	<div class="cat-details fs14">
		<p><b class="cat-name">{cat.name}</b></p>
		<p>Spendenbetrag: <b>{toEur(cat.donation)}</b></p>
		<p>Erstellt am: {createdDate}</p>
		<p class={cat.donor ? '' : 'opacity03'}>Unterstützer*in: {cat.donor ?? 'Anonym'}</p>
	</div>
</div>

<style>
	.cat-list-item {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 12px;
		box-sizing: border-box;
	}
	.cat-img {
		width: 56px;
		height: 56px;
		object-fit: contain;
		image-rendering: pixelated;
	}
	.cat-details {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	p {
		margin: 0;
	}
	.opacity03 {
		opacity: 0.3;
	}
</style>
