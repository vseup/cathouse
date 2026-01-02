<script lang="ts">
	export let primary: boolean = false;
	export let widthCss: string = 'auto';
	export let textColor: string = 'var(--color-text-light)';
	export let bgColor: string | null = null;
	export let bgColorHover: string | null = null;

	$: bgColor = bgColor ?? (primary ? 'var(--color-bg)' : 'var(--color-green)');
	$: bgColorHover =
		bgColorHover ?? (primary ? 'var(--color-bg-darken-1)' : 'var(--color-green-darken-1)');
</script>

<button
	class="button"
	style="--btn-color-bg: {bgColor}; --btn-color-bg-hover: {bgColorHover}; --btn-text-color: {textColor}; width: {widthCss};"
	on:click
>
	<slot></slot>
</button>

<style>
	.button {
		height: 48px;
		border-radius: 16px;
		border: solid 1px var(--color-text-light);
		font-size: 18px;
		padding-left: 24px;
		padding-right: 24px;
		color: var(--btn-text-color);
		cursor: pointer;
		background-color: var(--btn-color-bg);
	}
	.button:hover {
		background-color: var(--btn-color-bg-hover);
	}
</style>
