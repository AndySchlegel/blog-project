'use client';

import { useState } from 'react';

const contactMethods = [
  {
    title: 'GitHub',
    description: 'Check out my projects and contributions',
    href: 'https://github.com/AndySchlegel',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: 'from-gray-700 to-gray-900'
  },
  {
    title: 'LinkedIn',
    description: 'Connect professionally',
    href: 'https://linkedin.com/in/yourprofile',
    icon: (
      <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'from-blue-600 to-blue-800'
  },
  {
    title: 'Email',
    description: 'Direct message anytime',
    href: 'mailto:your.email@example.com',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'from-purple-600 to-indigo-600'
  }
];

const faqs = [
  {
    question: 'Bietest du Consulting oder Support an?',
    answer: 'Aktuell fokussiere ich mich auf meine Vollzeitstelle als Java DevOps Engineer. Bei spannenden Projekten oder Fragen kannst du mich aber gerne kontaktieren!'
  },
  {
    question: 'Kann ich deine Homelab-Config bekommen?',
    answer: 'Die meisten meiner Setups und Configs teile ich auf GitHub. Schau dort vorbei oder frag nach spezifischen Themen!'
  },
  {
    question: 'Machst du Custom Guides auf Anfrage?',
    answer: 'Wenn du eine konkrete Idee hast, schreib mir! Interessante Themen nehme ich gerne in meine Content-Pipeline auf.'
  },
  {
    question: 'Wie lange dauert eine Antwort?',
    answer: 'In der Regel antworte ich innerhalb von 1-2 Tagen. Bei komplexeren Anfragen kann es etwas länger dauern.'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would normally send the data to your API
    console.log('Form submitted:', formData);

    setSubmitStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-20 pt-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl animation-delay-2000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm ring-1 ring-white/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Lass uns connecten!
            </div>

            <h1 className="mb-6 text-6xl font-black tracking-tight text-white sm:text-7xl">
              Get in <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
            </h1>

            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-blue-100">
              Fragen zu meinen Projekten? Interesse an Zusammenarbeit? Oder einfach nur Tech-Talk?
              Ich freue mich über jede Nachricht!
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Contact Methods */}
        <div className="mb-16 grid gap-6 md:grid-cols-3">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} text-white shadow-xl transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                {method.icon}
              </div>

              <h3 className="mb-2 text-2xl font-bold text-slate-900">{method.title}</h3>
              <p className="mb-4 text-slate-600">{method.description}</p>

              <div className="flex items-center gap-2 font-semibold text-blue-600 transition-all group-hover:gap-3">
                Connect
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Hover Glow */}
              <div className={`absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br ${method.color} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`} />
            </a>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Form */}
          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50 p-8">
              <h2 className="flex items-center gap-3 text-3xl font-black text-slate-900">
                <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Nachricht senden
              </h2>
              <p className="mt-2 text-slate-600">Füll einfach das Formular aus und ich melde mich so schnell wie möglich!</p>
            </div>

            <div className="p-8">
              {submitStatus === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 p-4 text-green-800 ring-1 ring-green-200">
                  <svg className="h-6 w-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold">Nachricht gesendet!</p>
                    <p className="text-sm">Ich melde mich so schnell wie möglich bei dir.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      placeholder="Dein Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                      placeholder="deine@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm font-bold text-slate-700">
                    Betreff
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    placeholder="Worum geht's?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-bold text-slate-700">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
                    placeholder="Deine Nachricht..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Nachricht senden
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <div className="mb-8">
              <h2 className="mb-4 text-3xl font-black text-slate-900">
                Häufige <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Fragen</span>
              </h2>
              <p className="text-lg text-slate-600">Vielleicht findest du hier schon die Antwort!</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                    <span className="text-lg">{faq.question}</span>
                    <svg
                      className="h-6 w-6 flex-shrink-0 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="border-t border-slate-100 bg-slate-50 p-6">
                    <p className="leading-relaxed text-slate-600">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-8 overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white shadow-2xl">
              <div className="mb-4 flex items-center gap-3">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold">Quick Info</h3>
              </div>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Antwortzeit: 1-2 Werktage
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Zeitzone: Europe/Berlin (CET/CEST)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-0.5 h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sprache: Deutsch & English
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
