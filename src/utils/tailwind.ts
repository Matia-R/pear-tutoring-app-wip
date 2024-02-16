import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    /* eslint-disable */
    return twMerge(clsx(inputs))
    /* eslint-disable */
}

export function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(' ')
}