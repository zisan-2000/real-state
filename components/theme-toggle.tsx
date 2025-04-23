"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Laptop } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { getDirection } from "@/lib/utils"

interface ThemeToggleProps {
  dictionary: any
}

export default function ThemeToggle({ dictionary }: ThemeToggleProps) {
  const { setTheme } = useTheme()
  const isRtl = dictionary?.light === "الوضع النهاري" // Check if dictionary is in Arabic
  const dir = getDirection(isRtl ? "ar" : "en")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={isRtl ? "start" : "end"} dir={dir}>
        <DropdownMenuItem onClick={() => setTheme("light")} className={isRtl ? "flex-row-reverse" : ""}>
          <Sun className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
          <span>{dictionary.light}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className={isRtl ? "flex-row-reverse" : ""}>
          <Moon className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
          <span>{dictionary.dark}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className={isRtl ? "flex-row-reverse" : ""}>
          <Laptop className={`h-4 w-4 ${isRtl ? "ml-2" : "mr-2"}`} />
          <span>{dictionary.system}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
