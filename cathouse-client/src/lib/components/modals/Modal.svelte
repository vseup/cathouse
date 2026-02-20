<script lang="ts">
	import { onMount } from 'svelte';
	import { SIDEBAR_BREAKPOINT } from '$lib/constants/layout';
	import Icon from '../controls/Icon.svelte';
	import Spacer from '../Spacer.svelte';

	export let zIndex: number = 1;
	export let title: string;

	export let close: () => void;

	let content: HTMLDivElement;
	let innerWidth = Number.POSITIVE_INFINITY;
	let scroll: number = 0;
	let maxScroll: number = 0;

	$: isMobileModal = innerWidth < SIDEBAR_BREAKPOINT;
	$: showShadowTop = maxScroll > 0 && scroll > 0;
	$: showShadowBottom = maxScroll > 0 && scroll < maxScroll - 1;

	function updateScroll() {
		scroll = content ? content.scrollTop : 0;
		maxScroll = content ? content.scrollHeight - content.clientHeight : 0;
	}

	onMount(() => {
		updateScroll();
	});
</script>

<div class="modal-bg" style:z-index={zIndex} on:click={close}></div>
<svelte:window bind:innerWidth />
<div class="modal-wrapper {isMobileModal ? 'mobile' : ''}" style:z-index={zIndex + 1} on:click|stopPropagation>
	<div class="modal-container col {isMobileModal ? 'mobile' : ''}" on:click={() => {}}>
		<div class="row modal-title">
			<h3 style="flex: 1">{title}</h3>
			<Spacer width={24} />
			<Icon icon="close" weight={600} on:click={close} />
		</div>
		<Spacer height={16} />
		<div
			class="modal-content {showShadowTop ? 'shadow-top' : ''} {showShadowBottom
				? 'shadow-bottom'
				: ''}"
			bind:this={content}
			on:scroll={updateScroll}
		>
			<slot />
		</div>
	</div>
</div>

<style>
	.modal-title {
		align-items: start;
		padding: 0px 12px;
		box-sizing: border-box;
	}
	.modal-content {
		height: 100%;
		max-height: 100%;
		overflow-y: scroll;
		padding: 0px 12px;
		box-sizing: border-box;
	}
	.shadow-top {
		box-shadow: inset 0 10px 12px -12px rgba(0, 0, 0, 0.35);
	}
	.shadow-bottom {
		box-shadow: inset 0 -10px 12px -12px rgba(0, 0, 0, 0.35);
	}
	.modal-container {
		width: 550px;
		max-width: 100%;
		max-height: calc(100% - 48px);
		background-color: var(--color-bg-light);
		box-sizing: border-box;
		padding: 24px 12px;
		border-radius: 24px;
	}
	.modal-container.mobile {
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		max-height: 100%;
		padding: 24px 12px;
		border-radius: 0;
	}
	.modal-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-wrapper.mobile {
		align-items: stretch;
		justify-content: stretch;
	}
	.modal-bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		width: 100dvw;
		height: 100vh;
		height: 100dvh;
		background: rgba(34, 34, 34, 0.8);
		backdrop-filter: blur(10px);
	}
</style>
