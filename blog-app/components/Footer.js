export default function Footer() {
  return (
    <footer className="bg-gray-950 py-8 text-gray-300">
      <div className="container mx-auto flex flex-col gap-4 px-4 text-sm md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getUTCFullYear()} Tech Blog. All rights reserved.</p>
        <p>
          Built with <span className="font-semibold text-white">Next.js App Router</span> and Tailwind CSS.
        </p>
      </div>
    </footer>
  );
}
