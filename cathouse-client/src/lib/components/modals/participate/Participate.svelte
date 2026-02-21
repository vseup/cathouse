<script lang="ts">
	import { onMount } from 'svelte';
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/spacer.svelte';
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

	const PARTICIPATE_DRAFT_KEY = 'participate-form-draft-v1';
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
	let acceptedConsent = false;
	let consentError: string | null = null;
	let previousHasDonorName = false;
	let isRestoringDraft = false;

	$: hasDonorName = donorNameInput.trim().length > 0;
	$: if (!isRestoringDraft && hasDonorName !== previousHasDonorName) {
		acceptedConsent = false;
		consentError = null;
		previousHasDonorName = hasDonorName;
	}

	function validate(): boolean {
		const catNameValid = catNameRef.validate();
		const donationValid = donationRef.validate();
		const consentValid = validateConsent();
		return catNameValid && donationValid && consentValid;
	}

	function validateConsent(): boolean {
		if (!acceptedConsent) {
			consentError = hasDonorName
				? 'Bitte stimme der Speicherung und Anzeige deines Namens in der Datenschutzerklärung zu.'
				: 'Bitte bestätige, dass du die Datenschutzerklärung zur Kenntnis genommen hast.';
			return false;
		}
		consentError = null;
		return true;
	}

	type ParticipateDraft = {
		catIndex: number;
		catNameInput: string;
		donationInput: string;
		donorNameInput: string;
		acceptedConsent: boolean;
	};

	function persistDraft() {
		const draft: ParticipateDraft = {
			catIndex,
			catNameInput,
			donationInput,
			donorNameInput,
			acceptedConsent
		};
		sessionStorage.setItem(PARTICIPATE_DRAFT_KEY, JSON.stringify(draft));
	}

	function clearDraft() {
		sessionStorage.removeItem(PARTICIPATE_DRAFT_KEY);
	}

	function restoreDraft(rawDraft: string) {
		const parsed: unknown = JSON.parse(rawDraft);
		if (parsed == null || typeof parsed !== 'object') return;

		const draft = parsed as Partial<ParticipateDraft>;
		isRestoringDraft = true;

		if (typeof draft.catIndex === 'number' && Number.isFinite(draft.catIndex)) {
			catIndex = Math.min(Math.max(Math.trunc(draft.catIndex), 0), cats.length - 1);
		}
		if (typeof draft.catNameInput === 'string') catNameInput = draft.catNameInput;
		if (typeof draft.donationInput === 'string') donationInput = draft.donationInput;
		if (typeof draft.donorNameInput === 'string') donorNameInput = draft.donorNameInput;
		if (typeof draft.acceptedConsent === 'boolean') acceptedConsent = draft.acceptedConsent;

		previousHasDonorName = donorNameInput.trim().length > 0;
		isRestoringDraft = false;
	}

	function closeAndClearDraft() {
		clearDraft();
		close();
	}

	onMount(() => {
		const rawDraft = sessionStorage.getItem(PARTICIPATE_DRAFT_KEY);
		if (rawDraft == null) return;

		try {
			restoreDraft(rawDraft);
		} catch {
			clearDraft();
		}
	});

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
			clearDraft();
			close();
		} catch (error) {
			saveError = getSaveErrorMessage(error);
		} finally {
			isSaving = false;
		}
	}
</script>

<Modal
	title="Unterstütze das Tierheim Starnberg beim Bau des neuen Katzenhauses!"
	{zIndex}
	close={closeAndClearDraft}
>
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
	<Spacer height={16} />
	<label class="checkbox-row fs14">
		<input type="checkbox" bind:checked={acceptedConsent} on:change={() => (consentError = null)} />
		<span>
			Ich habe die
			<a href="/privacy?from=participate" on:click={persistDraft}>Datenschutzerklärung</a>
			zur Kenntnis genommen.
			{#if hasDonorName}
				Ich stimme zu, dass mein angegebener Name gespeichert und öffentlich angezeigt wird.
			{/if}
		</span>
	</label>
	{#if consentError != null}
		<Spacer height={8} />
		<p class="error-message">{consentError}</p>
	{/if}
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
				if (!isSaving) closeAndClearDraft();
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
	.legal-note {
		line-height: 1.5;
	}
	.checkbox-row {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		line-height: 1.5;
	}
	.checkbox-row input {
		margin-top: 3px;
	}
</style>
