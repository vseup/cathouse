import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const allowedHostsFromEnv = process.env.ALLOWED_HOSTS?.split(',')
	.map((host) => host.trim())
	.filter((host) => host.length > 0);

const allowedHosts =
	allowedHostsFromEnv != null && allowedHostsFromEnv.length > 0
		? allowedHostsFromEnv
		: ['localhost', '127.0.0.1', 'cats.verenapues.com'];

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts
	},
	preview: {
		allowedHosts
	}
});
