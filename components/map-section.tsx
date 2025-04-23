"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { getDirection } from "@/lib/utils";

interface MapSectionProps {
  dictionary: any;
  isRtl: boolean;
}

export default function MapSection({ dictionary, isRtl }: MapSectionProps) {
  const [activeRegion, setActiveRegion] = useState<string | null>("riyadh");
  const dir = getDirection(isRtl ? "ar" : "en");

  const regions = dictionary?.map?.regions || {
    riyadh: {
      name: isRtl ? "الرياض" : "Riyadh",
      projects: isRtl ? "125 مشروع" : "125 Projects",
      area: isRtl ? "450,000 متر مربع" : "450,000 sqm",
    },
    makkah: {
      name: isRtl ? "مكة المكرمة" : "Makkah",
      projects: isRtl ? "98 مشروع" : "98 Projects",
      area: isRtl ? "320,000 متر مربع" : "320,000 sqm",
    },
    eastern: {
      name: isRtl ? "المنطقة الشرقية" : "Eastern Province",
      projects: isRtl ? "87 مشروع" : "87 Projects",
      area: isRtl ? "280,000 متر مربع" : "280,000 sqm",
    },
    madinah: {
      name: isRtl ? "المدينة المنورة" : "Madinah",
      projects: isRtl ? "45 مشروع" : "45 Projects",
      area: isRtl ? "150,000 متر مربع" : "150,000 sqm",
    },
  };

  const title =
    dictionary?.map?.title ||
    (isRtl ? "النشاط العقاري حسب المنطقة" : "Real Estate Activity by Region");
  const subtitle =
    dictionary?.map?.subtitle ||
    (isRtl
      ? "استكشف فرص الاستثمار في جميع أنحاء المملكة العربية السعودية"
      : "Explore investment opportunities across Saudi Arabia");

  const handleRegionHover = (region: string) => {
    setActiveRegion(region);
  };

  return (
    <section className="relative py-24 md:py-32" dir={dir}>
      {/* Matching HeroSection Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/50 to-teal-900/50" />

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-teal-300 sm:text-5xl mb-4">
            {title}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* SVG Map */}
          <div className="flex items-center justify-center">
            <svg
              width="500"
              height="400"
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-full"
            >
              <motion.path
                d="M100,200 L150,150 L250,100 L350,150 L400,200 L350,250 L250,300 L150,250 Z"
                className="text-muted/20 fill-current stroke-current"
                strokeWidth="2"
              />

              {Object.entries({
                riyadh: [250, 200, 25],
                makkah: [180, 250, 20],
                eastern: [320, 180, 22],
                madinah: [200, 170, 18],
              }).map(([key, [cx, cy, r]]) => (
                <motion.circle
                  key={key}
                  cx={cx}
                  cy={cy}
                  r={r}
                  className={`cursor-pointer ${
                    activeRegion === key ? "fill-primary/70" : "fill-primary/30"
                  }`}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleRegionHover(key)}
                />
              ))}

              {Object.entries({
                riyadh: [250, 200],
                makkah: [180, 250],
                eastern: [320, 180],
                madinah: [200, 170],
              }).map(([key, [x, y]]) => (
                <text
                  key={key}
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="fill-current text-xs font-semibold"
                >
                  {regions[key].name}
                </text>
              ))}
            </svg>
          </div>

          {/* Region Info Card */}
          <div className="flex items-center justify-center">
            {activeRegion && regions[activeRegion] && (
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
              >
                <Card className="border border-teal-500/20 bg-teal-900/10 shadow-md backdrop-blur-md">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-2xl font-bold text-primary">
                      {regions[activeRegion].name}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-background/50 p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {isRtl ? "المشاريع" : "Projects"}
                        </p>
                        <p className="mt-1 text-xl font-semibold text-white">
                          {regions[activeRegion].projects}
                        </p>
                      </div>
                      <div className="rounded-lg bg-background/50 p-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          {isRtl ? "المساحة" : "Area"}
                        </p>
                        <p className="mt-1 text-xl font-semibold text-white">
                          {regions[activeRegion].area}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 rounded-lg bg-background/50 p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        {isRtl
                          ? "الفرص الاستثمارية"
                          : "Investment Opportunities"}
                      </p>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <motion.div
                          className="h-full bg-gradient-to-r from-teal-400 to-emerald-500"
                          initial={{ width: 0 }}
                          animate={{
                            width:
                              activeRegion === "riyadh"
                                ? "80%"
                                : activeRegion === "makkah"
                                ? "70%"
                                : activeRegion === "eastern"
                                ? "65%"
                                : "50%",
                          }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
