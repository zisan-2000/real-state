"use client";

import { useState, useEffect } from "react";
import type { Locale } from "@/i18n-config";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import MapSection from "@/components/map-section";
import ServicesSection from "@/components/services-section";
import ProjectsCarousel from "@/components/projects-carousel";
import CalendarSection from "@/components/calendar-section";
import PartnersSection from "@/components/partners-section";
import ThemeToggle from "@/components/theme-toggle";
import PropertyMasterDetail from "@/components/property-listing/property-master-detail";
import PropertyMapSection from "@/components/property-map-section";
import { motion } from "framer-motion";
import { getDirection } from "@/lib/utils";

export default function LandingPage({
  dictionary,
  lang,
}: {
  dictionary: any;
  lang: Locale;
}) {
  const [mounted, setMounted] = useState(false);
  const isRtl = lang === "ar";
  const dir = getDirection(lang);

  useEffect(() => {
    setMounted(true);

    // Set the dir attribute on the document element to ensure proper RTL/LTR rendering
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;

    // Add the appropriate class to the body for additional styling
    if (isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [isRtl, dir, lang]);

  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div dir={dir} className={isRtl ? "rtl" : "ltr"}>
      <HeroSection dictionary={dictionary.hero} isRtl={isRtl} />
      <StatsSection dictionary={dictionary.stats} isRtl={isRtl} />

      {/* <PartnersSection dictionary={dictionary.partners} isRtl={isRtl} /> */}
      <PropertyMasterDetail isRtl={isRtl} dictionary={dictionary} />
      <PropertyMapSection isRtl={isRtl} dictionary={dictionary} />
      <MapSection dictionary={dictionary.map} isRtl={isRtl} />
      <ServicesSection dictionary={dictionary.services} isRtl={isRtl} />
      <ProjectsCarousel dictionary={dictionary.projects} isRtl={isRtl} />
      <CalendarSection dictionary={dictionary.calendar} isRtl={isRtl} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className={`fixed bottom-6 ${isRtl ? "left-6" : "right-6"} z-50`}
      >
        <ThemeToggle dictionary={dictionary.theme} />
      </motion.div>
    </div>
  );
}
