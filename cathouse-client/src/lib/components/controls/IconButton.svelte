<script lang="ts">
	import Icon from './Icon.svelte';

	export let icon: string;
	export let primary: boolean = false;
	export let disabled: boolean = false;
</script>

<button class="button {primary ? 'primary' : 'secondary'}" {disabled} on:click>
	{#if icon}
		<Icon {icon} color="var(--color-text-light);" />
	{/if}
</button>

<style>
	.button {
		height: 48px;
		width: 48px;
		border-radius: 16px;
		border: solid 1px var(--color-text-light);
		font-size: 18px;
		padding-left: 24px;
		padding-right: 24px;
		color: var(--color-text-light);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.primary {
		background-color: var(--color-bg);
	}
	.primary:hover {
		background-color: var(--color-bg-darken-1);
	}
	.secondary {
		background-color: var(--color-green);
	}
	.secondary:hover {
		background-color: var(--color-green-darken-1);
	}
</style>
