import { getCats, getTotalDonations, type CatApiResponse } from '$lib/api/cats';
import { CAT_SIZE_DIVISOR, CAT_SIZE_MAX, CAT_SIZE_MIN } from '$lib/constants/layout';
import { rand } from '$lib/helpers/number.helper';
import { Cat } from '$lib/models/cat';

export function createCatFromApi(
	cat: CatApiResponse,
	worldWidth: number,
	worldHeight: number
): Cat {
	const catSize = Math.min(Math.max(worldWidth / CAT_SIZE_DIVISOR, CAT_SIZE_MIN), CAT_SIZE_MAX);
	const x = rand(0, worldWidth - catSize);
	const y = rand(0, worldHeight - catSize);
	const createdAt = new Date(cat.createdAt);
	return new Cat(
		cat.id,
		cat.name,
		x,
		y,
		cat.donation,
		cat.type,
		cat.donor ?? undefined,
		Number.isNaN(createdAt.getTime()) ? new Date() : createdAt
	);
}

export async function loadCatsFromApi(
	worldWidth: number,
	worldHeight: number
) {
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

export async function loadTotalDonationsFromApi() {
	try {
		return await getTotalDonations();
	} catch (error) {
		console.error(error);
		return null;
	}
}
