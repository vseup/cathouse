<script lang="ts">
	export let primary: boolean = false;
	export let widthCss: string = 'auto';
	export let textColor: string = '#fff';
	export let bgColor: string | null = null;
	export let bgColorHover: string | null = null;

	$: bgColor = bgColor ?? (primary ? '#222' : '#17833d');
	$: bgColorHover = bgColorHover ?? (primary ? '#101010' : '#126b31');
</script>

<button
	class="button"
	style="--bg-color: {bgColor}; --bg-color-hover: {bgColorHover}; --btn-text-color: {textColor}; width: {widthCss};"
	on:click
>
	<slot></slot>
</button>

<style>
	.button {
		height: 48px;
		border-radius: 16px;
		border: solid 1px #fff;
		font-size: 18px;
		padding-left: 24px;
		padding-right: 24px;
		color: var(--btn-text-color);
		cursor: pointer;
		background-color: var(--bg-color);
	}
	.button:hover {
		background-color: var(--bg-color-hover);
	}
</style>
