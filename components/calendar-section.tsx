"use client"

import { useState } from "react"
import { format, parseISO } from "date-fns"
import { ar, enUS } from "date-fns/locale"
import { CalendarIcon, Clock, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { getDirection } from "@/lib/utils"

interface CalendarSectionProps {
  dictionary: any
  isRtl: boolean
}

export default function CalendarSection({ dictionary, isRtl }: CalendarSectionProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(parseISO(dictionary.events[0].date))
  const dir = getDirection(isRtl ? "ar" : "en")

  const events = dictionary.events
  const selectedEvent = events.find(
    (event: any) => selectedDate && format(parseISO(event.date), "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd"),
  )

  const eventDates = events.map((event: any) => parseISO(event.date))

  return (
    <section className="bg-background py-16 md:py-24" dir={dir}>
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">{dictionary.title}</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">{dictionary.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-lg border bg-card p-4 shadow-sm"
              locale={isRtl ? ar : enUS}
              modifiers={{
                event: eventDates,
              }}
              modifiersStyles={{
                event: {
                  fontWeight: "bold",
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  color: "hsl(var(--primary))",
                  borderRadius: "0.25rem",
                },
              }}
            />
          </div>

          <div className="flex items-center justify-center">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Card className="overflow-hidden border-primary/20">
                    <div className="relative h-48 bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/10">
                        <CalendarIcon className="h-16 w-16 text-primary/40" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                        <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
                        <p className="text-sm">
                          {format(parseISO(selectedEvent.date), "PPPP", {
                            locale: isRtl ? ar : enUS,
                          })}
                        </p>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{selectedEvent.time}</span>
                      </div>
                      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <p className="mb-4 text-muted-foreground">{selectedEvent.description}</p>
                      <Button className="w-full bg-primary text-primary-foreground">{dictionary.viewEvent}</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex h-full w-full items-center justify-center rounded-lg border border-dashed p-8 text-center text-muted-foreground"
                >
                  <div>
                    <CalendarIcon className="mx-auto mb-2 h-10 w-10 text-muted-foreground/50" />
                    <p>{isRtl ? "يرجى اختيار تاريخ لعرض الفعاليات" : "Please select a date to view events"}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
