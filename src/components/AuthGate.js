"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/authStorage";

/** Routes reachable without signing in */
const PUBLIC_AUTH_ROUTES = new Set(["/login", "/forgot-password"]);

function splash() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(165deg, #ffffff 0%, #eff6ff 38%, #dbeafe 100%)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <p style={{ color: "#2563eb", fontSize: 14, fontWeight: 500, margin: 0 }}>
        Loading…
      </p>
    </div>
  );
}

export function AuthGate({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    if (!PUBLIC_AUTH_ROUTES.has(router.pathname) && !isAuthenticated()) {
      router.replace("/login");
    }
  }, [router.isReady, router.pathname, router]);

  // Server: `isAuthenticated()` is always false (no window). Client first paint: keep the
  // same tree SSR emitted (`children`) until after mount — otherwise SSR can show splash
  // while the client briefly shows `children`, causing a hydration mismatch.
  if (!router.isReady || !mounted) {
    return children;
  }

  if (PUBLIC_AUTH_ROUTES.has(router.pathname)) {
    return children;
  }

  if (!isAuthenticated()) {
    return splash();
  }

  return children;
}
