"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { isAuthenticated } from "../utils/authStorage";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (isAuthenticated()) router.replace("/incoming");
    else router.replace("/login");
  }, [router, router.isReady]);
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
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            background: "#2563eb",
            borderRadius: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 700,
            margin: "0 auto 20px",
            color: "#fff",
          }}
        >
          W
        </div>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: "#1e3a8a" }}>
          Mahonys EMS
        </h1>
        <p style={{ color: "#64748b", fontSize: 14, margin: "8px 0 0" }}>Loading…</p>
      </div>
    </div>
  );
}
