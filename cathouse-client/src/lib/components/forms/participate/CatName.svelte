<script lang="ts">
	import InputWithLabelAndDescr from '$lib/components/InputWithLabelAndDescr.svelte';

	export let name: string;
	export let invalidMessage: string | null = null;
</script>

<InputWithLabelAndDescr
	label="Katzenname"
	descr="Mit Hilfe des Namens kannst du deine Katze später wiederfinden."
	bind:value={name}
	{invalidMessage}
	minlength={1}
	maxlength={60}
	onBlur={() => {}}
/>

<style>
</style>
