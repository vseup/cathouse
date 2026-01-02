<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import { toEur } from '$lib/helpers/number.helper';
	import { Cat } from '$lib/models/cat';
	import Form from '../Form.svelte';

	export let cat: Cat;
	export let zIndex: number = 1;
	export let close: () => void;
</script>

<Form
	title="{cat.name} bedankt sich für deinen Beitrag zum Bau des neuen Katzenhauses!"
	{zIndex}
	{close}
>
	<div class="row" style="justify-content: center;">
		<img class="cat-img" src={cat.srcLove} alt="Cat Preview" />
	</div>
	<Spacer height={24} />
	<p>
		Deine Katze wurde erfolgreich erstellt! Du kannst sie ab jetzt auf dieser Webseite besuchen.
	</p>
	<div class="col">
		<Spacer height={24} />
		<div class="divider"></div>
		<Spacer height={24} />
	</div>
	<b>
		Bitte vergiss nicht den Betrag von {toEur(cat.donation)} an das Tierheim Starnberg zu spenden! Vielen
		Dank.
	</b>
	<Spacer height={24} />
	<b>Überweisung</b>
	<Spacer height={8} />
	<div class="row">
		<div class="col iban">
			<p>Tierschutzverein Starnberg u. U. e. V.</p>
			<p>Kreissparkasse München Starnberg</p>
			<p>IBAN: DE25702501500430056762</p>
			<p>BIC: BYLADEM1KMS</p>
		</div>
	</div>
	<Spacer height={24} />
	<b>Paypal</b>
	<Spacer height={8} />
	<div class="row">
		<div class="col">
			<p>info@tierheim-starnberg.de</p>
			<Spacer height={8} />
			<Button>
				<div class="row" style="align-items: center">
					<p>mit Paypal spenden</p>
					<Spacer width={10} />
					<Icon icon="open_in_new" color="#fff" weight={300} />
				</div>
			</Button>
		</div>
	</div>
	<Spacer height={24} />
	<b>Mehr Informationen:</b>
	<Spacer height={8} />
	<div class="row" style="align-items: center">
		<a href="https://www.tierheim-starnberg.de/helfen-und-spenden/spenden/" target="_blank">
			<p>Tierheim Starnberg: Neubau Katzenhaus</p>
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
	.divider {
		height: 1px;
		width: 100%;
		background-color: #d6d6d6;
	}
</style>
