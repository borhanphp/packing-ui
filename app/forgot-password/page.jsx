"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  AuthLayout,
  authInputClass,
  authLabelClass,
} from "@/components/auth-layout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to auth API
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="Enter your email and we'll send a reset link"
    >
      {submitted ? (
        <div className="space-y-5 text-center">
          {/* Success state */}
          <div className="mx-auto grid size-14 place-content-center rounded-full bg-brand/10">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-7 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Check your inbox</p>
            <p className="mt-1 text-sm text-slate-500">
              We sent a password reset link to{" "}
              <span className="font-semibold text-slate-700">{email}</span>
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="mx-auto h-9"
            onClick={() => setSubmitted(false)}
          >
            Try another email
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="forgot-email" className={authLabelClass}>
              Email address
            </label>
            <input
              id="forgot-email"
              type="email"
              required
              autoComplete="email"
              className={authInputClass}
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full h-10 text-sm font-semibold">
            Send reset link
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Remember your password?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand hover:text-brand-ink transition-colors"
        >
          Back to sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
