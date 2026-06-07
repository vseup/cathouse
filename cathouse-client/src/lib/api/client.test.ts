import { afterEach, describe, expect, test, vi } from 'vitest';
import { getJson } from './client';

vi.mock('$env/dynamic/public', () => ({
	env: { PUBLIC_API_URL: 'http://test-api' }
}));

function mockFailingFetch(status: number, body: string, contentType = 'application/json') {
	vi.stubGlobal(
		'fetch',
		vi.fn().mockResolvedValue(
			new Response(body, {
				status,
				headers: { 'content-type': contentType }
			})
		)
	);
}

describe('getJson', () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	test('includes string message from JSON error response', async () => {
		mockFailingFetch(404, JSON.stringify({ message: 'Cat not found' }));

		await expect(getJson('/cats/123')).rejects.toThrow('Request failed (404): Cat not found');
	});

	test('joins array messages from validation error response', async () => {
		mockFailingFetch(400, JSON.stringify({ message: ['name must not be empty', 'type must be an enum value'] }));

		await expect(getJson('/cats')).rejects.toThrow(
			'Request failed (400): name must not be empty, type must be an enum value'
		);
	});

	test('falls back to path when JSON payload has no message property', async () => {
		mockFailingFetch(500, JSON.stringify({ error: 'Internal Server Error' }));

		await expect(getJson('/cats')).rejects.toThrow('Request failed (500): /cats');
	});

	test('falls back to path when JSON payload message is null', async () => {
		mockFailingFetch(422, JSON.stringify({ message: null }));

		await expect(getJson('/cats')).rejects.toThrow('Request failed (422): /cats');
	});

	test('falls back to path when response body is empty', async () => {
		mockFailingFetch(503, '', 'text/plain');

		await expect(getJson('/cats')).rejects.toThrow('Request failed (503): /cats');
	});
});
