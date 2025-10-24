export const metadata = {
  title: 'Datenschutzerklärung | My Tech Blog',
  description: 'Datenschutzerklärung und Informationen zum Datenschutz',
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sm:h-16 sm:w-16">
            <svg className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="mb-3 text-3xl font-black text-slate-900 sm:text-5xl">
            Datenschutzerklärung
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Informationen über die Verarbeitung Ihrer personenbezogenen Daten
          </p>
        </div>

        {/* Content Card */}
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:space-y-8 sm:p-10">
          {/* Einleitung */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Allgemeine Hinweise
            </h2>
            <div className="space-y-4 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:p-6">
              <p className="leading-relaxed">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persönlich identifiziert werden können.
              </p>
            </div>
          </section>

          {/* Datenerfassung */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Datenerfassung auf dieser Website
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Wer ist verantwortlich für die Datenerfassung?</h3>
                <p className="leading-relaxed">
                  Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                  können Sie dem Impressum dieser Website entnehmen.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Wie erfassen wir Ihre Daten?</h3>
                <p className="leading-relaxed">
                  Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um
                  Daten handeln, die Sie in ein Kontaktformular eingeben.
                </p>
                <p className="mt-3 leading-relaxed">
                  Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                  IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder
                  Uhrzeit des Seitenaufrufs).
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Wofür nutzen wir Ihre Daten?</h3>
                <p className="leading-relaxed">
                  Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                  Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
                <p className="leading-relaxed">
                  Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                  gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder
                  Löschung dieser Daten zu verlangen.
                </p>
              </div>
            </div>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              Hosting
            </h2>
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:p-6">
              <p className="mb-3 leading-relaxed">
                Diese Website wird gehostet bei:
              </p>
              <p className="font-semibold text-slate-900">[Hosting-Anbieter, z.B. eigener Server / Hetzner / etc.]</p>
              <p className="mt-3 leading-relaxed">
                [Details zum Hosting-Anbieter und dessen Datenschutzrichtlinien]
              </p>
            </div>
          </section>

          {/* Server-Log-Dateien */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V4zm2 2V5h1v1h-1z" clipRule="evenodd" />
              </svg>
              Server-Log-Dateien
            </h2>
            <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:p-6">
              <p className="leading-relaxed">
                Der Provider der Seiten erhebt und speichert automatisch Informationen in Server-Log-Dateien, die Ihr
                Browser automatisch an uns übermittelt. Dies sind:
              </p>
              <ul className="ml-6 list-disc space-y-1">
                <li>Browsertyp und Browserversion</li>
                <li>verwendetes Betriebssystem</li>
                <li>Referrer URL</li>
                <li>Hostname des zugreifenden Rechners</li>
                <li>Uhrzeit der Serveranfrage</li>
                <li>IP-Adresse</li>
              </ul>
              <p className="mt-3 leading-relaxed">
                Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser
                Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
              </p>
            </div>
          </section>

          {/* Kontaktformular */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Kontaktformular & E-Mail
            </h2>
            <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:p-6">
              <p className="leading-relaxed">
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
                und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <p className="mt-3 leading-relaxed">
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf
                Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags
                zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
              </p>
            </div>
          </section>

          {/* Ihre Rechte */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L4.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 013 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L7 4.323V3a1 1 0 011-1h2z" clipRule="evenodd" />
              </svg>
              Ihre Rechte als betroffene Person
            </h2>
            <div className="space-y-3 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Auskunftsrecht (Art. 15 DSGVO)</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob betreffende Daten verarbeitet werden
                  und auf Auskunft über diese Daten sowie auf weitere Informationen und Kopie der Daten.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Recht auf Berichtigung (Art. 16 DSGVO)</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, die Berichtigung Sie betreffender unrichtiger Daten zu verlangen.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Recht auf Löschung (Art. 17 DSGVO)</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich gelöscht werden.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags
                  automatisiert verarbeiten, in einem gängigen, maschinenlesbaren Format zu erhalten.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Widerspruchsrecht (Art. 21 DSGVO)</h3>
                <p className="leading-relaxed">
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die
                  Verarbeitung Sie betreffender Daten Widerspruch einzulegen.
                </p>
              </div>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Cookies
            </h2>
            <div className="space-y-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:p-6">
              <p className="leading-relaxed">
                Diese Website verwendet Cookies. Diese sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden.
                Ihr Browser greift auf diese Dateien zu.
              </p>
              <p className="mt-3 leading-relaxed">
                [Details zu den verwendeten Cookies und deren Zweck - z.B. Session-Cookies für Anmeldung, etc.]
              </p>
              <p className="mt-3 leading-relaxed">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und
                einzeln über deren Annahme entscheiden oder die Annahme von Cookies generell ausschließen können.
              </p>
            </div>
          </section>

          {/* Hinweis */}
          <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-200 sm:p-6">
            <div className="flex gap-3">
              <svg className="h-6 w-6 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-semibold">Bitte beachten:</p>
                <p className="mt-2 leading-relaxed">
                  Die in eckigen Klammern stehenden Platzhalter müssen durch deine tatsächlichen Angaben und spezifischen
                  Datenschutzpraktiken ersetzt werden. Diese Datenschutzerklärung sollte durch einen Rechtsanwalt oder
                  Datenschutzbeauftragten an deine spezifischen Bedürfnisse angepasst werden.
                </p>
              </div>
            </div>
          </div>

          {/* Stand */}
          <div className="text-center text-sm text-slate-500">
            <p>Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
