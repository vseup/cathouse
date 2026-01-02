<script lang="ts">
	import InputWithLabelAndDescr from '$lib/components/inputs/InputWithLabelAndDescr.svelte';

	export let name: string;
	export function validate(): boolean {
		name = name.trim();
		if (name.length < 1) {
			invalidMessage = 'Der Katzenname darf nicht leer sein!';
			return false;
		}
		return true;
	}

	let invalidMessage: string | null = null;
</script>

<InputWithLabelAndDescr
	label="Katzenname"
	descr="Mit Hilfe des Namens kannst du deine Katze später wiederfinden."
	bind:value={name}
	{invalidMessage}
	minlength={1}
	maxlength={60}
	onBlur={() => {}}
	on:input={() => (invalidMessage = null)}
/>

<style>
</style>
