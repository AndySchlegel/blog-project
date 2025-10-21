'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const certifications = [
  {
    name: 'AWS Cloud Practitioner',
    icon: '☁️',
    status: 'completed',
    date: '2024',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'AWS Solutions Architect',
    icon: '🏗️',
    status: 'in-progress',
    date: 'In Progress',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'GitHub Foundations',
    icon: '💻',
    status: 'completed',
    date: '2024',
    color: 'from-purple-500 to-pink-500'
  }
];

const skills = [
  { name: 'Java', level: 90, icon: '☕' },
  { name: 'AWS', level: 80, icon: '☁️' },
  { name: 'Docker', level: 95, icon: '🐳' },
  { name: 'Kubernetes', level: 70, icon: '⎈' },
  { name: 'CI/CD', level: 85, icon: '🔄' },
  { name: 'Linux', level: 85, icon: '🐧' },
  { name: 'Terraform', level: 75, icon: '🌍' },
  { name: 'Networking', level: 80, icon: '🔒' }
];

const timeline = [
  {
    year: '2024',
    title: 'AWS Cloud Journey',
    description: 'Achieved AWS Cloud Practitioner certification. Currently preparing for Solutions Architect Associate.',
    icon: '🎓',
    color: 'blue'
  },
  {
    year: '2024',
    title: 'Homelab Evolution',
    description: 'Built production-grade homelab with Synology DS925+, Hetzner server, n8n automation, Tailscale VPN mesh network.',
    icon: '🏠',
    color: 'purple'
  },
  {
    year: '2023-2024',
    title: 'DevOps Mastery',
    description: 'Deep dive into container orchestration, infrastructure as code, and GitOps workflows.',
    icon: '🚀',
    color: 'indigo'
  },
  {
    year: '2020+',
    title: 'Java Development',
    description: 'Professional Java DevOps Engineer building scalable enterprise applications.',
    icon: '☕',
    color: 'orange'
  }
];

const homelabStack = [
  { name: 'Synology DS925+', desc: 'Main NAS & Docker host', icon: '💾' },
  { name: 'Hetzner Server', desc: 'Cloud infrastructure', icon: '☁️' },
  { name: 'n8n', desc: 'Workflow automation', icon: '🔄' },
  { name: 'Tailscale', desc: 'Zero-trust VPN mesh', icon: '🔒' },
  { name: 'Traefik', desc: 'Reverse proxy & SSL', icon: '🚦' },
  { name: 'Dashy', desc: 'Homelab dashboard', icon: '📊' }
];

export default function About() {
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  useEffect(() => {
    const observers = [];

    observerRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
            }
          },
          { threshold: 0.1 }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pb-32 pt-24">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl animation-delay-0" />
          <div className="absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl animation-delay-2000" />
          <div className="absolute bottom-1/4 left-1/2 h-96 w-96 animate-pulse rounded-full bg-indigo-500 blur-3xl animation-delay-4000" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with Pulse Effect */}
            <div className="relative mb-8">
              <div className="absolute inset-0 animate-ping rounded-full bg-blue-400 opacity-20"></div>
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-7xl font-bold text-white shadow-2xl ring-8 ring-white/20">
                A
              </div>
            </div>

            {/* Name and Title */}
            <h1 className="mb-4 text-6xl font-black tracking-tight text-white sm:text-7xl">
              Andy Schlegel
            </h1>
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <span className="rounded-full bg-white/10 px-6 py-2 text-lg font-semibold text-blue-200 backdrop-blur-sm ring-1 ring-white/20">
                Java DevOps Engineer
              </span>
              <span className="rounded-full bg-white/10 px-6 py-2 text-lg font-semibold text-purple-200 backdrop-blur-sm ring-1 ring-white/20">
                AWS Certified
              </span>
              <span className="rounded-full bg-white/10 px-6 py-2 text-lg font-semibold text-indigo-200 backdrop-blur-sm ring-1 ring-white/20">
                Homelab Enthusiast
              </span>
            </div>

            {/* Bio */}
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-blue-100">
              Von Enterprise Java Development über Cloud Engineering bis zum Production-Grade Homelab.
              Ich teile hier meine Erfahrungen, Best Practices und echte Lösungen aus der Praxis.
            </p>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://github.com/AndySchlegel"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <svg className="h-7 w-7 text-white transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-14 w-14 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/20"
              >
                <svg className="h-7 w-7 text-white transition-transform group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" />
          </svg>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-slate-900">
              Meine <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-lg text-slate-600">Von Java Development zur Cloud - Ein Weg voller Learnings</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 md:block" />

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  ref={el => observerRefs.current[index] = el}
                  className={`relative transition-all duration-1000 ${
                    isVisible[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`flex flex-col items-center gap-8 md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Content Card */}
                    <div className="w-full md:w-5/12">
                      <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl">
                        <div className="mb-4 flex items-center gap-4">
                          <span className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${
                            item.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                            item.color === 'purple' ? 'from-purple-500 to-pink-500' :
                            item.color === 'indigo' ? 'from-indigo-500 to-blue-500' :
                            'from-orange-500 to-red-500'
                          } text-3xl text-white shadow-lg`}>
                            {item.icon}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-slate-500">{item.year}</div>
                            <h3 className="text-2xl font-bold text-slate-900">{item.title}</h3>
                          </div>
                        </div>
                        <p className="leading-relaxed text-slate-600">{item.description}</p>

                        {/* Hover Glow */}
                        <div className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br ${
                          item.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                          item.color === 'purple' ? 'from-purple-500 to-pink-500' :
                          item.color === 'indigo' ? 'from-indigo-500 to-blue-500' :
                          'from-orange-500 to-red-500'
                        } opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`} />
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="z-10 hidden md:block">
                      <div className={`h-6 w-6 rounded-full bg-gradient-to-br ${
                        item.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                        item.color === 'purple' ? 'from-purple-500 to-pink-500' :
                        item.color === 'indigo' ? 'from-indigo-500 to-blue-500' :
                        'from-orange-500 to-red-500'
                      } ring-8 ring-white shadow-lg`} />
                    </div>

                    {/* Spacer */}
                    <div className="hidden w-5/12 md:block" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-slate-900">
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Certifications</span>
            </h2>
            <p className="text-lg text-slate-600">Learning never stops - Mein Weg zur Cloud-Expertise</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {certifications.map((cert, index) => (
              <div
                key={index}
                ref={el => observerRefs.current[timeline.length + index] = el}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cert.color} p-8 text-white shadow-2xl transition-all duration-1000 hover:scale-105 ${
                  isVisible[timeline.length + index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Icon */}
                <div className="mb-6 text-7xl">{cert.icon}</div>

                {/* Badge */}
                {cert.status === 'completed' ? (
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Certified
                  </span>
                ) : (
                  <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                    <span className="relative flex h-3 w-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
                    </span>
                    In Progress
                  </span>
                )}

                <h3 className="mb-2 text-2xl font-bold">{cert.name}</h3>
                <p className="text-sm font-medium text-white/80">{cert.date}</p>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl ring-2 ring-white/20 transition-all group-hover:ring-4 group-hover:ring-white/40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black text-slate-900">
              Tech <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-lg text-slate-600">Meine Expertise auf einen Blick</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                ref={el => observerRefs.current[timeline.length + certifications.length + index] = el}
                className={`group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-1000 hover:-translate-y-2 hover:shadow-2xl ${
                  isVisible[timeline.length + certifications.length + index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-4xl">{skill.icon}</span>
                  <span className="text-2xl font-bold text-slate-900">{skill.level}%</span>
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">{skill.name}</h3>

                {/* Progress Bar */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                    style={{
                      width: isVisible[timeline.length + certifications.length + index] ? `${skill.level}%` : '0%'
                    }}
                  />
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Homelab Stack Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-5xl font-black">
              Mein <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Homelab</span>
            </h2>
            <p className="text-lg text-blue-200">Production-Grade Self-Hosting Infrastructure</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {homelabStack.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                <div className="mb-4 text-5xl">{item.icon}</div>
                <h3 className="mb-2 text-xl font-bold">{item.name}</h3>
                <p className="text-sm text-blue-200">{item.desc}</p>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/10 transition-all group-hover:ring-white/30" />
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold">24/7</div>
              <div className="mt-2 text-sm text-blue-200">Uptime</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold">∞</div>
              <div className="mt-2 text-sm text-blue-200">Container</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold">2</div>
              <div className="mt-2 text-sm text-blue-200">Data Centers</div>
            </div>
            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
              <div className="text-4xl font-bold">100%</div>
              <div className="mt-2 text-sm text-blue-200">Dockerized</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 p-12 text-center text-white shadow-2xl">
            <h2 className="mb-4 text-4xl font-black">Let's Connect!</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
              Fragen zu AWS? Docker? Homelab-Setup? Oder einfach nur Tech-Talk?
              Ich freue mich über jede Nachricht!
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
            >
              Kontakt aufnehmen
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
