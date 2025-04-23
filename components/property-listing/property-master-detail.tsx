"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Share2,
  MapPin,
  Award,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { PropertyType } from "@/lib/types";
import { getSaudiProperties } from "@/lib/data";
import { getDirection } from "@/lib/utils";

interface PropertyMasterDetailProps {
  isRtl?: boolean;
  dictionary?: any;
}

export default function PropertyMasterDetail({
  isRtl = false,
  dictionary,
}: PropertyMasterDetailProps) {
  const [properties, setProperties] = useState<PropertyType[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<PropertyType | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const dir = getDirection(isRtl ? "ar" : "en");

  // Load properties
  useEffect(() => {
    const loadedProperties = getSaudiProperties();
    setProperties(loadedProperties);
    if (loadedProperties.length > 0) {
      setSelectedProperty(loadedProperties[0]);
    }
  }, []);

  // Handle property selection
  const handleSelectProperty = (property: PropertyType, index: number) => {
    setSelectedProperty(property);
    setActiveIndex(index);
  };

  // Auto-scroll the selected property into view in the list
  useEffect(() => {
    if (listRef.current && !isMobile) {
      const selectedElement = listRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeIndex, isMobile]);

  // Translations (fallback if dictionary not provided)
  const t = {
    overview: dictionary?.propertyDetail?.overview || "Overview",
    features: dictionary?.propertyDetail?.features || "Features",
    location: dictionary?.propertyDetail?.location || "Location",
    proceedWithPurchase:
      dictionary?.propertyDetail?.proceedWithPurchase ||
      "Proceed with Purchase",
    contactAgent: dictionary?.propertyDetail?.contactAgent || "Contact Agent",
    falCertified: dictionary?.propertyDetail?.falCertified || "FAL Certified",
    bedrooms: dictionary?.propertyDetail?.bedrooms || "Bedrooms",
    bathrooms: dictionary?.propertyDetail?.bathrooms || "Bathrooms",
    area: dictionary?.propertyDetail?.area || "Area",
    sqft: dictionary?.propertyDetail?.sqft || "sqft",
    propertyFeatures:
      dictionary?.propertyDetail?.propertyFeatures || "Property Features",
    viewAllProperties:
      dictionary?.propertyList?.viewAll || "View All Properties",
    sortBy: dictionary?.propertyList?.sortBy || "Sort By",
    filter: dictionary?.propertyList?.filter || "Filter",
    featuredProperties:
      dictionary?.propertyList?.title || "Featured Properties",
  };

  // Features for the selected property (example)
  const propertyFeatures = [
    "Swimming Pool",
    "Garden",
    "Garage",
    "Security System",
    "Central Air Conditioning",
    "Modern Kitchen",
    "Master Suite",
    "Balcony",
  ];

  if (properties.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8" dir={dir}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-bold md:text-3xl gold-text">
          {isRtl ? "العقارات المميزة" : t.featuredProperties}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            {t.sortBy}
          </Button>
          <Button variant="outline" size="sm">
            {t.filter}
          </Button>
          <Button size="sm">
            {t.viewAllProperties}
            {isRtl ? (
              <ArrowLeft className="mr-2 h-4 w-4 arrow-icon-rtl" />
            ) : (
              <ArrowRight className="ml-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile View - Tabs */}
      {isMobile && (
        <Tabs defaultValue="list" className="w-full md:hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="list">{isRtl ? "القائمة" : "List"}</TabsTrigger>
            <TabsTrigger value="details">
              {isRtl ? "التفاصيل" : "Details"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {properties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isActive={activeIndex === index}
                  onClick={() => handleSelectProperty(property, index)}
                  index={index}
                  isRtl={isRtl}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="details">
            {selectedProperty && (
              <PropertyDetail
                property={selectedProperty}
                isRtl={isRtl}
                t={t}
                features={propertyFeatures}
              />
            )}
          </TabsContent>
        </Tabs>
      )}

      {/* Desktop View - Master-Detail */}
      <div className="hidden md:grid md:grid-cols-12 md:gap-6">
        {/* Property List (Left Column) */}
        <div
          ref={listRef}
          className={`md:col-span-5 lg:col-span-4 md:max-h-[800px] md:overflow-y-auto ${
            isRtl ? "md:pl-4" : "md:pr-4"
          } md:scrollbar-thin md:scrollbar-thumb-gray-300 md:scrollbar-track-gray-100`}
        >
          <div className="grid grid-cols-1 gap-4">
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                isActive={activeIndex === index}
                onClick={() => handleSelectProperty(property, index)}
                index={index}
                isRtl={isRtl}
              />
            ))}
          </div>
        </div>

        {/* Property Detail (Right Column) */}
        <div className="md:col-span-7 lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedProperty && (
              <motion.div
                key={selectedProperty.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PropertyDetail
                  property={selectedProperty}
                  isRtl={isRtl}
                  t={t}
                  features={propertyFeatures}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// Property Card Component
function PropertyCard({
  property,
  isActive,
  onClick,
  index,
  isRtl,
}: {
  property: PropertyType;
  isActive: boolean;
  onClick: () => void;
  index: number;
  isRtl: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      data-index={index}
    >
      <Card
        className={cn(
          "luxury-card h-full cursor-pointer overflow-hidden transition-all hover:shadow-md",
          isActive && "ring-2 ring-primary ring-offset-2"
        )}
        onClick={onClick}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={property.imageUrl || "/placeholder.svg"}
            alt={property.address}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          <div
            className={`absolute ${
              isRtl ? "left-auto right-3" : "right-auto left-3"
            } top-3`}
          >
            {property.isFeatured && (
              <Badge className="premium-badge">
                {isRtl ? "مميز" : "Featured"}
              </Badge>
            )}
          </div>
          <div
            className={`absolute ${
              isRtl ? "left-3 right-auto" : "right-3 left-auto"
            } top-3`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-2 text-xl font-bold text-accent">
            {property.price.toLocaleString()} SAR
          </div>
          <div className="mb-2 flex items-center gap-2 text-sm">
            <span>{property.bedrooms} bd</span>
            <span className="text-muted-foreground">•</span>
            <span>{property.bathrooms} ba</span>
            <span className="text-muted-foreground">•</span>
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="mb-1 line-clamp-1 font-medium">
            {property.address}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>
              {property.city}, {property.region}
            </span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Property Detail Component
function PropertyDetail({
  property,
  isRtl,
  t,
  features,
}: {
  property: PropertyType;
  isRtl: boolean;
  t: any;
  features: string[];
}) {
  return (
    <div className="space-y-6">
      {/* Main Image and Title */}
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-[400px] w-full">
          <Image
            src={property.imageUrl || "/placeholder.svg"}
            alt={property.address}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div
          className={`absolute ${
            isRtl ? "left-4 right-auto" : "right-4 left-auto"
          } top-4 flex gap-2`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <Heart className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
        {property.isCertified && (
          <div
            className={`absolute bottom-4 ${
              isRtl ? "right-4 left-auto" : "left-4 right-auto"
            } flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm`}
          >
            <Award className="h-5 w-5 text-accent" />
            <span className="text-sm font-medium text-accent">
              {t.falCertified}
            </span>
          </div>
        )}
      </div>

      {/* Property Info */}
      <div>
        <h1 className="mb-2 text-2xl font-bold md:text-3xl">
          {property.address}
        </h1>
        <div className="mb-4 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>
            {property.city}, {property.region}
          </span>
        </div>
        <div className="mb-6 flex items-center justify-between">
          <div className="text-3xl font-bold text-accent">
            {property.price.toLocaleString()} SAR
          </div>
          <Badge variant="outline" className="text-sm">
            {property.type}
          </Badge>
        </div>

        {/* Property Stats */}
        <div className="mb-8 grid grid-cols-3 gap-4 rounded-lg bg-muted p-4">
          <div className="text-center">
            <div className="text-lg font-bold">{property.bedrooms}</div>
            <div className="text-sm text-muted-foreground">{t.bedrooms}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">{property.bathrooms}</div>
            <div className="text-sm text-muted-foreground">{t.bathrooms}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">
              {property.sqft.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {t.area} ({t.sqft})
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              {t.overview}
            </TabsTrigger>
            <TabsTrigger value="features" className="flex-1">
              {t.features}
            </TabsTrigger>
            <TabsTrigger value="location" className="flex-1">
              {t.location}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <p className="text-muted-foreground">
              {property.description ||
                "This stunning property offers modern living with premium finishes throughout. Featuring spacious rooms, abundant natural light, and a thoughtful layout perfect for both everyday living and entertaining. The property is situated in a prime location with easy access to amenities."}
            </p>
          </TabsContent>

          <TabsContent value="features" className="mt-4">
            <h3 className="mb-3 text-lg font-medium">{t.propertyFeatures}</h3>
            <div className="grid grid-cols-2 gap-y-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="location" className="mt-4">
            <div className="h-[200px] rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">
                {isRtl
                  ? "خريطة الموقع متاحة في قسم الخريطة"
                  : "Location map available in the map section"}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="flex-1 bg-primary text-primary-foreground" size="lg">
          {t.proceedWithPurchase}
        </Button>
        <Button variant="outline" className="flex-1" size="lg">
          {t.contactAgent}
        </Button>
      </div>
    </div>
  );
}
