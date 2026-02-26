<script lang="ts">
	import Spacer from './Spacer.svelte';

	export let color = '#d6d6d6';
	export let spacer = 24;
</script>

<div class="col" style="width: 100%;">
	<Spacer height={spacer} />
	<div class="divider" style:background-color={color}></div>
	<Spacer height={spacer} />
</div>

<style>
	.divider {
		min-height: 1px;
		height: 1px;
		width: 100%;
	}
</style>
