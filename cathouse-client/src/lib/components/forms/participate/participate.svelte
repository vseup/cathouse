<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import { CatType } from '$lib/constants/cat.sprites';
	import { to2digits } from '$lib/helpers/number.helper';
	import { Cat } from '$lib/models/cat';
	import Form from '../Form.svelte';
	import CatName from './CatName.svelte';
	import DonorName from './DonorName.svelte';
	import CatCarousel from './CatCarousel.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
	export let onSaved: (cat: Cat) => void;

	const types = Object.values(CatType) as CatType[];
	const cats: Cat[] = types.map((t) => new Cat(-1, '', -1, -1, -1, t));
	let catIndex = 0;

	let catNameInput = '';
	let donationInput = '';
	let donorNameInput = '';

	function create() {
		if (catNameInput.length <= 0 || donationInput.length <= 0) return;
		let cat = cats[catIndex];
		cat.name = catNameInput;
		cat.donation = parseFloat(donationInput);
		if (donorNameInput.length > 0) {
			cat.donor = donorNameInput;
		}
		onSaved(cat);
		close();
	}
</script>

<Form title="Unterstütze das Tierheim Starnberg beim Bau des neuen Katzenhauses!" {zIndex} {close}>
	<p class="fs14">
		Schenke einer virtuellen Katze ein Zuhause auf dieser Webseite, gib ihr einen Namen und nutze
		den Anlass für eine Spende an das Tierheim Starnberg.
	</p>
	<Spacer height={24} />
	<CatCarousel {cats} bind:catIndex />
	<Spacer height={24} />
	<CatName bind:name={catNameInput} />
	<Spacer height={24} />
	<DonorName bind:name={donorNameInput} />
	<Spacer height={24} />
	<b>Spendenbetrag (€)</b>
	<Spacer height={8} />
	<TextInput
		bind:text={donationInput}
		onBlur={() => {
			donationInput = to2digits(parseFloat(donationInput.replace(',', '.')));
		}}
	/>
	<Spacer height={8} />
	<p class="fs14">
		Dieser Betrag ist symbolisch und wird mit deiner Katze verknüpft. Bitte spende direkt an das
		Tierheim, damit du sicher sein kannst, dass dein Geld dort ankommt, wo es benötigt wird. Wir
		vertrauen auf deine Ehrlichkeit.
	</p>
	<Spacer height={48} />
	<div class="row">
		<Button textColor="#222" bgColor="#e1e1e1" bgColorHover="#D9D9D9" on:click={close}>
			Abbrechen
		</Button>
		<Spacer width={24} />
		<div style="flex: 1;">
			<Button widthCss={'100%'} primary on:click={create}>Katze erstellen</Button>
		</div>
	</div>
</Form>

<style>
</style>
