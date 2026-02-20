<script lang="ts">
	import InputWithLabelAndDescr from '$lib/components/inputs/InputWithLabelAndDescr.svelte';

	export let name: string;
	export let invalidMessage: string | null = null;
</script>

<InputWithLabelAndDescr
	label="Dein Name (optional)"
	descr="Wenn du möchtest, zeigen wir dich als Unterstützer*in an, dafür kannst du auch einen Spitznamen verwenden."
	bind:value={name}
	{invalidMessage}
	minlength={1}
	maxlength={60}
	onBlur={() => {}}
/>

<style>
</style>
