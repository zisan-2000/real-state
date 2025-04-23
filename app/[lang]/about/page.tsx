// app/[lang]/about/page.tsx (Server Component)

import { getDictionary } from "@/dictionaries";
import type { Locale } from "@/i18n-config";
import AboutClient from "./AboutClient";

export default async function AboutPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  return <AboutClient lang={lang} dictionary={dictionary} />;
}
