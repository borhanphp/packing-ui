/**
 * True when the current pathname is this nav href or nested under it
 * (e.g. `/reference-data/countries` matches `/reference-data`).
 * `/` only matches exactly so the whole app is not treated as Overview.
 */
export function pathnameMatchesHref(pathname, href) {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  return pathname.startsWith(`${href}/`);
}
