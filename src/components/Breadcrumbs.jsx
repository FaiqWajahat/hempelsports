import Link from "next/link";
import { Fragment } from "react";

/**
 * Breadcrumbs Component
 * @param {Array<{label: string, href?: string}>} items - List of breadcrumb items. The last item is treated as active and shouldn't have an href.
 */
export default function Breadcrumbs({ items, isDark = false }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`py-3 ${isDark ? "bg-transparent border-t border-white/10" : "bg-zinc-50 border-b border-zinc-200"}`}>
      <div className={`mx-auto max-w-7xl px-5 lg:px-8 flex items-center overflow-x-auto whitespace-nowrap gap-2 text-[10px] font-bold uppercase tracking-widest scrollbar-hide ${isDark ? "text-white/50" : "text-zinc-500"}`}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <Fragment key={idx}>
              {isLast ? (
                <span className={isDark ? "text-white" : "text-zinc-900"}>{item.label}</span>
              ) : (
                <>
                  <Link href={item.href || "#"} className="hover:text-[var(--color-primary)] transition-colors">
                    {item.label}
                  </Link>
                  <span className={isDark ? "text-white/20" : "text-zinc-300"}>/</span>
                </>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
