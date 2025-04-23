"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getDirection } from "@/lib/utils"
import type { Locale } from "@/i18n-config"

interface ContactFormProps {
  dictionary: any
  lang: Locale
}

export default function ContactForm({ dictionary, lang }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const isRtl = lang === "ar"
  const dir = getDirection(lang)

  // Create form schema based on language
  const formSchema = z.object({
    phone: z.string().min(1, { message: dictionary.form.required }),
    dateOfBirth: z.string().min(1, { message: dictionary.form.required }),
    name: z.string().min(1, { message: dictionary.form.required }),
    email: z.string().email({ message: dictionary.form.invalidEmail }),
    message: z.string().min(1, { message: dictionary.form.required }),
  })

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      dateOfBirth: "",
      name: "",
      email: "",
      message: "",
    },
  })

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      setIsSuccess(true)
      form.reset()

      // Reset success message after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000)
    }, 1500)
  }

  return (
    <div className="luxury-card p-6 md:p-8">
      {isSuccess ? (
        <div className="rounded-md bg-primary/20 p-4 text-center">
          <p className="text-primary">
            {isRtl
              ? "تم إرسال رسالتك بنجاح. سنتواصل معك قريبًا."
              : "Your message has been sent successfully. We will contact you soon."}
          </p>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" dir={dir}>
            {/* Phone Number Field - First in Arabic order */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.form.number}</FormLabel>
                  <FormControl>
                    <Input placeholder="+966 XX XXX XXXX" {...field} dir={dir} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date of Birth Field - Second in Arabic order */}
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.form.dateOfBirth}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} dir={dir} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name Field - Third in Arabic order */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.form.name}</FormLabel>
                  <FormControl>
                    <Input placeholder={isRtl ? "الاسم الكامل" : "Full Name"} {...field} dir={dir} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.form.email}</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} dir={dir} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{dictionary.form.message}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={isRtl ? "اكتب رسالتك هنا..." : "Type your message here..."}
                      className="min-h-32"
                      {...field}
                      dir={dir}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-primary text-primary-foreground" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {isRtl ? "جاري الإرسال..." : "Submitting..."}
                </span>
              ) : (
                dictionary.form.submit
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
