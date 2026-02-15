<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { CatType } from '$lib/constants/cat.sprites';
	import { Cat } from '$lib/models/cat';
	import Modal from '../Modal.svelte';
	import CatName from './CatName.svelte';
	import DonorName from './DonorName.svelte';
	import CatCarousel from './CatCarousel.svelte';
	import Donation from './Donation.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
	export let onSaved: (cat: Cat) => Promise<void>;

	const types = Object.values(CatType) as CatType[];
	const cats: Cat[] = types.map((t, i) => new Cat(`preview-${i}`, '', -1, -1, -1, t));
	let catIndex = 0;

	let catNameRef: CatName;
	let catNameInput: string = '';

	let donationRef: Donation;
	let donationInput: string = '';

	let donorNameInput: string = '';
	let isSaving = false;
	let saveError: string | null = null;

	function validate(): boolean {
		const catNameValid = catNameRef.validate();
		const donationValid = donationRef.validate();
		return catNameValid && donationValid;
	}

	function getSaveErrorMessage(error: unknown): string {
		if (error instanceof Error) {
			return error.message;
		}

		return 'Deine Katze konnte nicht gespeichert werden. Bitte versuche es erneut.';
	}

	async function create() {
		if (isSaving) return;
		saveError = null;

		const valid = validate();
		if (!valid) return;

		const selectedType = cats[catIndex].type;
		const parsedDonation = parseFloat(donationInput.replace(',', '.'));
		const donorName = donorNameInput.trim();
		const cat = new Cat(
			'pending-create',
			catNameInput.trim(),
			-1,
			-1,
			parsedDonation,
			selectedType,
			donorName.length > 0 ? donorName : undefined
		);

		try {
			isSaving = true;
			await onSaved(cat);
			close();
		} catch (error) {
			saveError = getSaveErrorMessage(error);
		} finally {
			isSaving = false;
		}
	}
</script>

<Modal title="Unterstütze das Tierheim Starnberg beim Bau des neuen Katzenhauses!" {zIndex} {close}>
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
	{#if saveError != null}
		<Spacer height={16} />
		<p class="error-message">{saveError}</p>
	{/if}
	<Spacer height={24} />
	<div class="row">
		<Button
			textColor="var(--color-text-dark)"
			bgColor="var(--color-grey)"
			bgColorHover="var(--color-grey-darken-1)"
			on:click={() => {
				if (!isSaving) close();
			}}
		>
			Abbrechen
		</Button>
		<Spacer width={24} />
		<div style="flex: 1;">
			<Button widthCss={'100%'} primary on:click={create}
				>{isSaving ? 'Speichern...' : 'Katze erstellen'}</Button
			>
		</div>
	</div>
</Modal>

<style>
	.error-message {
		color: var(--color-error);
		font-size: 14px;
	}
</style>
