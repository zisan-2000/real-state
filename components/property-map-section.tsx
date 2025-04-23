"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import PropertyMap from "@/components/property-map"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { getDirection } from "@/lib/utils"

interface PropertyMapSectionProps {
  isRtl?: boolean
  dictionary?: any
}

export default function PropertyMapSection({ isRtl = false, dictionary }: PropertyMapSectionProps) {
  const [mapView, setMapView] = useState<"full" | "split">("split")
  const dir = getDirection(isRtl ? "ar" : "en")

  // Translations (fallback if dictionary not provided)
  const t = {
    title: dictionary?.map?.title || "Explore Properties on Map",
    subtitle: dictionary?.map?.subtitle || "Find your dream property in the perfect location",
    viewFullMap: dictionary?.map?.viewFullMap || "View Full Map",
    viewSplitView: dictionary?.map?.viewSplitView || "View Split View",
    listView: dictionary?.map?.listView || "List View",
    mapView: dictionary?.map?.mapView || "Map View",
  }

  return (
    <section className={cn("bg-muted/30 py-16 md:py-24")} dir={dir}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{t.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {/* View Toggle Buttons - Desktop */}
        <div className="mb-6 hidden justify-end md:flex">
          <div className="inline-flex rounded-md shadow-sm">
            <Button
              variant={mapView === "split" ? "default" : "outline"}
              className="rounded-r-none"
              onClick={() => setMapView("split")}
            >
              {t.viewSplitView}
            </Button>
            <Button
              variant={mapView === "full" ? "default" : "outline"}
              className="rounded-l-none"
              onClick={() => setMapView("full")}
            >
              {t.viewFullMap}
            </Button>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="mb-6 md:hidden">
          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="list">{t.listView}</TabsTrigger>
              <TabsTrigger value="map">{t.mapView}</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <div className="h-[400px] overflow-y-auto rounded-lg border bg-card p-4">
                <PropertyListFallback isRtl={isRtl} />
              </div>
            </TabsContent>
            <TabsContent value="map">
              <div className="h-[400px] overflow-hidden rounded-lg border">
                <PropertyMap />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          <div
            className={cn(
              "grid gap-6 rounded-lg border bg-card shadow-sm",
              mapView === "split" ? "grid-cols-12" : "grid-cols-1",
            )}
          >
            {mapView === "split" && (
              <div className="col-span-4 h-[600px] overflow-y-auto border-r p-4">
                <PropertyListFallback isRtl={isRtl} />
              </div>
            )}
            <div className={mapView === "split" ? "col-span-8" : "col-span-12"}>
              <div className="h-[600px]">
                <PropertyMap />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Fallback property list component
function PropertyListFallback({ isRtl }: { isRtl: boolean }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex gap-3 rounded-lg border p-3 hover:bg-accent/50">
          <div className="h-20 w-20 flex-shrink-0 rounded-md bg-muted"></div>
          <div className="flex-1">
            <div className="mb-1 h-5 w-24 rounded bg-muted"></div>
            <div className="mb-2 h-4 w-full rounded bg-muted"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-8 rounded bg-muted"></div>
              <div className="h-4 w-8 rounded bg-muted"></div>
              <div className="h-4 w-16 rounded bg-muted"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
