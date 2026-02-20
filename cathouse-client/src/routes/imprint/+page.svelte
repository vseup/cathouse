<script lang="ts">
	let { data } = $props();

	const addressLine1 = [data.street, data.houseNumber].filter(Boolean).join(', ');
	const addressLine2 = [data.postalCode, data.city].filter(Boolean).join(' ');
</script>

<svelte:head>
	<title>Imprint | Cat House</title>
</svelte:head>

<main class="legal-page">
	<h1>Imprint</h1>
	<p class="back-link"><a href="/">Zurück zur Startseite</a></p>
	<p>Angaben gemäß §5 TMG</p>
	<p>
		{data.ownerName}<br />
		{addressLine1}<br />
		{addressLine2}
	</p>

	<h2>Kontakt</h2>
	<p>
		Telefon:
		{#if data.phone}<a href={`tel:${data.phone}`}>{data.phone}</a>{:else}-{/if}
		<br />
		E-Mail:
		{#if data.email}<a href={`mailto:${data.email}`}>{data.email}</a>{:else}-{/if}
	</p>

	<p class="source">
		Quelle:
		<a href="https://www.e-recht24.de/">https://www.e-recht24.de/</a>
	</p>
</main>

<style>
	.legal-page {
		max-width: 900px;
		margin: 0 auto;
		padding: 48px 24px 72px;
		box-sizing: border-box;
	}
	h1 {
		margin: 0 0 24px;
	}
	h2 {
		margin: 24px 0 12px;
		font-size: 20px;
	}
	p {
		line-height: 1.6;
		margin: 0 0 16px;
	}
	.source {
		margin-top: 24px;
		font-size: 14px;
	}
	.back-link {
		margin-bottom: 20px;
	}
</style>
