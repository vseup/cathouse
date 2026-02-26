<script lang="ts">
	import Spacer from '../Spacer.svelte';

	export let text: string;
	export let minlength: number | null = null;
	export let maxlength: number | null = null;
	export let type: string = 'text';
	export let inputmode:
		| 'text'
		| 'search'
		| 'none'
		| 'tel'
		| 'url'
		| 'email'
		| 'numeric'
		| 'decimal'
		| null
		| undefined = 'text';
	export let invalidMessage: string | null = null;
	export let onBlur: () => void;
</script>

<div class="col">
	<div id="text-input-wrapper" class={invalidMessage ? 'invalid' : ''}>
		<input
			{type}
			{inputmode}
			id="text-input"
			{minlength}
			{maxlength}
			bind:value={text}
			on:blur={onBlur}
			on:input
		/>
	</div>
	{#if invalidMessage}
		<Spacer height={4} />
		<p class="fs14" style:color="var(--color-error)">{invalidMessage}</p>
	{/if}
</div>

<style>
	#text-input-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: var(--color-grey);
		border-radius: 5px;
		padding: 8px;
		box-sizing: border-box;
		position: relative;
	}
	#text-input {
		width: 100%;
		border: none;
		font-size: 18px;
		background-color: var(--color-grey);
	}
	#text-input:focus,
	#text-input:focus-visible {
		border: none;
		outline: none;
		box-shadow: none;
	}
	.invalid {
		border: solid var(--color-error);
	}
</style>
