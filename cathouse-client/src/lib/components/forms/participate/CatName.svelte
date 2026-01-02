<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let name: string;
	export let invalidMessage: string | null = null;
</script>

<div class="col">
	<b>Katzenname</b>
	<Spacer height={8} />
	<TextInput bind:text={name} minlength={1} maxlength={60} {invalidMessage} onBlur={() => {}} />
	<Spacer height={8} />
	<p class="fs14">Mit Hilfe des Namens kannst du deine Katze später wiederfinden.</p>
</div>

<style>
</style>
