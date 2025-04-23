import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, locale = "en-US", currency = "SAR") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatNumber(number: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(number)
}

export function getDirection(locale: string) {
  return locale === "ar" ? "rtl" : "ltr"
}

// Helper function to apply RTL-specific styles
export function getRtlClass(isRtl: boolean, ltrClass: string, rtlClass: string) {
  return isRtl ? rtlClass : ltrClass
}

// Helper function to handle spacing in RTL/LTR contexts
export function getSpacingClass(isRtl: boolean) {
  return isRtl ? "space-x-reverse" : ""
}

// Helper function to get the correct margin class based on direction
export function getMarginClass(isRtl: boolean, side: "left" | "right") {
  if (side === "left") {
    return isRtl ? "mr-2" : "ml-2"
  } else {
    return isRtl ? "ml-2" : "mr-2"
  }
}

// Helper function to get the correct padding class based on direction
export function getPaddingClass(isRtl: boolean, side: "left" | "right") {
  if (side === "left") {
    return isRtl ? "pr-2" : "pl-2"
  } else {
    return isRtl ? "pl-2" : "pr-2"
  }
}

// Helper function to get the correct flex direction based on RTL/LTR
export function getFlexDirection(isRtl: boolean) {
  return isRtl ? "flex-row-reverse" : "flex-row"
}

// Helper function to get the correct text alignment based on RTL/LTR
export function getTextAlign(isRtl: boolean) {
  return isRtl ? "text-right" : "text-left"
}

// Helper function to get the correct border radius based on RTL/LTR
export function getBorderRadius(isRtl: boolean, side: "left" | "right") {
  if (side === "left") {
    return isRtl ? "rounded-r" : "rounded-l"
  } else {
    return isRtl ? "rounded-l" : "rounded-r"
  }
}

// Helper function to get the correct position based on RTL/LTR
export function getPosition(isRtl: boolean, side: "left" | "right") {
  if (side === "left") {
    return isRtl ? "right-0" : "left-0"
  } else {
    return isRtl ? "left-0" : "right-0"
  }
}
