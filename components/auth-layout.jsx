"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Shared branded wrapper for all auth pages (login, register, forgot-password, reset-password).
 * Renders the same radial blue gradient background, centered card, and Clutch branding.
 */
export function AuthLayout({ children, title, subtitle }) {
  return (
    <div
      className={cn(
        "flex min-h-dvh flex-col items-center justify-center px-4 py-12 text-slate-900",
        "bg-[#f6f8fc] bg-[radial-gradient(ellipse_120%_80%_at_50%_-12%,rgba(0,112,255,0.09),transparent_55%)]"
      )}
    >
      {/* Decorative top hairline — matches the main shell */}
      <div className="pointer-events-none fixed inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-brand/35 to-transparent" />

      {/* Brand mark */}
      <Link href="/login" className="mb-8 flex items-center gap-2.5">
        <div className="grid size-10 place-content-center rounded-xl border border-brand/25 bg-gradient-to-br from-brand/[0.07] to-white shadow-sm shadow-[0_1px_10px_-3px_rgba(0,112,255,0.12)]">
          <img
            src="/clutch-mark.png"
            alt="Clutch mark"
            className="size-5 object-contain"
          />
        </div>
        <div className="leading-tight">
          <span className="block text-lg font-bold tracking-tight text-brand">
            Clutch.
          </span>
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-slate-900">
            Australia
          </p>
        </div>
      </Link>

      {/* Card */}
      <div className="w-full max-w-[26rem] rounded-2xl border border-slate-200/95 bg-white/90 p-7 shadow-[0_24px_50px_-32px_rgba(0,112,255,0.22)] backdrop-blur-sm sm:p-9">
        {title ? (
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>

      {/* Bottom glow */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand/[0.03] to-transparent" />
    </div>
  );
}

/** Shared input styles used across all auth forms. */
export const authInputClass =
  "block w-full rounded-lg border border-slate-200/95 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none ring-brand/15 placeholder:text-slate-400 focus:border-brand/35 focus:ring-2 transition-shadow";

/** Shared label styles. */
export const authLabelClass =
  "block text-[11px] font-semibold uppercase tracking-wide text-slate-500 mb-1.5";
