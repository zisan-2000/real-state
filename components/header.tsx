"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Building, Menu, X } from "lucide-react"
import LanguageSwitcher from "@/components/language-switcher"
import type { Locale } from "@/i18n-config"
import { getDirection } from "@/lib/utils"

interface HeaderProps {
  dictionary: any
  lang: Locale
}

export default function Header({ dictionary, lang }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isRtl = lang === "ar"
  const dir = getDirection(lang)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: dictionary.header?.home || dictionary.navigation?.home || "Home", href: `/${lang}` },
    { name: dictionary.header?.services || dictionary.navigation?.services || "Services", href: `/${lang}/services` },
    { name: dictionary.header?.projects || dictionary.navigation?.projects || "Projects", href: `/${lang}/projects` },
    { name: dictionary.header?.userGuide || "User Guide", href: `/${lang}/guide` },
    { name: dictionary.header?.about || dictionary.navigation?.about || "About", href: `/${lang}/about` },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
      dir={dir}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center">
          <Link href={`/${lang}`} className="flex items-center">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
            </div>
            <span className={`text-xl font-bold text-accent ${isRtl ? "mr-2" : "ml-2"}`}>
              {isRtl ? "مبادرة التطوير العقاري" : "Real Estate Initiative"}
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center md:flex">
          <div className={`flex ${isRtl ? "space-x-reverse" : ""} space-x-6`}>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-4">
          <LanguageSwitcher lang={lang} dictionary={dictionary} />

          <div className="hidden md:block">
            <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
              {dictionary.header?.cta || "Real Estate Registration Services"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="flex items-center md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-muted-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md shadow-lg border-t border-border/20">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block py-2 text-sm font-medium",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button variant="default" className="w-full mt-2 bg-primary text-primary-foreground">
              {dictionary.header?.cta || "Real Estate Registration Services"}
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
