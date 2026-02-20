<script lang="ts">
	import { onMount } from 'svelte';
	import Search from '$lib/components/inputs/Search.svelte';
	import Button from '$lib/components/controls/Button.svelte';
	import IconButton from '$lib/components/controls/IconButton.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import TierheimLogo from '$lib/assets/images/tierheim-starnberg-logo.png';
	import type { Cat } from '$lib/models/cat';
	import { toEur } from '$lib/helpers/number.helper';

	export let donation: number;
	export let zIndex: number = 20;
	export let cats: Cat[];
	export let cat: Cat | null = null;
	export let searchTerm: string = '';
	export let clear: () => void;
	export let select: (term: string) => boolean;
	export let openParticipate: () => void;
	export let openLearnMore: () => void;

	let expanded = false;
	let dragging = false;
	let dragStartY: number | null = null;
	let dragStartHeight = 0;
	let suppressNextClick = false;
	let sheetElement: HTMLDivElement;
	let lastAutoExpandedCat: Cat | null = null;

	let collapsedHeight = 220;
	let expandedHeight = 220;
	let sheetHeight = 220;

	const CLICK_SUPPRESS_DRAG_THRESHOLD = 10;
	const EXPAND_SNAP_RATIO = 0.45;

	$: showExpandedContent = sheetHeight > collapsedHeight + 40;
	$: if (cat != null && cat !== lastAutoExpandedCat) {
		expanded = true;
		lastAutoExpandedCat = cat;
		if (!dragging) {
			sheetHeight = expandedHeight;
		}
	}
	$: if (cat == null) {
		lastAutoExpandedCat = null;
	}

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}

	function updateHeights() {
		if (!sheetElement) return;

		const styles = getComputedStyle(sheetElement);
		const cssCollapsedHeight = parseFloat(styles.getPropertyValue('--bottombar-height'));
		if (!Number.isNaN(cssCollapsedHeight)) {
			collapsedHeight = cssCollapsedHeight;
		}

		expandedHeight = Math.min(window.innerHeight - 24, 760);
		if (expandedHeight < collapsedHeight) {
			expandedHeight = collapsedHeight;
		}

		if (dragging) {
			sheetHeight = clamp(sheetHeight, collapsedHeight, expandedHeight);
			return;
		}

		sheetHeight = expanded ? expandedHeight : collapsedHeight;
	}

	function toggleExpanded() {
		expanded = !expanded;
		sheetHeight = expanded ? expandedHeight : collapsedHeight;
	}

	function collapse() {
		expanded = false;
		sheetHeight = collapsedHeight;
	}

	function onHandleClick() {
		if (suppressNextClick) {
			suppressNextClick = false;
			return;
		}
		toggleExpanded();
	}

	function onHandlePointerDown(event: PointerEvent) {
		dragging = true;
		dragStartY = event.clientY;
		dragStartHeight = sheetHeight;
		(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	}

	function onHandlePointerMove(event: PointerEvent) {
		if (!dragging || dragStartY === null) return;

		const deltaY = event.clientY - dragStartY;
		if (Math.abs(deltaY) > CLICK_SUPPRESS_DRAG_THRESHOLD) {
			suppressNextClick = true;
		}
		sheetHeight = clamp(dragStartHeight - deltaY, collapsedHeight, expandedHeight);
	}

	function stopHandleDrag(event: PointerEvent) {
		if (!dragging) return;

		dragging = false;
		if ((event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) {
			(event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
		}

		const snapThreshold = collapsedHeight + (expandedHeight - collapsedHeight) * EXPAND_SNAP_RATIO;
		expanded = sheetHeight >= snapThreshold;
		sheetHeight = expanded ? expandedHeight : collapsedHeight;
		dragStartY = null;
	}

	function onWindowPointerDown(event: PointerEvent) {
		if (!expanded || dragging || !sheetElement) return;

		const target = event.target;
		if (!(target instanceof Node)) return;
		if (sheetElement.contains(target)) return;

		collapse();
	}

	onMount(() => {
		updateHeights();
		const onResize = () => updateHeights();
		window.addEventListener('resize', onResize);
		window.addEventListener('pointerdown', onWindowPointerDown);

		return () => {
			window.removeEventListener('resize', onResize);
			window.removeEventListener('pointerdown', onWindowPointerDown);
		};
	});
</script>

<div
	bind:this={sheetElement}
	class="bottombar col {dragging ? 'dragging' : ''} {expanded ? 'expanded-state' : ''}"
	style={`z-index: ${zIndex}; height: ${sheetHeight}px;`}
>
	<button
		class="handle-trigger"
		on:click={onHandleClick}
		on:pointerdown={onHandlePointerDown}
		on:pointermove={onHandlePointerMove}
		on:pointerup={stopHandleDrag}
		on:pointercancel={stopHandleDrag}
		aria-label={expanded ? 'Bottom bar einklappen' : 'Bottom bar ausklappen'}
	>
		<div class="handle"></div>
	</button>

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
				<div class="cat-details col">
					<span class="cat-name">{cat.name}</span>
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
			<Spacer height={24} />
			{#if !cat}
				<img id="logo" src={TierheimLogo} alt="Logo Tierheim Starnberg" />
				<Spacer height={24} />
			{/if}
			{#if !cat}
				<p class="description">
					Jede Katze bedeutet eine Spende für das neue Katzenhaus im Tierheim Starnberg!
				</p>
				<Spacer height={24} />
			{/if}
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
				<p id="note">
					*Gesammelter Betrag beruht auf der Annahme, dass von Teilnehmern keine falschen Angaben
					gemacht wurden.
				</p>
				<Spacer height={10} />
				<div class="legal-links row">
					<a href="/privacy">Datenschutz</a>
					<span>|</span>
					<a href="/imprint">Impressum</a>
				</div>
			</div>
		{:else}
			<div class="content col collapsed-content">
			{#if !cat}
				<p class="description">
					Jede Katze bedeutet eine Spende für das neue Katzenhaus im Tierheim Starnberg!
				</p>
				<Spacer height={20} />
			{/if}
			<div class="row actions">
				<div class="cta-wrapper">
					<Button widthCss="100%" primary on:click={openParticipate}>Mitmachen!</Button>
				</div>
				<Spacer width={16} />
				<IconButton icon="more_vert" on:click={toggleExpanded} />
				</div>
				<Spacer height={14} />
				<div class="collapsed-donation">bereits gesammelt*: <b>{toEur(donation)}</b></div>
				<Spacer height={8} />
				<div class="legal-links row">
					<a href="/privacy">Datenschutz</a>
					<span>|</span>
					<a href="/imprint">Impressum</a>
				</div>
			</div>
		{/if}
	</div>

<style>
	.bottombar {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: var(--color-green);
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		box-sizing: border-box;
		padding: 8px 24px 20px;
		overflow: hidden;
		transition:
			height 420ms cubic-bezier(0.32, 0.72, 0, 1),
			box-shadow 280ms ease;
		box-shadow: 0 -8px 24px rgba(0, 0, 0, 0.22);
	}
	.dragging {
		transition: none;
	}
	.expanded-state {
		box-shadow: 0 -12px 32px rgba(0, 0, 0, 0.28);
	}
	.handle-trigger {
		width: 100%;
		background: none;
		border: none;
		display: flex;
		justify-content: center;
		padding: 8px 0 14px;
		cursor: pointer;
		touch-action: none;
	}
	.handle {
		width: 82px;
		height: 5px;
		border-radius: 4px;
		background-color: rgba(255, 255, 255, 0.35);
	}
	.content {
		width: 100%;
		align-items: center;
	}
	.expanded-content {
		height: calc(100% - 32px);
		overflow-y: auto;
		padding-bottom: 8px;
	}
	#logo {
		width: 22%;
		height: auto;
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
	}
	.cta-wrapper {
		flex: 1;
	}
	.collapsed-donation {
		font-size: 14px;
		color: var(--color-text-light);
		text-align: center;
	}
	.cat-details {
		width: 100%;
		padding: 24px;
		background-color: var(--color-green-darken-1);
		border-radius: 16px;
		box-sizing: border-box;
		color: var(--color-text-light);
		align-items: center;
		text-align: center;
	}
	.cat-name {
		font-weight: 800;
		font-size: 24px;
	}
	.cat-img {
		width: 35%;
		height: auto;
		image-rendering: pixelated;
	}
	.cat-descr {
		font-size: 14px;
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
		#note {
			font-size: 12px;
			color: var(--color-text-light);
		}
		.legal-links {
			gap: 8px;
			font-size: 12px;
			color: var(--color-text-light);
			justify-content: center;
			width: 100%;
		}
		.legal-links a {
			color: var(--color-text-light);
			text-decoration: underline;
		}
		.legal-links a:visited {
			color: var(--color-text-light);
		}
	</style>
