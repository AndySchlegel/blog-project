'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('Newsletter-Anmeldung fehlgeschlagen');
      }

      setSubmitted(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter Anmeldung fehlgeschlagen:', error);
      setSubmitted(false);
      alert('Ups! Anmeldung hat nicht geklappt. Bitte später erneut versuchen.');
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-blue-200/50 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-6 text-white shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold">Newsletter</h2>
      </div>
      <p className="mb-4 text-sm text-blue-100">
        Neue Posts direkt ins Postfach.
      </p>
      <form
        className="flex flex-col gap-2"
        onSubmit={handleSubmit}
        suppressHydrationWarning
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border-2 border-white/30 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/60 backdrop-blur-sm transition-all focus:border-white focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
          placeholder="deine@email.de"
          suppressHydrationWarning
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-blue-600 shadow-md transition-all hover:scale-105 hover:shadow-lg"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Abonnieren
        </button>
      </form>
      {submitted && (
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-green-500/20 p-2 text-xs font-semibold text-green-100 ring-1 ring-green-400/30" role="status">
          <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Danke! Adresse gespeichert.
        </div>
      )}
    </section>
  );
}
