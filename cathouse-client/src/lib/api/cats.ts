import { getJson, postJson } from '$lib/api/client';
import { CatType } from '$lib/constants/cat.sprites';

export type CatApiResponse = {
	id: string;
	type: CatType;
	name: string;
	donor?: string | null;
	donation: number;
};

export type CatApiCreateRequest = {
	type: CatType;
	name: string;
	donor?: string;
	donation: number;
};

export type TotalDonationsApiResponse = {
	totalDonations: number;
};

export async function getCats() {
	return getJson<CatApiResponse[]>('/cats');
}

export async function createCat(payload: CatApiCreateRequest) {
	return postJson<CatApiResponse>('/cats', payload);
}

export async function getTotalDonations() {
	const response = await getJson<TotalDonationsApiResponse>('/cats/total-donations');
	return response.totalDonations;
}
