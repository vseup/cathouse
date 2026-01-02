<script lang="ts">
	import InputWithLabelAndDescr from '$lib/components/inputs/InputWithLabelAndDescr.svelte';
	import { to2digits } from '$lib/helpers/number.helper';

	export let value: string;

	let invalidMessage: string | null = null;
</script>

<InputWithLabelAndDescr
	label="Spendenbetrag (€)"
	descr="Dieser Betrag ist symbolisch und wird mit deiner Katze verknüpft. Bitte spende direkt an das
		Tierheim, damit du sicher sein kannst, dass dein Geld dort ankommt, wo es benötigt wird. Wir
		vertrauen auf deine Ehrlichkeit."
	bind:value
	{invalidMessage}
	minlength={1}
	onBlur={() => {
		value = to2digits(parseFloat(value.replace(',', '.')));
	}}
/>

<style>
</style>
