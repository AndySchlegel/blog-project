import styles from './Button.module.css';

function GlobalStyledButton() {
  return (
    <button className="button-global" type="button">
      Global CSS Button
    </button>
  );
}

function ModuleStyledButton() {
  return (
    <button className={styles.button} type="button">
      CSS Module Button
    </button>
  );
}

function TailwindStyledButton() {
  return (
    <button
      type="button"
      className="rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-cyan-400 hover:via-sky-400 hover:to-blue-500 hover:shadow-xl"
    >
      Tailwind Utility Button
    </button>
  );
}

export default function ButtonShowcase() {
  return (
    <section className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900">Styling Strategies</h2>
      <p className="text-sm text-gray-600">
        Same component, three approaches: global CSS, CSS Modules, and Tailwind utilities.
      </p>
      <div className="flex flex-wrap gap-4">
        <GlobalStyledButton />
        <ModuleStyledButton />
        <TailwindStyledButton />
      </div>
    </section>
  );
}
