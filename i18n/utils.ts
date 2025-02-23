import { defaultLocale } from "@/consts";

export function getLocalePath(locale: string) {
  if (locale === defaultLocale) {
    return undefined;
  }
  return locale;
}
