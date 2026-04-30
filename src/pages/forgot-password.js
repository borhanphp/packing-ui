"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  AuthPageShell,
  authInputStyle,
  authLabelStyle,
} from "../components/AuthPageShell";
import { isAuthenticated } from "../utils/authStorage";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (isAuthenticated()) router.replace("/incoming");
  }, [router.isReady, router]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  const cardStyle = {
    background: "#ffffff",
    borderRadius: 16,
    padding: "28px 28px 24px",
    border: "1px solid #bfdbfe",
    boxShadow: "0 4px 32px rgba(37, 99, 235, 0.1)",
  };

  const linkStyle = {
    color: "#2563eb",
    fontSize: 14,
    fontWeight: 500,
    textDecoration: "none",
  };

  return (
    <AuthPageShell
      headTitle="Forgot password — Mahonys EMS"
      subtitle="Reset your password"
    >
      {submitted ? (
        <div style={cardStyle}>
          <p
            style={{
              margin: "0 0 16px",
              fontSize: 14,
              color: "#334155",
              lineHeight: 1.55,
            }}
          >
            If an account exists for that email, you will receive password
            reset instructions shortly. Check your inbox or spam folder.
          </p>
          <p
            style={{
              margin: "0 0 20px",
              fontSize: 13,
              color: "#64748b",
              lineHeight: 1.45,
            }}
          >
            This demo does not send email; in production connect this flow to your
            auth service.
          </p>
          <Link href="/login" style={linkStyle}>
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={cardStyle}>
          <p
            style={{
              margin: "0 0 18px",
              fontSize: 13,
              color: "#64748b",
              lineHeight: 1.5,
            }}
          >
            Enter the email tied to your account. We&apos;ll send a link to reset
            your password.
          </p>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="forgot-email" style={authLabelStyle}>
              Email
            </label>
            <input
              id="forgot-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={authInputStyle}
              placeholder="you@company.com"
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 8,
              border: "none",
              background: "#2563eb",
              color: "#fff",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              marginBottom: 14,
            }}
          >
            Send reset link
          </button>

          <div style={{ textAlign: "center" }}>
            <Link href="/login" style={linkStyle}>
              Back to sign in
            </Link>
          </div>
        </form>
      )}
    </AuthPageShell>
  );
}
