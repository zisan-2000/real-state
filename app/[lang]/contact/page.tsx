import { getDictionary } from "@/dictionaries"
import type { Locale } from "@/i18n-config"
import ContactForm from "@/components/contact-form"

export default async function ContactPage({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const dictionary = await getDictionary(lang)

  return (
    <div className="container mx-auto px-4 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold gold-text">{dictionary.navigation.contact}</h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "نحن هنا للإجابة على جميع استفساراتك. يرجى ملء النموذج أدناه وسنتواصل معك قريبًا."
              : "We're here to answer all your inquiries. Please fill out the form below and we'll get back to you soon."}
          </p>
        </div>

        <ContactForm dictionary={dictionary} lang={lang} />
      </div>
    </div>
  )
}
