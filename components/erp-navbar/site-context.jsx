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

import { PACKING_SITES } from "./packing-defaults";

const SiteContext = createContext(null);

const DEFAULT_STORAGE_KEY = "packing-erp-site";

function parseStoredId(raw, sites) {
  if (!raw || !sites?.length) return null;
  return sites.some((s) => s.id === raw) ? raw : null;
}

export function SiteProvider({
  children,
  sites = PACKING_SITES,
  /** First matching site id when nothing valid is stored. */
  defaultSiteId,
  storageKey = DEFAULT_STORAGE_KEY,
}) {
  const sitesRef = useRef(sites);
  sitesRef.current = sites;

  const initialId =
    defaultSiteId && sites.some((s) => s.id === defaultSiteId)
      ? defaultSiteId
      : (sites[0]?.id ?? "");

  const [siteId, setSiteIdState] = useState(initialId);

  useEffect(() => {
    const parsed = parseStoredId(localStorage.getItem(storageKey), sitesRef.current);
    if (parsed) {
      setSiteIdState(parsed);
      return;
    }
    const fallback =
      (defaultSiteId && sitesRef.current.some((s) => s.id === defaultSiteId)
        ? defaultSiteId
        : sitesRef.current[0]?.id) ?? "";
    setSiteIdState(fallback);
  }, [storageKey, defaultSiteId]);

  useEffect(() => {
    if (!siteId || !sites.length) return;
    if (!sites.some((s) => s.id === siteId)) {
      const next = sites[0]?.id ?? "";
      setSiteIdState(next);
      if (next) localStorage.setItem(storageKey, next);
    }
  }, [sites, siteId, storageKey]);

  const storageKeyRef = useRef(storageKey);
  storageKeyRef.current = storageKey;

  const setSiteId = useCallback((next) => {
    if (!sitesRef.current.some((s) => s.id === next)) return;
    setSiteIdState(next);
    localStorage.setItem(storageKeyRef.current, next);
  }, []);

  const value = useMemo(() => {
    const site = sites.find((s) => s.id === siteId) ?? sites[0] ?? null;
    return {
      sites,
      siteId: site?.id ?? "",
      site,
      setSiteId,
    };
  }, [sites, siteId, setSiteId]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
