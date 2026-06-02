<script lang="ts">
	import { onMount, tick } from 'svelte';

	import Sidebar from '$lib/components/Sidebar.svelte';
	import BottomBar from '$lib/components/BottomBar.svelte';
	import CatWorld from '$lib/components/CatWorld.svelte';
	import { createCat } from '$lib/api/cats';
	import { CatState } from '$lib/constants/cat.sprites';
	import { Cat } from '$lib/models/cat';
	import {
		createCatFromApi,
		loadCatsFromApi,
		loadTotalDonationsFromApi
	} from '$lib/features/home/cat-data';
	import Participate from '$lib/components/modals/participate/Participate.svelte';
	import Success from '$lib/components/modals/success/Success.svelte';
	import MoreModal from '$lib/components/modals/more/MoreModal.svelte';
	import {
		BOTTOMBAR_HEIGHT,
		SIDEBAR_BREAKPOINT,
		SIDEBAR_WIDTH
	} from '$lib/constants/layout';
	import { calculateCatSize } from '$lib/helpers/layout.helper';

	$: catSize = calculateCatSize(worldWidth);
	$: isDesktop = windowWidth > SIDEBAR_BREAKPOINT;

	let world: HTMLDivElement;
	let cats: Cat[] = [];
	let totalDonation = 0;
	let selectedCat: Cat | null = null;
	let animationFrameId: number;

	let worldWidth = 0;
	let worldHeight = 0;
	let windowWidth = 0;

	let showParticipate = false;
	let newCat: Cat | null = null;
	let showLearnMore = false;

	async function saveCat(cat: Cat) {
		const created = await createCat({
			type: cat.type,
			name: cat.name,
			donation: cat.donation,
			donor: cat.donor
		});

		const createdCat = createCatFromApi(created, worldWidth, worldHeight);
		cats = [createdCat, ...cats];
		newCat = createdCat;
		const total = await loadTotalDonationsFromApi();
		if (total != null) {
			totalDonation = total;
		}
	}

function selectCat(cat: Cat) {
		cat.updateState(CatState.CUDDLE);
		selectedCat = cat;
	}

	function clearSelection() {
		selectedCat = null;
	}

	function selectCatBySearchTerm(term: string) {
		const idx = cats.findIndex((el) =>
			el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
		);
		if (idx < 0) return false;
		selectCat(cats[idx]);
		return true;
	}

	function toggleSelectionOnCat(cat: Cat) {
		selectedCat?.id === cat.id ? clearSelection() : selectCat(cat);
	}

	function handleResumeParticipateFromUrl() {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get('resumeParticipate') !== '1') return;

		showParticipate = true;
		searchParams.delete('resumeParticipate');
		const nextSearch = searchParams.toString();
		const nextUrl = `${window.location.pathname}${nextSearch.length > 0 ? `?${nextSearch}` : ''}${window.location.hash}`;
		window.history.replaceState(window.history.state, '', nextUrl);
	}

	function syncWindowWidth() {
		windowWidth = window.innerWidth;
	}

	function syncWorldDimensions() {
		worldWidth = world.clientWidth;
		worldHeight = world.clientHeight;
	}

	async function loadInitialData() {
		const [apiCats, total] = await Promise.all([
			loadCatsFromApi(worldWidth, worldHeight),
			loadTotalDonationsFromApi()
		]);
		cats = apiCats != null ? apiCats : [];
		if (total != null) {
			totalDonation = total;
		}
	}

	function setupAnimationLoop() {
		let last = performance.now();
		let running = true;

		function loop(currentTime: number) {
			if (!running) return;
			const deltaTime = (currentTime - last) / 1000; // in seconds
			last = currentTime;

			for (const cat of cats) {
				cat.tick(deltaTime, worldWidth - catSize, worldHeight - catSize);
			}

			cats = [...cats];
			animationFrameId = requestAnimationFrame(loop);
		}

		animationFrameId = requestAnimationFrame(loop);

		return () => {
			running = false;
			cancelAnimationFrame(animationFrameId);
		};
	}

	function setupWindowListeners() {
		const handleResize = () => {
			syncWindowWidth()
			syncWorldDimensions()
		};
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape' || selectedCat == null) return;
			clearSelection();
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}

	onMount(() => {
		handleResumeParticipateFromUrl();
		syncWindowWidth()

		tick().then(() => {
			syncWorldDimensions();
			void loadInitialData();
		});

		const stopAnimationLoop = setupAnimationLoop();
		const stopWindowListeners = setupWindowListeners();

		return () => {
			stopAnimationLoop();
			stopWindowListeners();
		};
	});
</script>

<div style={`--sidebar-width: ${SIDEBAR_WIDTH}px; --bottombar-height: ${BOTTOMBAR_HEIGHT}px;`}>
	{#if !isDesktop}
		<BottomBar
			donation={totalDonation}
			zIndex={worldHeight + 20}
			{cats}
			cat={selectedCat}
			searchTerm={selectedCat ? selectedCat.name : ''}
			clear={() => clearSelection()}
			select={selectCatBySearchTerm}
			openParticipate={() => (showParticipate = true)}
			openLearnMore={() => (showLearnMore = true)}
		/>
	{/if}
	<div class="world-wrapper" class:row={isDesktop} class:col={!isDesktop}>
		<div class="world" bind:this={world}>
			<CatWorld
				{cats}
				{catSize}
				{worldHeight}
				selectedCatId={selectedCat?.id ?? null}
				overlayZIndex={selectedCat != null ? worldHeight + 1 : -100}
				onCatClick={toggleSelectionOnCat}
				onBackgroundClick={clearSelection}
			/>
		</div>
		{#if isDesktop}
			<Sidebar
				donation={totalDonation}
				cat={selectedCat}
				{cats}
				searchTerm={selectedCat ? selectedCat.name : ''}
				clear={() => clearSelection()}
				select={selectCatBySearchTerm}
				openParticipate={() => (showParticipate = true)}
				openLearnMore={() => (showLearnMore = true)}
			/>
		{:else}
			<div class="bottombar-pad"></div>
		{/if}
	</div>
	{#if showParticipate}
		<Participate
			zIndex={worldHeight + 50}
			close={() => (showParticipate = false)}
			onSaved={saveCat}
		/>
	{/if}
	{#if newCat != null}
		<Success zIndex={worldHeight + 50} close={() => (newCat = null)} cat={newCat} />
	{/if}
	{#if showLearnMore}
		<MoreModal zIndex={worldHeight + 50} close={() => (showLearnMore = false)} {cats} />
	{/if}
</div>

<style>
	.world-wrapper {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		background: var(--color-bg);
	}
	.bottombar-pad {
		height: var(--bottombar-height);
		width: 100%;
	}
	.world {
		flex: 1 1 auto;
		position: relative;
	}
</style>
