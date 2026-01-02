<script lang="ts">
	import Icon from './Icon.svelte';

	export let searchTerm: string;
	export let terms: string[] = [];
	export let placeholder: string = 'Search';
	export let clear: () => void;
	export let select: (term: string) => void;

	$: entered = true;
	$: empty = searchTerm.length === 0;
	$: filteredTerms = terms.filter((el) =>
		el.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
	);
</script>

<div id="search-wrapper">
	<input
		type="text"
		id="search-input"
		{placeholder}
		autocomplete="off"
		bind:value={searchTerm}
		on:input={() => {
			entered = searchTerm.length === 1;
		}}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				entered = true;
				select(searchTerm);
			}
		}}
	/>

	<Icon
		icon="close"
		hidden={searchTerm.length === 0}
		on:click={() => {
			searchTerm = '';
			entered = true;
			clear();
		}}
	/>
	{#if !entered && !empty}
		<div class="preview-wrapper">
			{#each filteredTerms as term}
				<button
					class="preview-value"
					on:click={() => {
						searchTerm = term;
						entered = true;
						select(searchTerm);
					}}>{term}</button
				>
			{/each}
		</div>
	{/if}
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
		box-sizing: border-box;
		position: relative;
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
	.preview-wrapper {
		border-radius: 5px;
		background-color: #fff;
		position: absolute;
		width: 100%;
		top: 44px;
		display: flex;
		flex-direction: column;
		max-height: 160px;
		overflow-y: scroll;
		padding: 8px 0px;
		box-sizing: border-box;
		z-index: 1;
	}
	.preview-value {
		padding: 8px;
		font-size: 14px;
		box-sizing: border-box;
		background: none;
		border: none;
		text-align: left;
	}
	.preview-value:hover {
		background: #e1e1e1;
		cursor: pointer;
	}
	.preview-value:focus,
	.preview-value:focus-visible {
		background: #e1e1e1;
	}
</style>
