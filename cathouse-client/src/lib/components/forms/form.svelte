<script lang="ts">
	import Icon from '../icon.svelte';
	import Spacer from '../spacer.svelte';

	export let zIndex: number = 1;
	export let title: string;

	export let close: () => void;
</script>

<div class="form-bg" style:z-index={zIndex} on:click={close}></div>
<div class="form-wrapper" style:z-index={zIndex + 1} on:click|stopPropagation>
	<div class="form-container col" on:click={() => {}}>
		<div class="row form-title">
			<h3 style="flex: 1">{title}</h3>
			<Icon icon="close" on:click={close} />
		</div>
		<Spacer height={16} />
		<div class="form-content">
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
