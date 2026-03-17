"use client";

import { useState } from "react";
import PinGate from "@/components/admin/PinGate";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminClient({ isAuthenticated, initialData }) {
  const [authed, setAuthed] = useState(isAuthenticated);

  if (!authed) {
    return (
      <PinGate
        onSuccess={() => {
          setAuthed(true);
          // Force a full refresh so the server re-renders AdminDashboard with fresh data
          window.location.reload();
        }}
      />
    );
  }

  return <AdminDashboard {...initialData} />;
}
