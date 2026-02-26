<script lang="ts">
	import Spacer from '$lib/components/Spacer.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';

	export let label: string;
	export let value: string;
	export let descr: string;

	export let type: string = 'text';
	export let inputmode:
		| 'text'
		| 'search'
		| 'none'
		| 'tel'
		| 'url'
		| 'email'
		| 'numeric'
		| 'decimal'
		| null
		| undefined = 'text';
	export let minlength: number | null = null;
	export let maxlength: number | null = null;
	export let invalidMessage: string | null = null;

	export let onBlur: () => void;
</script>

<div class="col">
	<b>{label}</b>
	<Spacer height={8} />
	<TextInput
		bind:text={value}
		{type}
		{minlength}
		{maxlength}
		{invalidMessage}
		{inputmode}
		{onBlur}
		on:input
	/>
	<Spacer height={8} />
	<p class="fs14">{descr}</p>
</div>

<style>
</style>
