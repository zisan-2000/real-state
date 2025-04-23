import "server-only"
import type { Locale } from "@/i18n-config"

// Import dictionaries directly
import enDict from "./en.json"
import arDict from "./ar.json"

const dictionaries = {
  en: enDict,
  ar: arDict,
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]
}
