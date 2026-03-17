"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  function handleLogout() {
    // Delete the cookie client-side and reload
    document.cookie = "admin_auth=; path=/; max-age=0";
    router.refresh();
  }

  return (
    <div className="mb-6 flex items-center justify-between rounded-xl border border-zinc-800/60 bg-zinc-900/40 px-4 py-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-emerald-500" />
        <span className="text-xs font-semibold text-zinc-400">Authenticated</span>
      </div>
      <button
        onClick={handleLogout}
        className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs font-bold text-zinc-500 transition hover:border-red-500/50 hover:text-red-400"
      >
        Logout
      </button>
    </div>
  );
}
