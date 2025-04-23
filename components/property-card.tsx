import Image from "next/image"
import Link from "next/link"
import { Heart, Award, MapPin, Bed, Bath, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import type { Locale } from "@/i18n-config"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    location: string
    price: number
    bedrooms: number
    bathrooms: number
    area: number
    image: string
    isFeatured?: boolean
    isNew?: boolean
    isCertified?: boolean
  }
  dictionary: any
  lang: Locale
}

export default function PropertyCard({ property, dictionary, lang }: PropertyCardProps) {
  const isRtl = lang === "ar"
  const locale = lang === "ar" ? "ar-SA" : "en-US"

  return (
    <div className="luxury-card group h-full overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
      {/* Image container */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={property.image || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {property.isFeatured && <Badge className="premium-badge">{dictionary.propertyCard.featured}</Badge>}
          {property.isNew && (
            <Badge className="bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-0.5 rounded">
              {dictionary.propertyCard.new}
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70"
        >
          <Heart className="h-4 w-4 text-muted-foreground" />
        </Button>

        {/* Certified badge */}
        {property.isCertified && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-background/70 px-2 py-1 backdrop-blur-sm">
            <Award className="h-3.5 w-3.5 text-accent" />
            <span className="text-xs font-medium text-accent">{dictionary.propertyCard.certified}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 text-xl font-bold text-accent">{formatPrice(property.price, locale)}</div>
        <h3 className="mb-1 line-clamp-1 text-lg font-medium">{property.title}</h3>
        <div className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{property.location}</span>
        </div>

        {/* Property details */}
        <div className="mb-4 grid grid-cols-3 gap-2 border-t border-border/30 pt-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Bed className="h-4 w-4" />
              <span className="text-sm">{property.bedrooms}</span>
            </div>
            <span className="text-xs text-muted-foreground">{dictionary.propertyCard.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Bath className="h-4 w-4" />
              <span className="text-sm">{property.bathrooms}</span>
            </div>
            <span className="text-xs text-muted-foreground">{dictionary.propertyCard.bathrooms}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Square className="h-4 w-4" />
              <span className="text-sm">{property.area}</span>
            </div>
            <span className="text-xs text-muted-foreground">{dictionary.propertyCard.sqm}</span>
          </div>
        </div>

        <Link href={`/${lang}/properties/${property.id}`}>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            {dictionary.propertyCard.viewDetails}
          </Button>
        </Link>
      </div>
    </div>
  )
}
