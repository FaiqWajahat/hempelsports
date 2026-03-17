import Link from "next/link";

export const metadata = {
  title: "Admin Console — Venpa Sports",
  description: "Admin dashboard for managing Venpa Sports catalog.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-black/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link href="/admin" className="flex flex-col leading-tight">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-red-500">
              Venpa Sports
            </span>
            <span className="text-sm font-bold text-zinc-200">Admin Console</span>
          </Link>
          <span className="hidden rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-500 sm:block">
            Catalog Management
          </span>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-8 md:px-8">
        {/* Sidebar */}
        <aside className="hidden w-52 shrink-0 md:block">
          <nav className="sticky top-24 flex flex-col gap-1 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3">
            <p className="mb-2 px-2 text-[9px] font-black uppercase tracking-[0.22em] text-zinc-600">
              Navigation
            </p>
            {[
              { href: "#admin-stats", label: "Overview", icon: "◉" },
              { href: "#admin-products", label: "Products", icon: "▤" },
            ].map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
              >
                <span className="text-base opacity-50">{icon}</span>
                {label}
              </a>
            ))}

            <div className="my-2 h-px bg-zinc-800" />

            <Link
              href="/"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-800 hover:text-zinc-400"
            >
              <span className="text-base opacity-50">←</span>
              Back to site
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
