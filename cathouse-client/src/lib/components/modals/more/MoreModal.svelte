<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Modal from '../Modal.svelte';
	import CatListModal from '../catlist/CatListModal.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DonationInformation from '$lib/components/DonationInformation.svelte';
	import type { Cat } from '$lib/models/cat';

	export let zIndex: number = 1;
	export let close: () => void;
	export let cats: Cat[] = [];
	let showCatListModal = false;
</script>

<Modal title="Spenden für den Neubau des Katzenhauses im Tierheim Starnberg." {zIndex} {close}>
	<Spacer height={16} />
	<b>Ausgangssituation im Jahr 2025:</b>
	<Spacer height={8} />
	<p>
		Das Katzenhaus im Tierheim Starnberg muss dringend erneuert werden, denn die aktuelle Situation
		ist für Menschen und Tiere auf Dauer nicht mehr tragbar.
	</p>
	<Spacer height={8} />
	<p>Da der Umbau massive Kosten mit sich bringt, ist das Tierheim auf deine Spende angewiesen.</p>
	<Divider />
	<DonationInformation />
	<Divider />
	<b>Pfotenaufkleber-Aktion</b>
	<Spacer height={8} />
	<p>
		Ab 50€ Einzelspende kannst du einen Pfotenaufkleber im Tierheim persönlich signieren. Diese
		bunten Aufkleber werden im neuen Katzenhaus aufgeklebt, so dass du als Spender*in ein Teil des
		Neubaus wirst und deine Spendenpfote dort für alle sichtbar ist. Als Nachweis gilt dann z.B. das
		Vorzeigen der PayPal Zahlung.
	</p>
	<Divider />
	<b>Über diese Webseite:</b>
	<Spacer height={8} />
	<p>
		Diese Webseite wurde von Verena Pues als private Unterstützerin erstellt und soll auf die
		Situation aufmerksam machen, zum Spenden motivieren und visualisieren, was gemeinsam erreicht
		werden kann.
	</p>
	<Spacer height={8} />
	<p>
		Solltest du Fragen zu dieser Webseite haben findest du die Kontaktinformationen im Impressum.
	</p>
	<Spacer height={8} />
	<p>
		Jede virtuelle Katze repräsentiert eine Spende. Umso mehr es hier wimmelt, umso näher kommen wir
		dem Ziel des neu erbauten Katzenhauses.
	</p>
	<Spacer height={8} />
	<p>Für mehr Informationen zum Neubau wende dich bitte direkt an das Tierheim Starnberg.</p>
	<Spacer height={8} />
	<p><b>Dies ist kein offizieller Auftritt des Tierheims Starnberg.</b></p>
	<Spacer height={48} />
	<Button widthCss={'100%'} on:click={() => (showCatListModal = true)}>Alle Katzen ansehen</Button>
	<Spacer height={24} />
	<Button widthCss={'100%'} primary on:click={close}>Schließen</Button>
</Modal>
{#if showCatListModal}
	<CatListModal zIndex={zIndex + 10} close={() => (showCatListModal = false)} {cats} />
{/if}

<style>
</style>
