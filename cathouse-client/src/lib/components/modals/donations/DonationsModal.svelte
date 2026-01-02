<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Modal from '../Modal.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DonationInformation from '$lib/components/DonationInformation.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
</script>

<Modal title="Spendenmöglichkeiten" {zIndex} {close}>
	<Spacer height={16} />
	<p>
		Spende direkt an das Tierheim, damit du sicher sein kannst, dass dein Geld dort ankommt, wo es
		benötigt wird.
	</p>
	<Divider />
	<DonationInformation />
	<Spacer height={48} />
	<Button widthCss={'100%'} primary on:click={close}>Schließen</Button>
</Modal>

<style>
</style>
