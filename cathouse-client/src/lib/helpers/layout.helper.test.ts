import { describe, expect, test } from 'vitest';
import { calculateCatSize } from './layout.helper';

describe('calculateCatSize', () => {
	test.each([
		{ worldWidth: 0, expected: 48, label: 'clamps to minimum (48) for zero width' },
		{ worldWidth: 640, expected: 48, label: 'clamps to minimum below threshold' },
		{ worldWidth: 768, expected: 48, label: 'returns minimum at exact lower threshold (768 / 16 = 48)' },
		{ worldWidth: 1024, expected: 64, label: 'scales proportionally within range (1024 / 16 = 64)' },
		{ worldWidth: 1280, expected: 80, label: 'returns maximum at exact upper threshold (1280 / 16 = 80)' },
		{ worldWidth: 1920, expected: 80, label: 'clamps to maximum above threshold' }
	])('$label', ({ worldWidth, expected }) => {
		expect(calculateCatSize(worldWidth)).toBe(expected);
	});
});
