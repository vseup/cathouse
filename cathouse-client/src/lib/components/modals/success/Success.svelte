<script lang="ts">
	import Button from '$lib/components/controls/Button.svelte';
	import Spacer from '$lib/components/spacer.svelte';
	import { toEur } from '$lib/helpers/number.helper';
	import { Cat } from '$lib/models/cat';
	import Modal from '../Modal.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import DonationInformation from '$lib/components/DonationInformation.svelte';

	export let cat: Cat;
	export let zIndex: number = 1;
	export let close: () => void;
</script>

<Modal
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
	<Spacer height={8} />
	<p>
		<b>
			Bitte vergiss nicht den Betrag von {toEur(cat.donation)} an das Tierheim Starnberg zu spenden.
			Vielen Dank!
		</b>
	</p>
	<Divider />
		<DonationInformation amount={cat.donation} />
	<Spacer height={48} />
	<Button widthCss={'100%'} primary on:click={close}>Schließen</Button>
</Modal>

<style>
	.cat-img {
		width: 100%;
		max-width: 150px;
		height: auto;
		image-rendering: pixelated;
	}
</style>
