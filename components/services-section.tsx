"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building, Map, Users, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getDirection } from "@/lib/utils";

interface ServicesSectionProps {
  dictionary: any;
  isRtl: boolean;
}

export default function ServicesSection({
  dictionary,
  isRtl,
}: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const dir = getDirection(isRtl ? "ar" : "en");

  const icons = [
    { icon: Building, color: "text-amber-400", border: "border-amber-500" },
    { icon: Map, color: "text-emerald-400", border: "border-emerald-500" },
    { icon: Users, color: "text-blue-400", border: "border-blue-500" },
    { icon: BarChart3, color: "text-purple-400", border: "border-purple-500" },
  ];

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 bg-gradient-to-b from-black/70 via-black/50 to-teal-900/40"
      dir={dir}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-teal-300 sm:text-5xl mb-4">
            {dictionary.title}
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-sm sm:text-base">
            {dictionary.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {dictionary.items.map((service: any, index: number) => {
            const Icon = icons[index % icons.length].icon;
            const iconColor = icons[index % icons.length].color;
            const borderColor = icons[index % icons.length].border;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  className={`h-full border backdrop-blur-md bg-white/5 border-t-4 ${borderColor} transition-all hover:shadow-lg`}
                >
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4">
                      <Icon className={`h-10 w-10 ${iconColor}`} />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {service.title}
                    </h3>
                    <p className="mt-auto text-muted-foreground">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Optional Animated Background Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-teal-400 opacity-30"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.3 + 0.3,
            }}
            animate={{
              y: [null, Math.random() * -30 - 10 + "%"],
              opacity: [null, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: Math.random() * 15 + 8,
              ease: "linear",
            }}
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
            }}
          />
        ))}
      </div>
    </section>
  );
}
