"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { getDirection } from "@/lib/utils"

interface ProjectsCarouselProps {
  dictionary: any
  isRtl: boolean
}

export default function ProjectsCarousel({ dictionary, isRtl }: ProjectsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [width, setWidth] = useState(0)
  const carousel = useRef<HTMLDivElement>(null)
  const dir = getDirection(isRtl ? "ar" : "en")

  const projects = dictionary.items

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
    }
  }, [])

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex === projects.length - 1 ? 0 : prevIndex + 1))
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? projects.length - 1 : prevIndex - 1))
  }

  return (
    <section className="bg-muted/30 py-16 md:py-24" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{dictionary.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: isRtl ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 100 : -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="overflow-hidden border-0 bg-transparent shadow-none">
                <CardContent className="grid grid-cols-1 gap-6 p-0 md:grid-cols-2">
                  <div className="relative h-64 overflow-hidden rounded-lg md:h-80">
                    <Image
                      src={`/sa1.jpg`}
                      alt={projects[currentIndex].title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white">
                        {projects[currentIndex].location}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-4">
                    <h3 className="mb-3 text-2xl font-bold text-primary">{projects[currentIndex].title}</h3>
                    <div className="mb-4 grid grid-cols-2 gap-2">
                      <div className="rounded-md bg-muted p-2">
                        <p className="text-xs text-muted-foreground">{isRtl ? "المساحة" : "Area"}</p>
                        <p className="font-medium">{projects[currentIndex].area}</p>
                      </div>
                      <div className="rounded-md bg-muted p-2">
                        <p className="text-xs text-muted-foreground">{isRtl ? "الوحدات" : "Units"}</p>
                        <p className="font-medium">{projects[currentIndex].units}</p>
                      </div>
                    </div>
                    <p className="mb-6 text-muted-foreground">{projects[currentIndex].description}</p>
                    <Button className="mt-auto bg-primary text-primary-foreground">{dictionary.viewDetails}</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prevProject} className="h-10 w-10 rounded-full">
              {isRtl ? <ChevronRight className="h-5 w-5 arrow-icon-rtl" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>

            <div className="flex gap-2">
              {projects.map((_: any, index: number) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full ${
                    currentIndex === index ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextProject} className="h-10 w-10 rounded-full">
              {isRtl ? <ChevronLeft className="h-5 w-5 arrow-icon-rtl" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
