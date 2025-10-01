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
    <section className="rounded-lg bg-gray-900 p-6 text-white shadow-md">
      <h2 className="text-xl font-semibold">Stay in the loop</h2>
      <p className="mt-2 text-sm text-gray-200">
        Subscribe to get new posts delivered straight to your inbox.
      </p>
      <form
        className="mt-4 flex flex-col gap-3"
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
          className="rounded-md border border-white/30 bg-white/10 px-3 py-2 text-sm placeholder:text-white/60 focus:border-white focus:outline-none"
          placeholder="you@example.com"
          suppressHydrationWarning
        />
        <button
          type="submit"
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-200"
        >
          Subscribe
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-sm text-green-300" role="status">
          Danke fürs Abonnieren! Die Adresse wurde gespeichert.
        </p>
      )}
    </section>
  );
}
