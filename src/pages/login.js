"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import {

  AuthPageShell,

  authInputStyle,

  authLabelStyle,

} from "../components/AuthPageShell";

import {

  isAuthenticated,

  setAuthenticated,

  validateLoginCredentials,

} from "../utils/authStorage";



const forgotLinkStyle = {

  color: "#2563eb",

  fontSize: 13,

  fontWeight: 500,

  textDecoration: "none",

};



export default function LoginPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [submitting, setSubmitting] = useState(false);



  useEffect(() => {

    if (!router.isReady) return;

    if (isAuthenticated()) router.replace("/incoming");

  }, [router.isReady, router]);



  function handleSubmit(e) {

    e.preventDefault();

    setError("");

    if (!validateLoginCredentials(username, password)) {

      setError(

        "Invalid username or password. Any non-empty credentials work unless optional env vars are set.",

      );

      return;

    }

    setSubmitting(true);

    setAuthenticated();

    router.replace("/incoming");

  }



  return (

    <AuthPageShell headTitle="Sign in — Mahonys EMS" subtitle="Sign in to continue">

      <form

        onSubmit={handleSubmit}

        style={{

          background: "#ffffff",

          borderRadius: 16,

          padding: "28px 28px 24px",

          border: "1px solid #bfdbfe",

          boxShadow: "0 4px 32px rgba(37, 99, 235, 0.1)",

        }}

      >

        <div style={{ marginBottom: 20 }}>

          <label htmlFor="login-username" style={authLabelStyle}>

            Username

          </label>

          <input

            id="login-username"

            name="username"

            autoComplete="username"

            value={username}

            onChange={(e) => setUsername(e.target.value)}

            disabled={submitting}

            style={authInputStyle}

            placeholder=""

          />

        </div>

        <div style={{ marginBottom: 14 }}>

          <label htmlFor="login-password" style={authLabelStyle}>

            Password

          </label>

          <input

            id="login-password"

            name="password"

            type="password"

            autoComplete="current-password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            disabled={submitting}

            style={authInputStyle}

          />

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>

            <Link href="/forgot-password" style={forgotLinkStyle}>

              Forgot password?

            </Link>

          </div>

        </div>



        {error ? (

          <p

            style={{

              margin: "0 0 14px",

              fontSize: 13,

              color: "#b91c1c",

              lineHeight: 1.45,

            }}

          >

            {error}

          </p>

        ) : null}



        <button

          type="submit"

          disabled={submitting}

          style={{

            width: "100%",

            padding: "14px 16px",

            borderRadius: 8,

            border: "none",

            background: submitting ? "#93c5fd" : "#2563eb",

            color: "#fff",

            fontSize: 15,

            fontWeight: 600,

            cursor: submitting ? "default" : "pointer",

          }}

        >

          {submitting ? "Signing in…" : "Sign in"}

        </button>

      </form>

    </AuthPageShell>

  );

}


