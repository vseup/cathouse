<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	export let label: string;
	export let value: string;
	export let descr: string;

	export let minlength: number | null = null;
	export let maxlength: number | null = null;
	export let invalidMessage: string | null = null;

	export let onBlur: () => void;
</script>

<div class="col">
	<b>{label}</b>
	<Spacer height={8} />
	<TextInput bind:text={value} {minlength} {maxlength} {invalidMessage} {onBlur} />
	<Spacer height={8} />
	<p class="fs14">{descr}</p>
</div>

<style>
</style>
