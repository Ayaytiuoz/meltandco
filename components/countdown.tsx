"use client";

import { useEffect, useState } from "react";

export function Countdown({ target }: { target: string | null }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);

  if (!target || now === null) return null;
  const diff = new Date(target).getTime() - now;
  if (Number.isNaN(diff) || diff <= 0) return null;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const parts = [
    { value: days, label: "jours" },
    { value: hours, label: "heures" },
    { value: minutes, label: "min" },
  ];

  return (
    <div className="mt-8 flex gap-6" aria-label="Compte à rebours">
      {parts.map((part) => (
        <div key={part.label}>
          <p className="font-serif text-4xl">{String(part.value).padStart(2, "0")}</p>
          <p className="text-[0.68rem] uppercase tracking-[0.18em] text-milk">{part.label}</p>
        </div>
      ))}
    </div>
  );
}
