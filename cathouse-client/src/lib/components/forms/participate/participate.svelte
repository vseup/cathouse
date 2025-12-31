<script lang="ts">
	import IconButton from '$lib/components/iconButton.svelte';
	import Spacer from '$lib/components/spacer.svelte';
	import { CatType } from '$lib/constants/cat_sprites';
	import { Cat } from '$lib/models/cat';
	import Form from '../form.svelte';

	export let zIndex: number = 1;
	export let close: () => void;

	const types = Object.values(CatType) as CatType[];
	const cats: Cat[] = types.map((t) => new Cat(-1, '', -1, -1, -1, t));
	let catIndex = 0;

	function next() {
		if (catIndex === cats.length - 1) {
			catIndex = 0;
		} else {
			catIndex++;
		}
	}
	function prev() {
		if (catIndex === 0) {
			catIndex = cats.length - 1;
		} else {
			catIndex--;
		}
	}
</script>

<Form title="Unterstütze das Tierheim Starnberg beim Bau des neuen Katzenhauses!" {zIndex} {close}>
	<p>
		Schenke einer virtuellen Katze ein Zuhause auf dieser Webseite, gib ihr einen Namen und nutze
		den Anlass für eine Spende an das Tierheim Starnberg.
	</p>
	<Spacer height={24} />
	<b>Wähle eine Katze:</b>
	<div class="row" style="align-items: center">
		<IconButton icon="chevron_left" primary on:click={next} />
		<div style="flex: 1"></div>
		<img class="cat-img" src={cats[catIndex].srcIdle} alt="Cat Preview" />
		<div style="flex: 1"></div>
		<IconButton icon="chevron_right" primary on:click={prev} />
	</div>
	<Spacer height={24} />
</Form>

<style>
	.cat-img {
		width: 100%;
		max-width: 200px;
		height: auto;
		image-rendering: pixelated;
	}
</style>
