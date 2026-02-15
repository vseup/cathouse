import { getJson } from '$lib/api/client';
import { CatType } from '$lib/constants/cat.sprites';

export type ApiCat = {
	id: string;
	type: CatType;
	name: string;
	donor?: string | null;
	donation: number;
};

export async function getCats() {
	return getJson<ApiCat[]>('/cats');
}
