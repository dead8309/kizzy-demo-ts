import { clsx, type ClassValue } from "clsx"
import { formatISO, parseISO } from "date-fns"
import { twMerge } from "tailwind-merge"
import { string } from "zod"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  if (date == '') return ''
  const parsedDate = parseISO(date)
  const formatted_date = formatISO(parsedDate, { representation: "complete" })
  return formatted_date
}