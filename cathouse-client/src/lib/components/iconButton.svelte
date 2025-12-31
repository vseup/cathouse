<script lang="ts">
	import Icon from './icon.svelte';

	export let icon: string;
	export let primary: boolean = false;
</script>

<button class="button {primary ? 'primary' : 'secondary'}" on:click>
	{#if icon}
		<Icon {icon} color="#fff" />
	{/if}
</button>

<style>
	.button {
		height: 48px;
		width: 48px;
		border-radius: 16px;
		border: solid 1px #fff;
		font-size: 18px;
		padding-left: 24px;
		padding-right: 24px;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
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
		background-color: #126b31;
	}
</style>
