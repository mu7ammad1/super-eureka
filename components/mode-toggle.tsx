"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Switch } from "./ui/switch"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  const handleToggle = (checked: any) => {
    setTheme(checked ? "dark" : "light")
  }

  return (
    <Switch
      checked={theme === "dark"}
      onCheckedChange={handleToggle}
      aria-label="Toggle theme"
    />
  )
}