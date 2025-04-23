"use client"
import { motion } from "framer-motion"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import type { Locale } from "@/i18n-config"
import { getDirection } from "@/lib/utils"

interface FeaturedPropertiesProps {
  dictionary: any
  lang: Locale
}

export default function FeaturedProperties({ dictionary, lang }: FeaturedPropertiesProps) {
  const isRtl = lang === "ar"
  const dir = getDirection(lang)

  // Sample properties data
  const properties = [
    {
      id: "1",
      title: isRtl ? "فيلا فاخرة مع إطلالة على البحر" : "Luxury Villa with Sea View",
      location: isRtl ? "الرياض، حي السفارات" : "Riyadh, Diplomatic Quarter",
      price: 7500000,
      bedrooms: 5,
      bathrooms: 6,
      area: 750,
      image: "/placeholder.svg?height=500&width=800&text=Luxury+Villa",
      isFeatured: true,
      isNew: false,
      isCertified: true,
    },
    {
      id: "2",
      title: isRtl ? "شقة بنتهاوس حديثة" : "Modern Penthouse Apartment",
      location: isRtl ? "جدة، الشاطئ" : "Jeddah, Corniche",
      price: 4200000,
      bedrooms: 3,
      bathrooms: 4,
      area: 320,
      image: "/placeholder.svg?height=500&width=800&text=Modern+Penthouse",
      isFeatured: false,
      isNew: true,
      isCertified: true,
    },
    {
      id: "3",
      title: isRtl ? "منزل عائلي مع حديقة" : "Family Home with Garden",
      location: isRtl ? "الدمام، حي الشاطئ" : "Dammam, Beach District",
      price: 3800000,
      bedrooms: 4,
      bathrooms: 3,
      area: 450,
      image: "/placeholder.svg?height=500&width=800&text=Family+Home",
      isFeatured: true,
      isNew: false,
      isCertified: false,
    },
    {
      id: "4",
      title: isRtl ? "فيلا مودرن بتصميم فريد" : "Modern Villa with Unique Design",
      location: isRtl ? "الخبر، حي اللؤلؤة" : "Khobar, Pearl District",
      price: 6300000,
      bedrooms: 6,
      bathrooms: 7,
      area: 820,
      image: "/placeholder.svg?height=500&width=800&text=Modern+Villa",
      isFeatured: false,
      isNew: true,
      isCertified: true,
    },
  ]

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold gold-text">{dictionary.hero.featuredProperties}</h2>
          <Button variant="ghost" className="text-primary">
            {dictionary.common.viewAll}
            {isRtl ? <ArrowLeft className="ml-2 h-4 w-4" /> : <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PropertyCard property={property} dictionary={dictionary} lang={lang} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
