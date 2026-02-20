<script lang="ts">
	import { onMount } from 'svelte';
	import { rand } from '$lib/helpers/number.helper';

	import Sidebar from '$lib/components/sidebar.svelte';
	import BottomBar from '$lib/components/BottomBar.svelte';
	import Kitty from '$lib/components/kitty.svelte';
	import { createCat, getCats, getTotalDonations, type CatApiResponse } from '$lib/api/cats';
	import { CatState } from '$lib/constants/cat.sprites';
	import { Cat } from '$lib/models/cat';
	import Participate from '$lib/components/modals/participate/Participate.svelte';
	import Success from '$lib/components/modals/success/Success.svelte';
	import MoreModal from '$lib/components/modals/more/MoreModal.svelte';
	import {
		BOTTOMBAR_HEIGHT,
		CAT_SIZE_DIVISOR,
		CAT_SIZE_MAX,
		CAT_SIZE_MIN,
		SIDEBAR_BREAKPOINT,
		SIDEBAR_WIDTH
	} from '$lib/constants/layout';

	$: catSize = Math.min(Math.max(worldWidth / CAT_SIZE_DIVISOR, CAT_SIZE_MIN), CAT_SIZE_MAX);

	let world: HTMLDivElement;
	let overlay: HTMLDivElement;
	let cats: Cat[] = [];
	let totalDonation = 0;
	let focusedCat: Cat | null = null;
	let animationFrameId: number;

	let worldWidth = 0;
	let worldHeight = 0;
	let windowWidth = 0;

	let showParticipate = false;
	let newCat: Cat | null = null;
	let showLearnMore = false;

	function openDonationOptions() {
		window.open(
			'https://www.tierheim-starnberg.de/helfen-und-spenden/spenden/',
			'_blank',
			'noopener,noreferrer'
		);
	}

	function createCatFromApi(cat: CatApiResponse, worldWidth: number, worldHeight: number): Cat {
		const x = rand(0, worldWidth - catSize);
		const y = rand(0, worldHeight - catSize);
		return new Cat(cat.id, cat.name, x, y, cat.donation, cat.type, cat.donor ?? undefined);
	}

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
		await loadTotalDonationsFromApi();
	}

	async function loadCatsFromApi(worldWidth: number, worldHeight: number) {
		try {
			const data = await getCats();
			if (!Array.isArray(data)) {
				throw new Error('Invalid cats response format');
			}

			return data.map((cat) => createCatFromApi(cat, worldWidth, worldHeight));
		} catch (error) {
			console.error(error);
			return null;
		}
	}

	async function loadTotalDonationsFromApi() {
		try {
			const total = await getTotalDonations();
			totalDonation = total;
		} catch (error) {
			console.error(error);
		}
	}

	function updateCat(cat: Cat, deltaTime: number, worldWidth: number, worldHeight: number) {
		cat.stateTimer -= deltaTime;
		if (cat.stateTimer <= 0) {
			cat.updateState();
		}
		cat.respectBoundaries(worldWidth - catSize, worldHeight - catSize);
		cat.move(deltaTime);
	}

	function focusCat(cat: Cat) {
		cat.updateState(CatState.CUDDLE);
		focusedCat = cat;
		overlay.style.zIndex = `${worldHeight + 1}`;
	}

	function clearFocus() {
		focusedCat = null;
		overlay.style.zIndex = `-100`;
	}

	onMount(() => {
		windowWidth = window.innerWidth;
		worldWidth = world.clientWidth;
		worldHeight = world.clientHeight;
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.get('resumeParticipate') === '1') {
			showParticipate = true;
			searchParams.delete('resumeParticipate');
			const nextSearch = searchParams.toString();
			const nextUrl = `${window.location.pathname}${nextSearch.length > 0 ? `?${nextSearch}` : ''}${window.location.hash}`;
			window.history.replaceState(window.history.state, '', nextUrl);
		}

		loadCatsFromApi(worldWidth, worldHeight).then((apiCats) => {
			if (apiCats != null) {
				cats = apiCats;
				return;
			}
			cats = [];
		});
		loadTotalDonationsFromApi();

		let last = performance.now();
		let running = true;

		function loop(currentTime: number) {
			if (!running) return;
			const deltaTime = (currentTime - last) / 1000; // in seconds
			last = currentTime;

			worldWidth = world.clientWidth;
			worldHeight = world.clientHeight;

			for (const cat of cats) {
				updateCat(cat, deltaTime, worldWidth, worldHeight);
			}

			cats = [...cats];
			animationFrameId = requestAnimationFrame(loop);
		}

		animationFrameId = requestAnimationFrame(loop);

		const handleResize = () => {
			worldWidth = world.clientWidth;
			worldHeight = world.clientHeight;
			windowWidth = window.innerWidth;
		};
		window.addEventListener('resize', handleResize);

		return () => {
			running = false;
			cancelAnimationFrame(animationFrameId);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div style={`--sidebar-width: ${SIDEBAR_WIDTH}px; --bottombar-height: ${BOTTOMBAR_HEIGHT}px;`}>
	{#if windowWidth > SIDEBAR_BREAKPOINT}
		<div class="world-wrapper row">
			<div class="world" bind:this={world}>
				{#each cats as cat (cat.id)}
					<Kitty
						{cat}
						size={catSize}
						focused={focusedCat?.id === cat.id}
						maxY={worldHeight}
						on:click={() => {
							cat === focusedCat ? clearFocus() : focusCat(cat);
						}}
					/>
				{/each}
				<div
					class="overlay"
					bind:this={overlay}
					on:click={() => {
						clearFocus();
					}}
				></div>
			</div>
			<Sidebar
				donation={totalDonation}
				cat={focusedCat}
				{cats}
				searchTerm={focusedCat ? focusedCat.name : ''}
				clear={() => clearFocus()}
				select={(term) => {
					const idx = cats.findIndex((el) =>
						el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
					);
					if (idx < 0) return false;
					focusCat(cats[idx]);
					return true;
				}}
				openParticipate={() => (showParticipate = true)}
				openLearnMore={() => (showLearnMore = true)}
			/>
		</div>
	{:else}
		<BottomBar
			donation={totalDonation}
			zIndex={worldHeight + 20}
			{cats}
			cat={focusedCat}
			searchTerm={focusedCat ? focusedCat.name : ''}
			clear={() => clearFocus()}
			select={(term) => {
				const idx = cats.findIndex((el) =>
					el.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
				);
				if (idx < 0) return false;
				focusCat(cats[idx]);
				return true;
			}}
			openParticipate={() => (showParticipate = true)}
			openDonationOptions={openDonationOptions}
			openLearnMore={() => (showLearnMore = true)}
		/>
		<div class="world-wrapper col">
			<div class="world" bind:this={world}>
				{#each cats as cat (cat.id)}
					<Kitty
						{cat}
						size={catSize}
						focused={focusedCat?.id === cat.id}
						maxY={worldHeight}
						on:click={() => {
							cat === focusedCat ? clearFocus() : focusCat(cat);
						}}
					/>
				{/each}
				<div
					class="overlay"
					bind:this={overlay}
					on:click={() => {
						clearFocus();
					}}
				></div>
			</div>
			<div class="bottombar-pad"></div>
		</div>
	{/if}
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
		<MoreModal zIndex={worldHeight + 50} close={() => (showLearnMore = false)} />
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
	.overlay {
		top: 0;
		left: 0;
		background: var(--color-bg);
		width: 100%;
		height: 100%;
		position: absolute;
		opacity: 0.75;
		z-index: -100;
	}
</style>
