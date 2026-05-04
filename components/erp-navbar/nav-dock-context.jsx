"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

/** Where the main navigation docks in the viewport. */

const ALLOWED = ["vertical-start", "vertical-end", "horizontal-top", "horizontal-bottom"];

function parseDock(raw) {
  if (!raw) return null;
  return ALLOWED.includes(raw) ? raw : null;
}

const NavDockContext = createContext(null);

const DEFAULT_STORAGE_KEY = "packing-erp-nav-dock";

export function NavDockProvider({
  children,
  /** Override for embedding in another app (per-app layout preference persistence). */
  storageKey = DEFAULT_STORAGE_KEY,
  defaultDock = "vertical-start",
}) {
  const [dock, setDockState] = useState(defaultDock);
  const [verticalExpanded, setVerticalExpanded] = useState(false);

  useEffect(() => {
    const parsed = parseDock(localStorage.getItem(storageKey));
    if (parsed) setDockState(parsed);
  }, [storageKey]);

  const storageKeyRef = useRef(storageKey);
  storageKeyRef.current = storageKey;

  const setDock = useCallback((next) => {
    setDockState(next);
    localStorage.setItem(storageKeyRef.current, next);
  }, []);

  const value = useMemo(
    () => ({
      dock,
      setDock,
      isVertical: dock === "vertical-start" || dock === "vertical-end",
      verticalExpanded,
      setVerticalExpanded,
    }),
    [dock, setDock, verticalExpanded]
  );

  return <NavDockContext.Provider value={value}>{children}</NavDockContext.Provider>;
}

export function useNavDock() {
  const ctx = useContext(NavDockContext);
  if (!ctx) throw new Error("useNavDock must be used within NavDockProvider");
  return ctx;
}
