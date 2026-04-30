export const AUTH_STORAGE_KEY = "mahonys_ems_auth";

export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(AUTH_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setAuthenticated() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, "1");
  } catch {
    //
  }
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    //
  }
}

/** If NEXT_PUBLIC_LOGIN_USERNAME and NEXT_PUBLIC_LOGIN_PASSWORD are set, credentials must match (demo / client-visible). Otherwise any non-empty username and password succeeds. */
export function validateLoginCredentials(username, password) {
  const u = (username ?? "").trim();
  const p = password ?? "";
  const expectedUser =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_LOGIN_USERNAME : "";
  const expectedPass =
    typeof process !== "undefined" ? process.env.NEXT_PUBLIC_LOGIN_PASSWORD : "";
  if (expectedUser && expectedPass) {
    return u === expectedUser && p === expectedPass;
  }
  return u.length > 0 && p.length > 0;
}
