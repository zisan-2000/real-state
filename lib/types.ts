export interface PropertyType {
  id: string
  address: string
  city: string
  region: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  type: string
  imageUrl: string
  lat: number
  lng: number
  isFeatured?: boolean
  isCertified?: boolean
  description?: string
}
