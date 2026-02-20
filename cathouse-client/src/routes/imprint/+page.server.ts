import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

function getEnvValue(key: string): string {
	return env[key]?.trim() ?? '';
}

export const load: PageServerLoad = async () => {
	return {
		ownerName: getEnvValue('LEGAL_IMPRINT_OWNER_NAME'),
		street: getEnvValue('LEGAL_IMPRINT_STREET'),
		houseNumber: getEnvValue('LEGAL_IMPRINT_HOUSE_NUMBER'),
		postalCode: getEnvValue('LEGAL_IMPRINT_POSTAL_CODE'),
		city: getEnvValue('LEGAL_IMPRINT_CITY'),
		phone: getEnvValue('LEGAL_IMPRINT_PHONE'),
		email: getEnvValue('LEGAL_IMPRINT_EMAIL')
	};
};
