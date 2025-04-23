"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/i18n-config"

interface ContactCtaProps {
  dictionary: any
  lang: Locale
}

export default function ContactCta({ dictionary, lang }: ContactCtaProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="luxury-card overflow-hidden"
        >
          <div className="relative p-8 md:p-12">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/10"></div>

            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold gold-text md:text-4xl">
                {lang === "ar" ? "هل تبحث عن عقار فاخر؟" : "Looking for a Luxury Property?"}
              </h2>
              <p className="mb-8 text-muted-foreground">
                {lang === "ar"
                  ? "تواصل مع فريقنا من الخبراء العقاريين للحصول على المساعدة في العثور على العقار المثالي"
                  : "Contact our team of real estate experts to get help finding your perfect property"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  {dictionary.common.contactUs}
                </Button>
                <Button variant="outline" size="lg" className="border-accent/50 text-accent hover:bg-accent/10">
                  {lang === "ar" ? "استكشف العقارات" : "Explore Properties"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
