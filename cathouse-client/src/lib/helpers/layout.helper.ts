import {
    CAT_SIZE_DIVISOR,
    CAT_SIZE_MIN,
    CAT_SIZE_MAX
} from '$lib/constants/layout';

export function calculateCatSize(worldWidth: number): number {
    return Math.min(Math.max(worldWidth / CAT_SIZE_DIVISOR, CAT_SIZE_MIN), CAT_SIZE_MAX);
}