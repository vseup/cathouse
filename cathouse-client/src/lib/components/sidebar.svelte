<script lang="ts">
	import Search from '$lib/components/search.svelte';
	import Button from '$lib/components/button.svelte';
	import TierheimLogo from '$lib/assets/images/tierheim-starnberg-logo.png';
	import Spacer from './spacer.svelte';
	import type { Cat } from '$lib/models/cat';
	import { toEur } from '$lib/helpers/number.helper';

	export let donation: number;
	export let cat: Cat | null = null;
	export let cats: Cat[];
	export let searchTerm: string = '';
	export let clear: () => void;
	export let select: (term: string) => void;
	export let openParticipate: () => void;

	const SIDEBAR_WIDTH = 450;
</script>

<div style={`--sidebar-width: ${SIDEBAR_WIDTH}px`} id="sidebar" class="col">
	<div class="col">
		<Search
			bind:searchTerm
			placeholder="Katze suchen"
			{clear}
			{select}
			terms={cats.map((c) => c.name)}
		/>
		{#if cat}
			<Spacer height={16} />
			<div class="wrapper col">
				<span class="name">{cat.name}</span>
				<img
					class="cat-img"
					src={cat.srcIdle}
					alt="Cat named {cat.name}"
					style:transform="scaleX({cat.vx < 0 ? -1 : 1})"
				/>
				<Spacer height={24} />
				<p class="cat-descr">Spendenbetrag: <b>{toEur(cat.donation)}</b></p>
				<p class="cat-descr">Unterstützer*in: {cat.donor ?? 'Anonym'}</p>
			</div>
		{/if}
	</div>
	<div class="col">
		<Spacer height={24} />
		{#if !cat}
			<img id="logo" src={TierheimLogo} alt="Logo Tierheim Starnberg" />
			<Spacer height={32} />
		{/if}
		<p style="text-align: center; color: #fff">
			Jede Katze auf dieser Webseite bedeutet eine Spende für den dringend benötigten Neubau des
			Katzenhauses im Tierheim Starnberg!
		</p>
		<Spacer height={32} />
		<Button widthCss="75%" primary on:click={openParticipate}>Mitmachen!</Button>
		<Spacer height={16} />
		<Button widthCss="75%">Spendenmöglichkeiten</Button>
		<Spacer height={16} />
		<Button widthCss="75%">mehr erfahren</Button>
		<Spacer height={24} />
	</div>
	<div class="col">
		<div id="donation" class="wrapper col">
			<div>bereits gesammelt*:</div>
			<span> {toEur(donation)} </span>
		</div>
		<Spacer height={16} />
		<p id="note">
			*Gesammelter Betrag beruht auf der Annahme, dass von den Teilnehmern keine falschen Angaben
			gemacht wurden.
		</p>
	</div>
</div>

<style>
	.cat-img {
		width: 35%;
		height: auto;
		image-rendering: pixelated;
	}
	#sidebar {
		width: var(--sidebar-width);
		height: 100%;
		background-color: #17823e;
		padding: 24px;
		justify-content: space-between;
	}
	#logo {
		width: 35%;
		height: auto;
	}
	.col {
		display: flex;
		flex-direction: column;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
	}
	.wrapper {
		width: 100%;
		padding: 24px;
		background-color: #126b31;
		border-radius: 16px;
		box-sizing: border-box;
		color: #fff;
	}
	#donation span {
		font-weight: 800;
		font-size: 48px;
		line-height: 70px;
	}
	.name {
		font-weight: 800;
		font-size: 24px;
	}
	.cat-descr {
		font-size: 14px;
	}
	#note {
		font-size: 12px;
		color: #fff;
	}
</style>
