"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MapPin,
  Compass,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { getDirection } from "@/lib/utils";

interface HeroSectionProps {
  dictionary: any;
  isRtl: boolean;
}

export default function HeroSection({ dictionary, isRtl }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const dir = getDirection(isRtl ? "ar" : "en");

  // Enhanced scroll animation with framer-motion
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const statsData = [
    {
      icon: <TrendingUp className="h-5 w-5 text-teal-300" />,
      value: "15%",
      label: isRtl ? "معدل النمو السنوي" : "Annual Growth Rate",
    },
    {
      icon: <Compass className="h-5 w-5 text-teal-300" />,
      value: "20+",
      label: isRtl ? "مشاريع استثمارية" : "Investment Projects",
    },
    {
      icon: <MapPin className="h-5 w-5 text-teal-300" />,
      value: "12",
      label: isRtl ? "منطقة تطوير" : "Development Regions",
    },
    {
      icon: <Calendar className="h-5 w-5 text-teal-300" />,
      value: "2030",
      label: isRtl ? "رؤية المملكة" : "Vision Year",
    },
  ];

  const scrollToNextSection = () => {
    if (heroRef.current) {
      const nextSection = heroRef.current.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      dir={dir}
    >
      {/* Background with parallax effect using framer-motion */}
      <motion.div className="absolute inset-0 z-0" style={{ y, opacity }}>
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Saudi Real Estate"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-teal-900/50" />
      </motion.div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-0 opacity-40">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-teal-400"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * -20 - 10 + "%"],
              opacity: [null, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 10 + 10,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container relative z-0 mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-5xl text-center"
        >
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mb-6 inline-block rounded-full bg-gradient-to-r from-teal-400/20 to-emerald-500/20 px-4 py-1 backdrop-blur-md"
          >
            <span className="text-sm font-medium text-teal-300">
              {isRtl
                ? "مستقبل الاستثمار العقاري"
                : "The Future of Real Estate Investment"}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-6 bg-gradient-to-r from-teal-200 to-emerald-400 bg-clip-text text-transparent text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl"
          >
            {dictionary.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mx-auto mb-8 max-w-2xl text-lg text-gray-300"
          >
            {isRtl
              ? "استكشف مستقبل الاستثمار العقاري في المملكة العربية السعودية، حيث تلتقي الرؤية والابتكار لخلق فرص غير مسبوقة."
              : "Explore the future of real estate investment in Saudi Arabia, where vision and innovation come together to create unprecedented opportunities."}
          </motion.p>

          {/* Statistics Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="rounded-xl border border-teal-500/10 bg-teal-900/10 p-3 text-white shadow-md backdrop-blur-sm"
              >
                <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  {stat.icon}
                  <span className="text-xl font-bold text-teal-300">
                    {stat.value}
                  </span>
                </div>
                <p className="mt-1 text-xs text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision & Investment Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-10 mt-6 grid gap-6 sm:grid-cols-2"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-900/20 to-emerald-900/10 p-6 text-white shadow-md backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-teal-300">
                {dictionary.vision}
              </h3>
              <p className="mt-2 text-gray-200">
                {isRtl
                  ? "سجل رؤيتك العقارية وكن جزءًا من مستقبل التطوير العقاري في المملكة. نحن نسعى لبناء مستقبل مستدام يجمع بين الابتكار والأصالة."
                  : "Register your real estate vision and be part of the future of development in the Kingdom. We're building a sustainable future that combines innovation with tradition."}
              </p>
              <motion.div
                className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                animate={{ width: ["0%", "40%"] }}
                transition={{ duration: 1, delay: 1.5 }}
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-900/20 to-emerald-900/10 p-6 text-white shadow-md backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold text-teal-300">
                {dictionary.investment}
              </h3>
              <p className="mt-2 text-gray-200">
                {isRtl
                  ? "اكتشف فرص استثمارية متميزة في مختلف مناطق المملكة العربية السعودية. استفد من النمو الاقتصادي المستمر وكن جزءًا من القصة."
                  : "Discover premium investment opportunities across various regions of Saudi Arabia. Benefit from continuous economic growth and become part of the story."}
              </p>
              <motion.div
                className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                animate={{ width: ["0%", "40%"] }}
                transition={{ duration: 1, delay: 1.7 }}
              />
            </motion.div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row rtl:space-x-reverse"
          >
            <Button
              size="lg"
              className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-md hover:from-teal-600 hover:to-emerald-700 group"
            >
              <motion.span
                className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">{dictionary.explore}</span>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-teal-500/30 text-teal-200 backdrop-blur-sm hover:bg-teal-900/20"
            >
              {dictionary.contact}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={scrollToNextSection}
        >
          <div className="flex flex-col items-center">
            <span className="mb-2 text-sm font-light text-teal-200">
              {dictionary.scrollDown}
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="h-6 w-6 text-teal-300" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
