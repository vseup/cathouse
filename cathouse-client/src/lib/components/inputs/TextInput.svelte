<script lang="ts">
	export let text: string;
	export let minlength: number | null = null;
	export let maxlength: number | null = null;
	export let type: string = 'text';
	export let invalidMessage: string | null = null;
	export let onBlur: () => void;
</script>

<div id="text-input-wrapper" class={invalidMessage ? 'invalid' : ''}>
	<input {type} id="text-input" {minlength} {maxlength} bind:value={text} on:blur={onBlur} />
</div>

<style>
	#text-input-wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		background-color: #e1e1e1;
		border-radius: 5px;
		padding: 8px;
		box-sizing: border-box;
		position: relative;
	}
	#text-input {
		width: 100%;
		border: none;
		font-size: 18px;
		background-color: #e1e1e1;
	}
	#text-input:focus,
	#text-input:focus-visible {
		border: none;
		outline: none;
		box-shadow: none;
	}
	.invalid {
		border: solid #ff2b4b;
	}
</style>
