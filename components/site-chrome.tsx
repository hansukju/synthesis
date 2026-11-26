import Link from "next/link";

function InactiveLink({ children }: { children: string }) {
  return <span role="link" aria-disabled="true" className="text-muted">{children}</span>;
}

export function SiteHeader({ onHome = true }: { onHome?: boolean }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-b border-line py-5 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:py-10">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-3 focus:z-10 focus:bg-surface focus:p-2">
        Skip to content
      </a>
      <Link href="/" className="w-fit text-lg font-semibold tracking-tight sm:text-xl">SYNTHESIS.</Link>
      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:gap-x-7">
          <li><Link href="/" aria-current={onHome ? "page" : undefined} className="hover:underline">Discover</Link></li>
          <li><InactiveLink>Archive</InactiveLink></li>
          <li><InactiveLink>About</InactiveLink></li>
        </ul>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line py-6 text-sm">
      <Link href="/" className="font-semibold hover:underline">SYNTHESIS.</Link>
      <nav aria-label="Footer navigation">
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {["About", "Contact", "Privacy", "Terms"].map((label) => (
            <li key={label}><InactiveLink>{label}</InactiveLink></li>
          ))}
        </ul>
      </nav>
    </footer>
  );
}
