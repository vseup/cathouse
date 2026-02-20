<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Icon from '$lib/components/controls/Icon.svelte';
	import Spacer from '$lib/components/spacer.svelte';
	import QrPaypal from '$lib/assets/images/qr_paypal.jpg';
	import Divider from '$lib/components/Divider.svelte';

	export let amount: number | null = null;

	function buildPaypalDonationUrl() {
		const baseUrl = 'https://www.paypal.com/paypalme/Tierheimstarnberg';

		if (amount != null && Number.isFinite(amount) && amount > 0) {
			const roundedAmount = Math.floor(amount);
			const amountAndCurrency = `${roundedAmount}EUR`;
			return `${baseUrl}/${amountAndCurrency}`;
		}

		return baseUrl;
	}

	function openPaypalDonation() {
		window.open(buildPaypalDonationUrl(), '_blank', 'noopener,noreferrer');
	}
</script>

<div class="col">
	<b>Paypal</b>
	<Spacer height={8} />
	<div class="row">
		<div class="col">
			<p>info@tierheim-starnberg.de</p>
			<Spacer height={8} />
			<Button on:click={openPaypalDonation}>
				<div class="row" style="align-items: center">
					<p>mit Paypal spenden</p>
					<Spacer width={10} />
					<Icon icon="open_in_new" color="var(--color-text-light)" weight={300} />
				</div>
			</Button>
		</div>
		<div style="flex: 1"></div>
		<img class="qr" src={QrPaypal} alt="QR Code mit Paypal Link des Tierheim Starnbergs" />
	</div>
	<Divider />
	<b>Mehr Informationen:</b>
	<Spacer height={8} />
	<div class="row" style="align-items: center">
		<a href="https://www.tierheim-starnberg.de/helfen-und-spenden/spenden/" target="_blank">
			<p>Tierheim Starnberg: Spendenmöglichkeiten</p>
		</a>
		<Spacer width={8} />
		<Icon icon="open_in_new" weight={300} />
	</div>
	<Spacer height={8} />
	<div class="row" style="align-items: center">
		<a
			href="https://www.tierheim-starnberg.de/helfen-und-spenden/projekt-neubau-katzenhaus/"
			target="_blank"
		>
			<p>Tierheim Starnberg: Neubau Katzenhaus</p>
		</a>
		<Spacer width={8} />
		<Icon icon="open_in_new" weight={300} />
	</div>
</div>
