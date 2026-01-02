<script lang="ts">
	export let icon: string;
	export let hidden: boolean = false;
	export let color: string = 'var(--color-text-dark)';
	export let weight: number = 400;
</script>

<button class="icon-button {hidden ? 'hidden' : ''}" disabled={hidden} on:click>
	<div class="icon" style:color style:font-weight={weight}>{icon}</div></button
>

<style>
	.icon-button {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0px;
	}
	.hidden {
		opacity: 0;
		cursor: auto;
	}
</style>
