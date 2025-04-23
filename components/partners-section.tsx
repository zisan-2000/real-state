"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { getDirection } from "@/lib/utils"

interface PartnersSectionProps {
  dictionary: any
  isRtl: boolean
}

export default function PartnersSection({ dictionary, isRtl }: PartnersSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const dir = getDirection(isRtl ? "ar" : "en")

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section ref={ref} className="bg-muted/30 py-16 md:py-24" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{dictionary.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5"
        >
          {dictionary.partners.map((partner: string, index: number) => (
            <motion.div key={index} variants={item} className="flex items-center justify-center">
              <div className="group relative h-24 w-full max-w-[180px] overflow-hidden rounded-lg bg-background p-4 transition-all duration-300 hover:shadow-md">
                <div className="flex h-full w-full items-center justify-center">
                  <Image
                    src={`/placeholder.svg?height=80&width=160&text=${partner}`}
                    alt={partner}
                    width={160}
                    height={80}
                    className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
