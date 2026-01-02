<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Icon from '$lib/components/controls/Icon.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Form from '../Form.svelte';
	import QrBanking from '$lib/assets/images/qr_banking.jpg';
	import QrPaypal from '$lib/assets/images/qr_paypal.jpg';
	import Divider from '$lib/components/Divider.svelte';
	import DonationInformation from '$lib/components/DonationInformation.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
</script>

<Form title="Spendenmöglichkeiten" {zIndex} {close}>
	<Spacer height={16} />
	<p>
		Spende direkt an das Tierheim, damit du sicher sein kannst, dass dein Geld dort ankommt, wo es
		benötigt wird.
	</p>
	<Divider />
	<DonationInformation />
	<Spacer height={48} />
	<Button widthCss={'100%'} primary on:click={close}>Schließen</Button>
</Form>

<style>
	.cat-img {
		width: 100%;
		max-width: 150px;
		height: auto;
		image-rendering: pixelated;
	}
	.iban {
		line-height: 1.4;
	}
</style>
