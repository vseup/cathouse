<script lang="ts">
	import Icon from './icon.svelte';

	export let searchTerm: string;
	export let placeholder: string = 'Search';
	export let clear: () => void;
</script>

<div id="search-wrapper">
	<input type="text" id="search-input" {placeholder} autocomplete="off" bind:value={searchTerm} />

	<Icon
		icon="close"
		hidden={searchTerm.length === 0}
		on:click={() => {
			searchTerm = '';
			clear();
		}}
	/>
</div>

<style>
	#search-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: #fff;
		border-radius: 5px;
		padding: 8px;
	}
	#search-input {
		width: 100%;
		border: none;
		font-size: 18px;
	}
	#search-input::placeholder {
		color: #222;
		opacity: 0.4;
	}
	#search-input:focus,
	#search-input:focus-visible {
		border: none;
		outline: none;
		box-shadow: none;
	}
</style>
