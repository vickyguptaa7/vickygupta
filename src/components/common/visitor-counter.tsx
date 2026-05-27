"use client";

import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Check if already counted this session
    const counted = sessionStorage.getItem("visitor-counted");

    if (!counted) {
      fetch("/api/visitors", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          setCount(data.count);
          sessionStorage.setItem("visitor-counted", "true");
        })
        .catch(() => {});
    } else {
      fetch("/api/visitors")
        .then((res) => res.json())
        .then((data) => setCount(data.count))
        .catch(() => {});
    }
  }, []);

  if (count === null) return null;

  return (
    <p className="font-mono text-[11px] text-text-muted sm:text-xs">
      You are the{" "}
      <span className="font-semibold text-text-secondary tabular-nums">
        {count.toLocaleString()}
        {getOrdinalSuffix(count)}
      </span>{" "}
      visitor
    </p>
  );
}

function getOrdinalSuffix(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
