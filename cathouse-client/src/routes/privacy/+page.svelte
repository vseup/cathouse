<script lang="ts">
	let { data } = $props();

	const addressLine1 = [data.street, data.houseNumber].filter(Boolean).join(' ');
	const addressLine2 = [data.postalCode, data.city].filter(Boolean).join(' ');
	const hostingProvider = data.hostingProvider || '-';
	const dataRetentionPeriod = data.dataRetentionPeriod || 'bis der Zweck entfällt';
	const complaintAuthority = data.complaintAuthority || '-';
</script>

<svelte:head>
	<title>Datenschutzerklärung | Cat House</title>
</svelte:head>

<main class="legal-page">
	<h1>Datenschutzerklärung</h1>
	<p class="back-link">
		<a href={data.showReturnToParticipate ? '/?resumeParticipate=1' : '/'}
			>{data.showReturnToParticipate ? 'Zurück zum Formular' : 'Zurück zur Startseite'}</a
		>
	</p>

	<h2>1. Datenschutz auf einen Blick</h2>
	<h3>Allgemeine Hinweise</h3>
	<p>
		Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
		Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
		denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema
		Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
	</p>

	<h3>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
	<p>
		Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
		können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle“ in dieser Datenschutzerklärung
		entnehmen.
	</p>

	<h3>Wie erfassen wir Ihre Daten?</h3>
	<p>
		Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
		z. B. um Daten handeln, die Sie in ein Formular eingeben.
	</p>
	<p>
		Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch
		unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
		Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
		sobald Sie diese Website betreten.
	</p>

	<h3>Wofür nutzen wir Ihre Daten?</h3>
	<p>
		Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
		gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
	</p>

	<h3>Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
	<p>
		Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
		gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die
		Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
		Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft
		widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der
		Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein
		Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
	</p>
	<p>
		Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
	</p>

	<h2>2. Hosting</h2>
	<p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>

	<h3>Externes Hosting</h3>
	<p>
		Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst
		werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich vor allem um
		IP-Adressen, Meta- und Kommunikationsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige
		Daten, die über eine Website generiert werden, handeln.
	</p>
	<p>
		Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
		bestehenden Nutzern (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
		effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6
		Abs. 1 lit. f DSGVO). Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die
		Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und §25 Abs. 1 TDDDG,
		soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im
		Endgerät des Nutzers umfasst. Die Einwilligung ist jederzeit widerrufbar.
	</p>
	<p>
		Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner
		Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.
	</p>
	<p>
		Wir setzen folgenden Hoster ein:<br />
		{hostingProvider}
	</p>

	<h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
	<h3>Datenschutz</h3>
	<p>
		Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
		Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
		Datenschutzvorschriften sowie dieser Datenschutzerklärung.
	</p>
	<p>
		Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
		Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die
		vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
		Sie erläutert auch, wie und zu welchem Zweck das geschieht.
	</p>
	<p>
		Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per
		E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
		Dritte ist nicht möglich.
	</p>

	<h3>Hinweis zur verantwortlichen Stelle</h3>
	<p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
	<p>
		{data.ownerName}<br />
		{addressLine1}<br />
		{addressLine2}
	</p>
	<p>
		Telefon:
		{#if data.phone}<a href={`tel:${data.phone}`}>{data.phone}</a>{:else}-{/if}<br />
		E-Mail:
		{#if data.email}<a href={`mailto:${data.email}`}>{data.email}</a>{:else}-{/if}
	</p>
	<p>
		Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit
		anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
	</p>

	<h3>Speicherdauer</h3>
	<p>
		Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
		verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
		entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur
		Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich
		zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben. Maßgebliche
		Richtdauer in diesem Projekt:
		{dataRetentionPeriod}.
	</p>

	<h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
	<p>
		Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen
		Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Sind Ihre Daten zur Vertragserfüllung oder
		zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf
		Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese
		zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1
		lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses
		nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Sofern Sie in die Speicherung von Cookies oder den
		Zugriff auf Informationen in Ihr Endgerät eingewilligt haben, erfolgt die Datenverarbeitung
		zusätzlich auf Grundlage von §25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
	</p>

	<h3>Empfänger von personenbezogenen Daten</h3>
	<p>
		Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen.
		Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen
		erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im
		Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind,
		wenn wir ein berechtigtes Interesse an der Weitergabe haben oder wenn eine sonstige
		Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir
		personenbezogene Daten nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung
		weiter.
	</p>

	<h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
	<p>
		Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie
		können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum
		Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
	</p>

	<h3>
		Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art.
		21 DSGVO)
	</h3>
	<p>
		Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben
		Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die
		Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen. Werden Ihre personenbezogenen
		Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch
		gegen die Verarbeitung zum Zwecke derartiger Werbung einzulegen.
	</p>

	<h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
	<p>
		Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
		Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde laut Konfiguration:
		{complaintAuthority}.
	</p>

	<h3>Recht auf Datenübertragbarkeit</h3>
	<p>
		Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
		Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
		maschinenlesbaren Format aushändigen zu lassen.
	</p>

	<h3>Auskunft, Berichtigung und Löschung</h3>
	<p>
		Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
		unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
		Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
		dieser Daten.
	</p>

	<h3>Recht auf Einschränkung der Verarbeitung</h3>
	<p>
		Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
		verlangen.
	</p>
	<ul>
		<li>
			Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
			benötigen wir in der Regel Zeit, um dies zu überprüfen.
		</li>
		<li>
			Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie
			statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
		</li>
		<li>
			Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung,
			Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt
			der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
		</li>
		<li>
			Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung
			zwischen Ihren und unseren Interessen vorgenommen werden.
		</li>
	</ul>

	<h3>SSL- bzw. TLS-Verschlüsselung</h3>
	<p>
		Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
		eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
		Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in
		Ihrer Browserzeile.
	</p>

	<h2>4. Datenerfassung auf dieser Website</h2>
	<h3>Anfrage per E-Mail oder Telefon</h3>
	<p>
		Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus
		hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
		Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
		Einwilligung weiter.
	</p>
	<p>
		Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre
		Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
		Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem
		berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6
		Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), sofern diese
		abgefragt wurde.
	</p>
	<p>
		Die von Ihnen an uns übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern,
		Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt.
		Serverseitige technische Logs werden in der Regel für {data.logRetentionDays} Tage aufbewahrt.
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
		margin: 28px 0 12px;
		font-size: 24px;
	}
	h3 {
		margin: 20px 0 8px;
	}
	p {
		line-height: 1.6;
		margin: 0 0 16px;
	}
	ul {
		margin: 0 0 16px;
		padding-left: 20px;
	}
	li {
		margin-bottom: 8px;
		line-height: 1.5;
	}
	.source {
		margin-top: 24px;
		font-size: 14px;
	}
	.back-link {
		margin-bottom: 20px;
	}
</style>
