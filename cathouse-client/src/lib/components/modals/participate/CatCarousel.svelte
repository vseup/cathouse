<script lang="ts">
	import IconButton from '$lib/components/controls/IconButton.svelte';
	import { Cat } from '$lib/models/cat';

	export let cats: Cat[];
	export let catIndex: number;

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

<div class="col">
	<b>Wähle eine Katze:</b>
	<div class="row" style="align-items: center">
		<IconButton icon="chevron_left" primary on:click={next} />
		<div style="flex: 1"></div>
		<img class="cat-img" src={cats[catIndex].srcIdle} alt="Cat Preview" />
		<div style="flex: 1"></div>
		<IconButton icon="chevron_right" primary on:click={prev} />
	</div>
</div>

<style>
	.cat-img {
		width: 100%;
		max-width: 150px;
		height: auto;
		image-rendering: pixelated;
	}
</style>
