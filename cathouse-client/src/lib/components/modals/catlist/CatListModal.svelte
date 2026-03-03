<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Modal from '../Modal.svelte';
	import type { Cat } from '$lib/models/cat';
	import CatListItem from './CatListItem.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Divider from '$lib/components/Divider.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
	export let cats: Cat[] = [];

	$: sortedCats = [...cats].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
</script>

<Modal title="Alle virtuellen Katzen" {zIndex} {close}>
	{#if cats.length === 0}
		<p>Es sind noch keine virtuellen Katzen vorhanden.</p>
	{:else}
		<p>Vielen Dank an alle Teilnehmenden!</p>
		<Spacer height={16} />
		<div class="cat-list">
			{#each sortedCats as cat, index (cat.id)}
				<div class="col">
					<CatListItem {cat} />
					{#if index < sortedCats.length - 1}
						<Divider color="var(--color-grey-darken-1)" spacer={8} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
	<Spacer height={16} />
	<Button widthCss={'100%'} primary on:click={close}>Schließen</Button>
</Modal>

<style>
	.cat-list {
		display: flex;
		flex-direction: column;
	}
</style>
