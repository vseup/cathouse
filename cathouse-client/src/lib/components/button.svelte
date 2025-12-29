<script lang="ts">
	export let text: string;
	export let primary: boolean = false;
	export let widthCss: string = 'auto';
</script>

<button class="button {primary ? 'primary' : 'secondary'}" style="width: {widthCss}">
	{text}
</button>

<style>
	.button {
		height: 48px;
		border-radius: 16px;
		border: solid 2px #fff;
		font-size: 18px;
		padding-left: 24px;
		padding-right: 24px;
		color: #fff;
		cursor: pointer;
	}
	.primary {
		background-color: #222;
	}
	.primary:hover {
		background-color: #101010;
	}
	.secondary {
		background-color: #17833d;
	}
	.secondary:hover {
		background-color: #147335;
	}
</style>
