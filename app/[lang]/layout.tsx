import type React from "react"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/dictionaries"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDirection } from "@/lib/utils"

export default async function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)
  const isRtl = lang === "ar"
  const dir = getDirection(lang)

  return (
    <div className={isRtl ? "rtl" : "ltr"} dir={dir} lang={lang}>
      <Header dictionary={dictionary} lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer dictionary={dictionary} lang={lang} />
    </div>
  )
}
