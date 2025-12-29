<script lang="ts">
	import Search from '$lib/components/search.svelte';
	import Button from '$lib/components/button.svelte';
	import TierheimLogo from '$lib/assets/images/tierheim-starnberg-logo.png';
	import Spacer from './spacer.svelte';
	const SIDEBAR_WIDTH = 450;
	let searchTerm = '';
</script>

<div style={`--sidebar-width: ${SIDEBAR_WIDTH}px`} id="sidebar" class="col">
	<Search {searchTerm} placeholder="Katze suchen" />
	<div class="col">
		<Spacer height={24} />
		<img id="logo" src={TierheimLogo} alt="Logo Tierheim Starnberg" />
		<Spacer height={16} />
		<p style="text-align: center; color: #fff">
			Jede Katze auf dieser Webseite bedeutet eine Spende für das neue Katzenhaus im Tierheim
			Starnberg!
		</p>
		<Spacer height={16} />
		<Button widthCss="100%" text="Mitmachen!" primary />
		<Spacer height={16} />
		<Button widthCss="100%" text="Spendenmöglichkeiten" />
		<Spacer height={16} />
		<Button widthCss="100%" text="mehr erfahren" />
		<Spacer height={24} />
	</div>
	<div class="col">
		<div id="donation" class="col">
			<div>bereits gesammelt*:</div>
			<span>23,50€</span>
		</div>
		<p id="note">
			*Gesammelter Betrag beruht auf der Annahme, dass von Teilnehmern keine falschen Angeben
			gemacht wurden.
		</p>
	</div>
</div>

<style>
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
	}
	#donation {
		width: 100%;
		padding: 24px;
		background-color: #015b20;
		border-radius: 16px;
		box-sizing: border-box;
		color: #fff;
	}
	#donation span {
		font-weight: 800;
		font-size: 48px;
		line-height: 70px;
	}
	#note {
		font-size: 12px;
		color: #fff;
	}
</style>
