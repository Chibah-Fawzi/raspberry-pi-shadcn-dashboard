"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

interface CustomThemeProviderProps {
  children: React.ReactNode
  [key: string]: any
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
