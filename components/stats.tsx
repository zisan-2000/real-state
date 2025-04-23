"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Building, Users, MapPin, Award } from "lucide-react"
import type { Locale } from "@/i18n-config"

interface StatsProps {
  dictionary: any
  lang: Locale
}

export default function Stats({ dictionary, lang }: StatsProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [controls, isInView])

  const stats = [
    {
      icon: Building,
      value: "500+",
      label: dictionary.stats.properties,
      color: "text-primary",
    },
    {
      icon: Users,
      value: "1,200+",
      label: dictionary.stats.clients,
      color: "text-accent",
    },
    {
      icon: MapPin,
      value: "20+",
      label: dictionary.stats.cities,
      color: "text-blue-400",
    },
    {
      icon: Award,
      value: "15+",
      label: dictionary.stats.awards,
      color: "text-rose-400",
    },
  ]

  return (
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <div className="luxury-card luxury-gradient overflow-hidden">
          <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.2 },
                  },
                }}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className={`mb-4 rounded-full bg-card p-3 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-3xl font-bold text-accent">{stat.value}</div>
                <div className="mt-1 text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
