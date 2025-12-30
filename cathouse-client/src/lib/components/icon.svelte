<script lang="ts">
	export let icon: string;
	export let hidden: boolean = false;
</script>

<button class="icon-button {hidden ? 'hidden' : ''}" disabled={hidden} on:click>
	<div class="icon">{icon}</div></button
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
