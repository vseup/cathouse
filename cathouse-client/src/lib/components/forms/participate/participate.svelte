<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { CatType } from '$lib/constants/cat.sprites';
	import { to2digits } from '$lib/helpers/number.helper';
	import { Cat } from '$lib/models/cat';
	import Form from '../Form.svelte';

	export let zIndex: number = 1;
	export let close: () => void;
	export let onSaved: (cat: Cat) => void;

	const types = Object.values(CatType) as CatType[];
	const cats: Cat[] = types.map((t) => new Cat(-1, '', -1, -1, -1, t));
	let catIndex = 0;

	let catNameInput = '';
	let donationInput = '';
	let donorNameInput = '';

	function next() {
		if (catIndex === cats.length - 1) {
			catIndex = 0;
		} else {
			catIndex++;
		}
	}
	function prev() {
		if (catIndex === 0) {
			catIndex = cats.length - 1;
		} else {
			catIndex--;
		}
	}
	function create() {
		console.log('create');
		if (catNameInput.length <= 0 || donationInput.length <= 0) return;
		console.log('inputs ok');
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
	<b>Wähle eine Katze:</b>
	<div class="row" style="align-items: center">
		<IconButton icon="chevron_left" primary on:click={next} />
		<div style="flex: 1"></div>
		<img class="cat-img" src={cats[catIndex].srcIdle} alt="Cat Preview" />
		<div style="flex: 1"></div>
		<IconButton icon="chevron_right" primary on:click={prev} />
	</div>
	<Spacer height={24} />
	<b>Katzenname</b>
	<Spacer height={8} />
	<TextInput
		bind:text={catNameInput}
		minlength={1}
		maxlength={60}
		invalidMessage="Miau"
		onBlur={() => {}}
	/>
	<Spacer height={8} />
	<p class="fs14">Mit Hilfe des Namens kannst du deine Katze später wiederfinden.</p>
	<Spacer height={24} />
	<b>Dein Name (optional)</b>
	<Spacer height={8} />
	<TextInput bind:text={donorNameInput} maxlength={60} onBlur={() => {}} />
	<Spacer height={8} />
	<p class="fs14">Wenn du möchtest, zeigen wir dich als Unterstützer*in an.</p>
	<Spacer height={24} />
	<b>Spendenbetrag (€)</b>
	<Spacer height={8} />
	<TextInput
		bind:text={donationInput}
		onBlur={() => {
			console.log('blurry');
			donationInput = to2digits(parseFloat(donationInput.replace(',', '.')));
		}}
	/>
	<Spacer height={8} />
	<p class="fs14">
		Dieser Betrag ist symbolisch und wird mit deiner Katze verknüpft. Bitte spende direkt an das
		Tierheim, damit du sicher sein kannst, dass dein Geld dort ankommt, wo es benötigt wird. Wir
		vertrauen auf deine Ehrlichkeit.
	</p>
	<Spacer height={48} />
	<div class="row">
		<Button textColor="#222" bgColor="#e1e1e1" bgColorHover="#D9D9D9" on:click={close}>
			Abbrechen
		</Button>
		<Spacer width={24} />
		<div style="flex: 1;">
			<Button widthCss={'100%'} primary on:click={create}>Katze erstellen</Button>
		</div>
	</div>
</Form>

<style>
	.cat-img {
		width: 100%;
		max-width: 150px;
		height: auto;
		image-rendering: pixelated;
	}
</style>
