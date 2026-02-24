import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | false | null)[]) {
  return twMerge(inputs.filter(Boolean).join(" "));
}
