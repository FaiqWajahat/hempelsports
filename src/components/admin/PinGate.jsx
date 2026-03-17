"use client";

import { useState } from "react";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✓"];

export default function PinGate({ onSuccess }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  function handleKey(key) {
    if (loading) return;
    if (key === "⌫") {
      setPin((p) => p.slice(0, -1));
      setError("");
      return;
    }
    if (key === "✓") {
      submitPin();
      return;
    }
    if (pin.length >= 8) return;
    const next = pin + key;
    setPin(next);
    setError("");
  }

  async function submitPin(currentPin) {
    const finalPin = currentPin ?? pin;
    if (!finalPin) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: finalPin }),
      });
      if (res.ok) {
        // Reload so the server page.js re-runs and picks up the new auth cookie
        window.location.reload();
        return;
      } else {
        setError("Incorrect PIN. Try again.");
        setPin("");
        triggerShake();
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950">
      {/* Brand */}
      <div className="mb-10 flex flex-col items-center gap-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
          Venpa Sports
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight text-zinc-100">
          Admin Console
        </h1>
        <p className="mt-1 text-sm text-zinc-500">Enter your PIN to continue</p>
      </div>

      {/* PIN dots */}
      <div
        className={`mb-8 flex items-center gap-3 transition-all ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}
        style={
          shake
            ? { animation: "shake 0.4s ease-in-out" }
            : {}
        }
      >
        {Array.from({ length: Math.max(pin.length, 4) }).map((_, i) => (
          <div
            key={i}
            className={`h-3 w-3 rounded-full border-2 transition-all duration-200 ${
              i < pin.length
                ? "scale-110 border-red-500 bg-red-500"
                : "border-zinc-600 bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Error */}
      <div className="mb-6 h-5 text-center">
        {error && (
          <p className="text-xs font-medium text-red-400">{error}</p>
        )}
      </div>

      {/* Numpad */}
      <div className="grid w-64 grid-cols-3 gap-3">
        {KEYS.map((key) => {
          const isConfirm = key === "✓";
          const isDelete = key === "⌫";
          return (
            <button
              key={key}
              onClick={() => handleKey(key)}
              disabled={loading}
              className={`flex h-16 items-center justify-center rounded-2xl text-xl font-semibold transition-all duration-150 active:scale-95 disabled:opacity-50
                ${isConfirm
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-400"
                  : isDelete
                  ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  : "bg-zinc-900 text-zinc-100 hover:bg-zinc-800 border border-zinc-800"
                }`}
            >
              {loading && isConfirm ? (
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                key
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
