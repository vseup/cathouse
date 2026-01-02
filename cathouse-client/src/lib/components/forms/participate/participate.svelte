<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { CatType } from '$lib/constants/cat.sprites';
	import { Cat } from '$lib/models/cat';
	import Form from '../Form.svelte';
	import CatName from './CatName.svelte';
	import DonorName from './DonorName.svelte';
	import CatCarousel from './CatCarousel.svelte';
	import Donation from './Donation.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
	export let onSaved: (cat: Cat) => void;

	const types = Object.values(CatType) as CatType[];
	const cats: Cat[] = types.map((t) => new Cat(-1, '', -1, -1, -1, t));
	let catIndex = 0;

	let catNameRef: CatName;
	let catNameInput: string = '';

	let donationRef: Donation;
	let donationInput: string = '';

	let donorNameInput: string = '';

	function validate(): boolean {
		const catNameValid = catNameRef.validate();
		const donationValid = donationRef.validate();
		return catNameValid && donationValid;
	}

	function create() {
		const valid = validate();
		if (!valid) return;
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
	<CatName bind:this={catNameRef} bind:name={catNameInput} />
	<Spacer height={24} />
	<DonorName bind:name={donorNameInput} />
	<Spacer height={24} />
	<Donation bind:this={donationRef} bind:value={donationInput} />
	<Spacer height={48} />
	<div class="row">
		<Button
			textColor="var(--color-text-dark)"
			bgColor="var(--color-grey)"
			bgColorHover="var(--color-grey-darken-1)"
			on:click={close}
		>
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
