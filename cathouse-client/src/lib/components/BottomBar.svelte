<script lang="ts">
	import Search from '$lib/components/inputs/Search.svelte';
	import Button from '$lib/components/controls/Button.svelte';
	import IconButton from '$lib/components/controls/IconButton.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import type { Cat } from '$lib/models/cat';
	import { toEur } from '$lib/helpers/number.helper';
	import Divider from './Divider.svelte';
	import DraggableSheet from './DraggableSheet.svelte';
	import CatDetails from './CatDetails.svelte';
	import LegalLinks from './LegalLinks.svelte';

	export let donation: number;
	export let zIndex: number = 20;
	export let cats: Cat[];
	export let cat: Cat | null = null;
	export let searchTerm: string = '';
	export let clear: () => void;
	export let select: (term: string) => boolean;
	export let openParticipate: () => void;
	export let openLearnMore: () => void;

	let sheetExpanded = false;
	let lastAutoExpandedCat: Cat | null = null;

	$: if (cat != null && cat !== lastAutoExpandedCat) {
		sheetExpanded = true;
		lastAutoExpandedCat = cat;
	}
	$: if (cat == null) {
		lastAutoExpandedCat = null;
	}
</script>

<DraggableSheet {zIndex} bind:expanded={sheetExpanded} oncollapse={clear} let:showExpandedContent>
	{#if showExpandedContent}
		<div class="content col expanded-content">
			<Search
				bind:searchTerm
				placeholder="Katze suchen"
				showSearchIconWhenEmpty
				{clear}
				{select}
				terms={cats.map((c) => c.name)}
			/>
			{#if cat}
				<Spacer height={16} />
				<CatDetails {cat} />
			{:else}
				<div style="flex: 1"></div>
				<Spacer height={24} />
				<Button widthCss="100%" primary on:click={openParticipate}>Mitmachen!</Button>
				<Spacer height={16} />
				<Button widthCss="100%" on:click={openLearnMore}>mehr erfahren</Button>
				<Spacer height={24} />
				<div style="flex: 1"></div>
				<div class="donation col">
					<div>bereits gesammelt*:</div>
					<span>{toEur(donation)}</span>
				</div>
				<Spacer height={16} />
				<p class="note">
					*Gesammelter Betrag beruht auf der Annahme, dass von Teilnehmenden keine falschen Angaben
					gemacht wurden.
				</p>
			{/if}
		</div>
	{:else}
		<div class="content col collapsed-content">
			{#if !cat}
				<p class="description">
					Jede Katze bedeutet eine Spende für das neue Katzenhaus im Tierheim Starnberg!
				</p>
				<Spacer height={20} />
				<div class="row actions">
					<div class="cta-wrapper">
						<Button widthCss="100%" primary on:click={openParticipate}>Mitmachen!</Button>
					</div>
					<Spacer width={16} />
					<IconButton icon="more_vert" on:click={() => (sheetExpanded = true)} />
				</div>
			{/if}
		</div>
	{/if}
	<Spacer height={8} />
	<Divider color="rgba(255,255,255,0.25)" spacer={16} />
	<p class="note" style="text-align: center;">
		Diese Webseite ist ein privates Unterstützungsprojekt und kein offizieller Auftritt des
		Tierheims Starnberg.
	</p>
	<Divider color="rgba(255,255,255,0.25)" spacer={16} />
	<LegalLinks />
	<Spacer height={18} />
</DraggableSheet>

<style>
	.content {
		width: 100%;
		align-items: center;
	}
	.expanded-content {
		height: calc(100% - 32px);
		overflow-y: auto;
	}
	.description {
		text-align: center;
		color: var(--color-text-light);
		font-size: 18px;
		line-height: 1.35;
	}
	.actions {
		width: 100%;
		align-items: center;
		margin-bottom: -10px;
	}
	.cta-wrapper {
		flex: 1;
	}
	.collapsed-content {
		padding-bottom: 12px;
	}
	.donation {
		width: 100%;
		padding: 24px;
		background-color: var(--color-green-darken-1);
		border-radius: 16px;
		box-sizing: border-box;
		color: var(--color-text-light);
		align-items: center;
	}
	.donation span {
		font-weight: 800;
		font-size: 48px;
		line-height: 70px;
	}
	.note {
		font-size: 12px;
		color: var(--color-text-light);
	}
</style>
