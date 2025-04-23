"use client"

import Link from "next/link"
import { Building, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Locale } from "@/i18n-config"
import { getDirection } from "@/lib/utils"

interface FooterProps {
  dictionary: any
  lang: Locale
}

export default function Footer({ dictionary, lang }: FooterProps) {
  const isRtl = lang === "ar"
  const dir = getDirection(lang)
  const footerDict = dictionary.footer || {}

  return (
    <footer className="border-t border-border/20 bg-card" dir={dir}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About */}
          <div>
            <div className="mb-4 flex items-center">
              <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
              </div>
              <span className={`text-xl font-bold text-accent ${isRtl ? "mr-2" : "ml-2"}`}>
                {isRtl ? "مبادرة التطوير العقاري" : "Real Estate Initiative"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {footerDict.aboutText ||
                (isRtl
                  ? "نحن شركة رائدة في مجال العقارات، نقدم خدمات استثنائية للعملاء الباحثين عن تجربة سكنية فريدة."
                  : "We are a leading real estate company providing exceptional services to clients seeking a unique living experience.")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerDict.quickLinks?.title || (isRtl ? "روابط سريعة" : "Quick Links")}
            </h3>
            <ul className="space-y-2">
              {(footerDict.quickLinks?.links || ["About Us", "Services", "Projects", "News & Events", "Careers"]).map(
                (link: string, index: number) => (
                  <li key={index}>
                    <Link href="#" className="text-muted-foreground transition-colors hover:text-primary">
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerDict.contact?.title || (isRtl ? "اتصل بنا" : "Contact Us")}
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start">
                <MapPin className={`mt-0.5 h-4 w-4 shrink-0 text-primary ${isRtl ? "ml-2" : "mr-2"}`} />
                <span>
                  {footerDict.contact?.address || (isRtl ? "الرياض، المملكة العربية السعودية" : "Riyadh, Saudi Arabia")}
                </span>
              </div>
              <div className="flex items-center">
                <Phone className={`h-4 w-4 text-primary ${isRtl ? "ml-2" : "mr-2"}`} />
                <span>{footerDict.contact?.phone || "+966 11 000 0000"}</span>
              </div>
              <div className="flex items-center">
                <Mail className={`h-4 w-4 text-primary ${isRtl ? "ml-2" : "mr-2"}`} />
                <span>{footerDict.contact?.email || "info@realestate-initiative.sa"}</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              {footerDict.newsletter?.title || (isRtl ? "اشترك في نشرتنا الإخبارية" : "Subscribe to Newsletter")}
            </h3>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder={footerDict.newsletter?.placeholder || (isRtl ? "البريد الإلكتروني" : "Email Address")}
                className="bg-background/50"
                dir={dir}
              />
              <Button className="w-full bg-primary text-primary-foreground">
                {footerDict.newsletter?.button || (isRtl ? "اشتراك" : "Subscribe")}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-6 text-center text-sm text-muted-foreground">
          <p>{footerDict.copyright || "© 2023 Real Estate Development Initiative. All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
