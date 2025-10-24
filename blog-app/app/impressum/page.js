export const metadata = {
  title: 'Impressum | My Tech Blog',
  description: 'Impressum und Angaben gemäß § 5 TMG',
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg sm:h-16 sm:w-16">
            <svg className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="mb-3 text-3xl font-black text-slate-900 sm:text-5xl">
            Impressum
          </h1>
          <p className="text-sm text-slate-600 sm:text-base">
            Angaben gemäß § 5 TMG (Telemediengesetz)
          </p>
        </div>

        {/* Content Card */}
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:space-y-8 sm:p-10">
          {/* Betreiber */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Angaben zum Betreiber
            </h2>
            <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-slate-700 sm:p-6">
              <p className="font-semibold text-slate-900">[Dein vollständiger Name / Firmenname]</p>
              <p>[Deine Straße und Hausnummer]</p>
              <p>[Deine PLZ und Stadt]</p>
              <p className="pt-2">Deutschland</p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Kontakt
            </h2>
            <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-slate-700 sm:p-6">
              <p className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">E-Mail:</span>
                <a href="mailto:kontakt@example.com" className="text-blue-600 transition-colors hover:text-purple-600">
                  [deine@email.de]
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold text-slate-900">Telefon:</span>
                [Optional: Deine Telefonnummer]
              </p>
            </div>
          </section>

          {/* Verantwortlich für den Inhalt */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Verantwortlich für den Inhalt
            </h2>
            <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-slate-700 sm:p-6">
              <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</p>
              <p className="font-semibold text-slate-900">[Dein vollständiger Name]</p>
              <p>[Deine Adresse wie oben]</p>
            </div>
          </section>

          {/* Optional: Umsatzsteuer-ID */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              Umsatzsteuer-ID
            </h2>
            <div className="space-y-2 rounded-xl bg-slate-50 p-4 text-slate-700 sm:p-6">
              <p className="text-sm">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
              </p>
              <p className="font-semibold text-slate-900">[Optional: Deine USt-IdNr., falls vorhanden]</p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Haftungsausschluss
            </h2>
            <div className="space-y-4 text-sm text-slate-700">
              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Haftung für Inhalte</h3>
                <p className="leading-relaxed">
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Haftung für Links</h3>
                <p className="leading-relaxed">
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
                  Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
                  Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 sm:p-6">
                <h3 className="mb-2 font-bold text-slate-900">Urheberrecht</h3>
                <p className="leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
                  Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
                  Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </div>
            </div>
          </section>

          {/* EU Streitschlichtung */}
          <section>
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900 sm:text-2xl">
              <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
              EU-Streitschlichtung
            </h2>
            <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:p-6">
              <p className="mb-3 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
              </p>
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-semibold text-blue-600 transition-colors hover:text-purple-600"
              >
                https://ec.europa.eu/consumers/odr/
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <p className="mt-3 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
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
                  Die in eckigen Klammern stehenden Platzhalter müssen durch deine tatsächlichen Angaben ersetzt werden.
                  Dieses Impressum erfüllt die Grundanforderungen, sollte aber ggf. durch einen Rechtsanwalt an deine
                  spezifischen Bedürfnisse angepasst werden.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
