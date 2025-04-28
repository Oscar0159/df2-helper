import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeParseInt(value: string | null | undefined): number | null {
  const parsed = parseInt(value || '', 10);
  return isNaN(parsed) ? null : parsed;
}
