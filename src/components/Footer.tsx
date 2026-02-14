import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--card-bg)]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] mb-2">Know Your Rights</h3>
            <p className="text-sm text-[var(--muted)]">
              This is not legal advice. For personalized guidance, consult a licensed attorney.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Educational Use</h4>
            <p className="text-sm text-[var(--muted)]">
              Built for educational purposes and public legal literacy.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] mb-2">Find Legal Help</h4>
            <Link
              href="https://www.findlegalhelp.org"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[var(--accent)] hover:text-[var(--accent-light)] underline-offset-4 hover:underline"
            >
              findlegalhelp.org
            </Link>
            <p className="text-xs text-[var(--muted)] mt-3">© {year} Know Your Rights</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
