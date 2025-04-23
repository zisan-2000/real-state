import { getDictionary } from "@/dictionaries"
import type { Locale } from "@/i18n-config"
import LandingPage from "@/components/landing-page"

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return <LandingPage dictionary={dictionary} lang={lang} />
}
