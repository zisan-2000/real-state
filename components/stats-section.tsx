"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { getDirection } from "@/lib/utils";

interface StatsProps {
  dictionary: any;
  isRtl: boolean;
}

export default function StatsSection({ dictionary, isRtl }: StatsProps) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const dir = getDirection(isRtl ? "ar" : "en");

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const stats = [
    {
      title: dictionary.landArea,
      value: dictionary.landAreaValue,
      percentage: 85,
      desc: isRtl
        ? "إجمالي مساحة الأراضي المطورة"
        : "Total developed land area",
    },
    {
      title: dictionary.offers,
      value: dictionary.offersValue,
      percentage: 75,
      desc: isRtl ? "العروض الاستثمارية الحالية" : "Current investment offers",
    },
    {
      title: dictionary.developers,
      value: dictionary.developersValue,
      percentage: 65,
      desc: isRtl
        ? "شركات التطوير المتعاونة"
        : "Partner developers across regions",
    },
  ];

  return (
    <section
      ref={ref}
      dir={dir}
      className="relative bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className="mb-16 text-center text-4xl font-extrabold tracking-tight text-teal-300 sm:text-5xl"
        >
          {dictionary.sectionTitle ||
            (isRtl ? "إحصائيات المشاريع العقارية" : "Real Estate Statistics")}
        </motion.h2>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, delay: index * 0.3 },
                },
              }}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl border border-teal-500/20 bg-gradient-to-br from-teal-900/20 to-emerald-900/10 p-6 text-white shadow-md backdrop-blur-md transition-transform"
            >
              {/* Circular SVG Progress */}
              <div className="relative mx-auto mb-6 h-36 w-36">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                    fill="none"
                    className="stroke-teal-800/30"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    className="stroke-teal-400"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: stat.percentage / 100 }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold text-teal-300">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-300 mt-1">
                    {stat.percentage}%
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-teal-200">
                {stat.title}
              </h3>
              <p className="mt-2 text-sm text-gray-300">{stat.desc}</p>

              {/* Accent underline */}
              <motion.div
                className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                animate={{ width: ["0%", "50%"] }}
                transition={{ duration: 1, delay: 1 + index * 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
