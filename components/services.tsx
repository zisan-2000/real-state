"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Building, Search, Key, Briefcase, Shield, Coins } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Locale } from "@/i18n-config"

interface ServicesProps {
  dictionary: any
  lang: Locale
}

export default function Services({ dictionary, lang }: ServicesProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  const services = [
    {
      icon: Search,
      title: lang === "ar" ? "البحث عن العقارات" : "Property Search",
      description:
        lang === "ar"
          ? "نساعدك في العثور على العقار المثالي الذي يلبي جميع متطلباتك واحتياجاتك"
          : "We help you find the perfect property that meets all your requirements and needs",
      color: "text-primary",
    },
    {
      icon: Building,
      title: lang === "ar" ? "تطوير العقارات" : "Property Development",
      description:
        lang === "ar"
          ? "خدمات تطوير عقاري متكاملة من التصميم إلى البناء والتشطيب بأعلى المعايير"
          : "Comprehensive development services from design to construction and finishing with the highest standards",
      color: "text-accent",
    },
    {
      icon: Key,
      title: lang === "ar" ? "إدارة العقارات" : "Property Management",
      description:
        lang === "ar"
          ? "نقدم خدمات إدارة شاملة لعقاراتك لضمان الحفاظ على قيمتها وتحقيق أقصى عائد استثماري"
          : "We provide comprehensive management services for your properties to ensure value preservation and maximum ROI",
      color: "text-blue-400",
    },
    {
      icon: Briefcase,
      title: lang === "ar" ? "الاستشارات العقارية" : "Real Estate Consulting",
      description:
        lang === "ar"
          ? "استشارات متخصصة في السوق العقاري لمساعدتك على اتخاذ القرارات الاستثمارية الصحيحة"
          : "Specialized market consulting to help you make the right investment decisions",
      color: "text-rose-400",
    },
    {
      icon: Shield,
      title: lang === "ar" ? "الخدمات القانونية" : "Legal Services",
      description:
        lang === "ar"
          ? "خدمات قانونية متكاملة لضمان سلامة جميع المعاملات العقارية وحماية حقوقك"
          : "Comprehensive legal services to ensure the safety of all real estate transactions and protect your rights",
      color: "text-emerald-400",
    },
    {
      icon: Coins,
      title: lang === "ar" ? "التمويل العقاري" : "Real Estate Financing",
      description:
        lang === "ar"
          ? "نساعدك في الحصول على أفضل خيارات التمويل العقاري بشروط تناسب احتياجاتك"
          : "We help you get the best real estate financing options with terms that suit your needs",
      color: "text-purple-400",
    },
  ]

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
    <section ref={ref} className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold gold-text">{lang === "ar" ? "خدماتنا" : "Our Services"}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {lang === "ar"
              ? "نقدم مجموعة شاملة من الخدمات العقارية المصممة لتلبية احتياجاتك"
              : "We offer a comprehensive range of real estate services designed to meet your needs"}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={item}>
              <Card
                className="luxury-card h-full border-t-4 transition-all hover:shadow-lg dark:hover:shadow-primary/5"
                style={{ borderTopColor: `var(--${service.color})` }}
              >
                <CardContent className="flex h-full flex-col p-6">
                  <div className="mb-4">
                    <service.icon className={`h-10 w-10 ${service.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="mt-auto text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
