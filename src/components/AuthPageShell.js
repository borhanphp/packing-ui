"use client";
import React, { useEffect } from "react";
import Head from "next/head";

export const authInputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #cbd5f5",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: 15,
  outline: "none",
};

export const authLabelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "#2563eb",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  marginBottom: 8,
};

export function AuthPageShell({ headTitle, subtitle, children }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflow: "hidden",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          background:
            "linear-gradient(165deg, #ffffff 0%, #eff6ff 38%, #dbeafe 100%)",
          fontFamily: "'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            maxHeight: "100%",
            overflow: "hidden",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 26,
                fontWeight: 700,
                color: "#1e3a8a",
                letterSpacing: "-0.5px",
              }}
            >
              Mahonys EMS
            </h1>
            <p
              style={{
                margin: "10px 0 0",
                fontSize: 14,
                color: "#64748b",
              }}
            >
              {subtitle}
            </p>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
