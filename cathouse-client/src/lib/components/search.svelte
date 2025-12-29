<script lang="ts">
	export let searchTerm: string;
	export let placeholder: string = 'Search';
</script>

<div id="search-wrapper">
	<input
		type="text"
		id="search-input"
		{placeholder}
		autocomplete="off"
		bind:value={searchTerm}
		on:input
	/>
</div>

<style>
	#search-wrapper {
		display: flex;
		align-items: center;
		width: 100%;
	}

	#search-input {
		width: 100%;
		border-radius: 5px;
		padding: 8px;
		border: none;
		font-size: 18px;
	}
	#search-input::placeholder {
		color: #222;
		opacity: 0.4;
	}
</style>
