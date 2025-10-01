const teamMembers = [
  { name: 'John Doe', role: 'Lead Instructor', bio: 'Focuses on developer experience and full-stack architecture.' },
  { name: 'Jane Smith', role: 'Curriculum Designer', bio: 'Designs hands-on labs and keeps content up to date.' },
  { name: 'Alex Lee', role: 'Community Manager', bio: 'Helps learners connect and keeps the Discord vibrant.' }
];

export default function About() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
        <p className="text-lg text-slate-600">
          We are passionate developers and educators helping teams ship better web applications with Next.js and React.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <article key={member.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">{member.name}</h2>
            <p className="text-sm font-medium text-blue-600">{member.role}</p>
            <p className="mt-3 text-sm text-slate-600">{member.bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
