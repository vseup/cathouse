<script lang="ts">
	import Icon from '../controls/Icon.svelte';

	export let searchTerm: string;
	export let terms: string[] = [];
	export let placeholder: string = 'Search';
	export let showSearchIconWhenEmpty: boolean = false;
	export let clear: () => void;
	export let select: (term: string) => boolean;

	$: entered = true;
	$: empty = searchTerm.length === 0;
	$: icon = showSearchIconWhenEmpty && empty ? 'search' : 'close';
	$: hideIcon = !showSearchIconWhenEmpty && empty;
	$: filteredTerms = terms.filter((el) =>
		el.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
	);
	$: if (empty) {
		noMatch = false;
	}

	let noMatch = false;

	function search() {
		const term = searchTerm.trim();
		if (term.length === 0) {
			noMatch = false;
			clear();
			return;
		}

		entered = true;
		noMatch = !select(term);
	}
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
			noMatch = false;
		}}
		on:keydown={(e) => {
			if (e.key === 'Enter') {
				search();
			}
		}}
	/>

	<Icon
		{icon}
		hidden={hideIcon}
		on:click={() => {
			if (icon === 'search') {
				search();
				return;
			}

			searchTerm = '';
			entered = true;
			noMatch = false;
			clear();
		}}
	/>
	{#if !entered && !empty}
		<div class="preview-wrapper">
			{#if filteredTerms.length === 0}
				<div class="preview-empty">Keine Treffer</div>
			{:else}
				{#each filteredTerms as term}
					<button
						class="preview-value"
						on:click={() => {
							searchTerm = term;
							entered = true;
							noMatch = false;
							select(searchTerm);
						}}>{term}</button
					>
				{/each}
			{/if}
		</div>
	{/if}
	{#if entered && !empty && noMatch}
		<div class="no-match">Keine Katze gefunden.</div>
	{/if}
</div>

<style>
	#search-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: var(--color-bg-light);
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
		color: var(--color-text-dark);
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
		background-color: var(--color-bg-light);
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
		background: var(--color-grey);
		cursor: pointer;
	}
	.preview-value:focus,
	.preview-value:focus-visible {
		background: var(--color-grey);
	}
	.preview-empty {
		padding: 8px;
		font-size: 14px;
		color: var(--color-text-dark);
		opacity: 0.7;
	}
	.no-match {
		position: absolute;
		width: 100%;
		top: 44px;
		border-radius: 5px;
		background-color: var(--color-bg-light);
		padding: 8px;
		box-sizing: border-box;
		font-size: 14px;
		color: var(--color-text-dark);
		z-index: 1;
	}
</style>
