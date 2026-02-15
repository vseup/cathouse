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
	return requestJson<T>(path);
}

/**
 * Performs a POST request with a JSON payload and parses the JSON response.
 *
 * @template T Expected response shape.
 * @param path API endpoint path (for example `/cats`).
 * @param body Request payload object.
 * @returns Parsed JSON payload typed as `T`.
 * @throws {Error} If the request fails or returns a non-2xx status.
 */
export async function postJson<T>(path: string, body: unknown): Promise<T> {
	return requestJson<T>(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(body)
	});
}

async function requestJson<T>(path: string, options?: RequestInit): Promise<T> {
	const response = await fetch(createUrl(path), options);
	const payload = await parseJsonOrNull(response);

	if (!response.ok) {
		const errorMessage = buildHttpErrorMessage(response.status, path, payload);
		throw new Error(errorMessage);
	}

	return payload as T;
}

function buildHttpErrorMessage(status: number, path: string, payload: unknown) {
	if (
		payload != null &&
		typeof payload === 'object' &&
		'message' in payload &&
		payload.message != null
	) {
		if (Array.isArray(payload.message)) {
			return `Request failed (${status}): ${payload.message.join(', ')}`;
		}
		if (typeof payload.message === 'string') {
			return `Request failed (${status}): ${payload.message}`;
		}
	}

	return `Request failed (${status}): ${path}`;
}

async function parseJsonOrNull(response: Response): Promise<unknown> {
	const contentType = response.headers.get('content-type') ?? '';
	if (!contentType.includes('application/json')) {
		return null;
	}

	return await response.json();
}
