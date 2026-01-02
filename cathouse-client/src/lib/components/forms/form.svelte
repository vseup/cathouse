<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from '../controls/Icon.svelte';
	import Spacer from '../Spacer.svelte';

	export let zIndex: number = 1;
	export let title: string;

	export let close: () => void;

	let content: HTMLDivElement;
	let scroll: number = 0;
	let maxScroll: number = 0;

	$: showShadowTop = maxScroll > 0 && scroll > 0;
	$: showShadowBottom = maxScroll > 0 && scroll < maxScroll;

	function updateScroll() {
		scroll = content ? content.scrollTop : 0;
		maxScroll = content ? content.scrollHeight - content.clientHeight : 0;
	}

	onMount(() => {
		updateScroll();
	});
</script>

<div class="form-bg" style:z-index={zIndex} on:click={close}></div>
<div class="form-wrapper" style:z-index={zIndex + 1} on:click|stopPropagation>
	<div class="form-container col" on:click={() => {}}>
		<div class="row form-title">
			<h3 style="flex: 1">{title}</h3>
			<Icon icon="close" on:click={close} />
		</div>
		<Spacer height={16} />
		<div
			class="form-content {showShadowTop ? 'shadow-top' : ''} {showShadowBottom
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
	.form-title {
		align-items: start;
		padding: 0px 12px;
		box-sizing: border-box;
	}
	.form-content {
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
	.form-container {
		width: 550px;
		max-width: 100%;
		max-height: calc(100% - 48px);
		background-color: #fff;
		box-sizing: border-box;
		padding: 24px 12px;
		border-radius: 24px;
	}
	.form-wrapper {
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
	.form-bg {
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
