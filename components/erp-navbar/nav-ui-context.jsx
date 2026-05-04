"use client";

import { createContext, useContext, useMemo } from "react";

import {
  PACKING_NAV_DEFAULT_UI,
  PACKING_NAV_FOOTER,
  PACKING_NAV_MODULES,
} from "./packing-defaults";

const ErpNavUiContext = createContext(null);

function mapSectionItems(items) {
  return items.map((item) => ({
    name: item.title,
    href: item.path,
    icon: item.icon,
    children: item.children?.map((child) => ({ name: child.title, href: child.path })),
  }));
}

function mapFooterItems(items) {
  return items.map((item) => ({
    name: item.title,
    href: item.path,
    icon: item.icon,
  }));
}

export function ErpNavUiProvider({
  children,
  modules,
  footerNav,
  brandTitle,
  brandSubtitle,
  brandIconSrc,
  userName,
  userEmail,
  userInitials,
  avatarSrc,
  accountSettingsHref,
  branding,
  sections,
  user,
}) {
  const mergedModules = sections?.main ? mapSectionItems(sections.main) : modules ?? PACKING_NAV_MODULES;
  const mergedFooter = sections?.bottom ? mapFooterItems(sections.bottom) : footerNav ?? PACKING_NAV_FOOTER;

  const value = useMemo(
    () => ({
      modules: mergedModules,
      footerNav: mergedFooter,
      brandTitle: branding?.title ?? brandTitle ?? PACKING_NAV_DEFAULT_UI.brandTitle,
      brandSubtitle: branding?.subtitle ?? brandSubtitle ?? PACKING_NAV_DEFAULT_UI.brandSubtitle,
      brandIconSrc: branding?.iconSrc ?? brandIconSrc ?? PACKING_NAV_DEFAULT_UI.brandIconSrc,
      userName: user?.name ?? userName ?? PACKING_NAV_DEFAULT_UI.userName,
      userEmail: user?.email ?? userEmail ?? PACKING_NAV_DEFAULT_UI.userEmail,
      userInitials: user?.initials ?? userInitials ?? PACKING_NAV_DEFAULT_UI.userInitials,
      avatarSrc: user?.avatarSrc ?? avatarSrc ?? PACKING_NAV_DEFAULT_UI.avatarSrc,
      accountSettingsHref:
        user?.accountPath ?? accountSettingsHref ?? PACKING_NAV_DEFAULT_UI.accountSettingsHref,
    }),
    [
      mergedModules,
      mergedFooter,
      branding,
      brandTitle,
      brandSubtitle,
      brandIconSrc,
      user,
      userName,
      userEmail,
      userInitials,
      avatarSrc,
      accountSettingsHref,
    ]
  );

  return <ErpNavUiContext.Provider value={value}>{children}</ErpNavUiContext.Provider>;
}

export function useErpNavUi() {
  const ctx = useContext(ErpNavUiContext);
  if (!ctx) throw new Error("ERP nav UI hooks require ErpNavbar (or ErpNavUiProvider) as an ancestor.");
  return ctx;
}
