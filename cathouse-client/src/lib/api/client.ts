import { env } from '$env/dynamic/public';

const MISSING_API_BASE_URL_MESSAGE =
	'Missing PUBLIC_API_URL. Please set it in your environment.';

/**
 * Returns the configured API base URL from public environment variables.
 * Trailing slashes are removed to keep request URL composition consistent.
 *
 * @throws {Error} If `PUBLIC_API_URL` is missing or empty.
 */
export function getApiBaseUrl() {
	const baseUrl = env.PUBLIC_API_URL?.trim();
	if (!baseUrl) {
		throw new Error(MISSING_API_BASE_URL_MESSAGE);
	}

	return baseUrl.replace(/\/+$/, '');
}

/**
 * Builds an absolute API URL for a given endpoint path.
 * Adds a leading slash to the path when needed.
 *
 * @example
 * createUrl("cats");
 * // => "<api-base-url>/cats"
 */
function createUrl(path: string) {
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${getApiBaseUrl()}${normalizedPath}`;
}

/**
 * Performs a GET request and parses the JSON response.
 *
 * @template T Expected response shape.
 * @param path API endpoint path (for example `/cats`).
 * @returns Parsed JSON payload typed as `T`.
 * @throws {Error} If the request fails or returns a non-2xx status.
 */
export async function getJson<T>(path: string): Promise<T> {
	const response = await fetch(createUrl(path));
	if (!response.ok) {
		throw new Error(`Request failed (${response.status}): ${path}`);
	}

	return (await response.json()) as T;
}
