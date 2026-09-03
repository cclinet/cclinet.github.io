import { type Locale, defaultLocale, locales } from "@/i18n/config";
import { getRelativeLocaleUrl } from "astro:i18n";

export function isLocale(locale: string | undefined): locale is Locale {
  return locales.some((candidate) => candidate === locale);
}

export function getLocale(locale: string | undefined): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export function getLocalePath(locale: Locale) {
  if (locale === defaultLocale) {
    return undefined;
  }
  return locale;
}

export function getLocalizedPath(locale: Locale, pathname: string) {
  return getRelativeLocaleUrl(locale, pathname);
}

export function getLocalizedFilePath(locale: Locale, pathname: string) {
  return getLocalizedPath(locale, pathname).replace(/\/$/, "");
}

export function getLocaleStaticPaths() {
  return locales.map((locale) => ({
    params: { locale: getLocalePath(locale) },
    props: { locale },
  }));
}
