export default function Contact() {
  return (
    <section className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">Contact Us</h1>
        <p className="text-lg text-slate-600">
          Have questions about the workshop or need support? Send us a message and we will get back within one business day.
        </p>
      </header>
      <form className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Name
            <input
              type="text"
              name="name"
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            Email
            <input
              type="email"
              name="email"
              required
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
          </label>
        </div>
        <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
          Message
          <textarea
            name="message"
            rows="5"
            required
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          ></textarea>
        </label>
        <button
          type="submit"
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
