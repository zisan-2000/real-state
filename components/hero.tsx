"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Search, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/i18n-config"

interface HeroProps {
  dictionary: any
  lang: Locale
}

export default function Hero({ dictionary, lang }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const isRtl = lang === "ar"

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920&text=Luxury+Real+Estate"
          alt="Luxury Real Estate"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight gold-text sm:text-5xl md:text-6xl">
            {dictionary.hero.title}
          </h1>
          <p className="mb-8 text-xl text-muted-foreground">{dictionary.hero.subtitle}</p>

          {/* Search Bar */}
          <div className="relative mx-auto mb-12 max-w-2xl">
            <div className="flex items-center rounded-full bg-card/80 backdrop-blur-sm border border-border/30 p-1.5 shadow-lg">
              <div className="flex-1 flex items-center px-4">
                <MapPin className={`h-5 w-5 text-muted-foreground ${isRtl ? "ml-2" : "mr-2"}`} />
                <Input
                  type="text"
                  placeholder={dictionary.hero.searchPlaceholder}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  dir={isRtl ? "rtl" : "ltr"}
                />
              </div>
              <Button className="rounded-full bg-primary text-primary-foreground">
                <Search className="h-4 w-4 mr-2" />
                {dictionary.hero.searchButton}
              </Button>
            </div>
          </div>

          {/* Call to action buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground">
              {dictionary.navigation.properties}
            </Button>
            <Button variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
              {dictionary.common.contactUs}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
