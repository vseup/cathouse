<script lang="ts">
	import InputWithLabelAndDescr from '$lib/components/inputs/InputWithLabelAndDescr.svelte';
	import { to2digits } from '$lib/helpers/number.helper';

	export let value: string;
	export function validate(): boolean {
		if (value == null) {
			invalidMessage = 'Der Spendenbetrag darf nicht leer sein!';
			return false;
		}
		if (isNaN(parseFloat(value))) {
			invalidMessage = 'Der Spendenbetrag muss ein valider Eurobetrag sein!';
			return false;
		}
		return true;
	}

	let invalidMessage: string | null = null;

	function onBlur() {
		if (isNaN(parseFloat(value))) return;
		value = to2digits(parseFloat(value.replace(',', '.')));
	}
</script>

<InputWithLabelAndDescr
	label="Spendenbetrag (€)"
	descr="Dieser Betrag ist symbolisch und wird mit deiner Katze verknüpft. Mehr Informationen zu Spendenmöglichkeiten werden dir angezeigt, wenn du 'Katze erstellen' gedrückt hast."
	bind:value
	{invalidMessage}
	minlength={1}
	inputmode="decimal"
	on:input={() => (invalidMessage = null)}
	{onBlur}
/>

<style>
</style>
