<script lang="ts">
	import Spacer from './Spacer.svelte';

	export let color = '#d6d6d6';
</script>

<div class="col" style="width: 100%;">
	<Spacer height={24} />
	<div class="divider" style:background-color={color}></div>
	<Spacer height={24} />
</div>

<style>
	.divider {
		min-height: 1px;
		height: 1px;
		width: 100%;
	}
</style>
