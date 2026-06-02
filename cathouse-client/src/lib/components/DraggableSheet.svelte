<script lang="ts">
	import { onMount } from 'svelte';

	export let zIndex: number = 20;
	export let expanded: boolean = false;
	export let oncollapse: (() => void) | undefined = undefined;

	let dragging = false;
	let dragStartY: number | null = null;
	let dragStartHeight = 0;
	let suppressNextClick = false;
	let sheetElement: HTMLDivElement;

	let collapsedHeight = 220;
	let expandedHeight = 220;
	let sheetHeight = 220;

	const CLICK_SUPPRESS_DRAG_THRESHOLD = 10;
	const EXPAND_SNAP_RATIO = 0.45;

	$: showExpandedContent = sheetHeight > collapsedHeight + 40;
	$: if (expanded && !dragging) sheetHeight = expandedHeight;

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

	function collapse() {
		expanded = false;
		sheetHeight = collapsedHeight;
		oncollapse?.();
	}

	function toggleExpanded() {
		if (expanded) {
			collapse();
			return;
		}
		expanded = true;
		sheetHeight = expandedHeight;
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
		if (sheetHeight >= snapThreshold) {
			expanded = true;
			sheetHeight = expandedHeight;
		} else {
			collapse();
		}
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
	class="sheet col {dragging ? 'dragging' : ''} {expanded ? 'expanded-state' : ''}"
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
	<slot {showExpandedContent} />
</div>

<style>
	.sheet {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: var(--color-green);
		border-top-left-radius: 24px;
		border-top-right-radius: 24px;
		box-sizing: border-box;
		padding: 8px 24px 0px;
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
		align-items: center;
		min-height: 52px;
		padding: 12px 0 18px;
		cursor: pointer;
		touch-action: none;
	}
	.handle {
		width: 96px;
		height: 6px;
		border-radius: 4px;
		background-color: rgba(255, 255, 255, 0.35);
	}
</style>
