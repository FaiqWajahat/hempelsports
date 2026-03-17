"use client";

export default function StatCards({ categories, subcategories, products }) {
  const stats = [
    {
      label: "Categories",
      value: categories,
      icon: "▤",
      color: "from-blue-500/20 to-blue-600/5",
      accent: "text-blue-400",
      border: "border-blue-500/20",
    },
    {
      label: "Subcategories",
      value: subcategories,
      icon: "◫",
      color: "from-violet-500/20 to-violet-600/5",
      accent: "text-violet-400",
      border: "border-violet-500/20",
    },
    {
      label: "Products",
      value: products,
      icon: "◉",
      color: "from-emerald-500/20 to-emerald-600/5",
      accent: "text-emerald-400",
      border: "border-emerald-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`relative overflow-hidden rounded-2xl border ${s.border} bg-gradient-to-br ${s.color} p-6 backdrop-blur-sm`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {s.label}
              </p>
              <p className={`mt-2 text-4xl font-black tabular-nums ${s.accent}`}>
                {s.value}
              </p>
            </div>
            <span className={`text-3xl opacity-30 ${s.accent}`}>{s.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
