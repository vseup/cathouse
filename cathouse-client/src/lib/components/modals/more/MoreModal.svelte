<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Modal from '../Modal.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DonationInformation from '$lib/components/DonationInformation.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
</script>

<Modal title="Spenden für den Neubau des Katzenhauses im Tierheim Starnberg." {zIndex} {close}>
	<Spacer height={16} />
	<b>Ausgangssituation im Jahr 2025:</b>
	<Spacer height={8} />
	<p>
		Das Katzenhaus im Tierheim Starnberg muss dringend erneuert werden, denn es fehlt an allen Ecken
		und Enden: kein fließendes Wasser, keine Versorgungsräume, zu kleine Zimmer, teils ohne Auslauf.
	</p>
	<Spacer height={8} />
	<p>
		Damit eine Unterbringung künftig genehmigungsfähig und tiergerecht ist, braucht es einen Neubau
		mit klar getrennten Bereichen und eigenen Eingängen.
	</p>
	<Spacer height={8} />
	<p>
		Da die aktuelle Situation für Menschen und Tiere auf Dauer nicht mehr tragbar ist und so ein
		Umbau massive Kosten mit sich bringt, ist das Tierheim auf deine Spende angewiesen.
	</p>
	<Divider />
	<DonationInformation />
	<Divider />
	<b>Über diese Webseite:</b>
	<Spacer height={8} />
	<p>
		Diese Webseite wurde von einer privaten Unterstützerin erstellt und soll auf die Situation
		aufmerksam machen, zum Spenden motivieren und visualisieren, was gemeinsam erreicht werden kann.
	</p>
	<Spacer height={8} />
	<p>
		Jedes virtuelle Kätzchen repräsentiert die Spende. Umso mehr es hier wimmelt, umso näher kommen
		wir dem Ziel des neu erbauten Katzenhauses.
	</p>
	<Spacer height={8} />
	<p>Für mehr Informationen zum Neubau wende dich bitte direkt an das Tierheim Starnberg.</p>
	<Spacer height={48} />
	<Button widthCss={'100%'} primary on:click={close}>Schließen</Button>
</Modal>

<style>
</style>
