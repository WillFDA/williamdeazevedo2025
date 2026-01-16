import { type ClassValue, clsx } from "clsx";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useGetIsActive(path: string) {
  const pathname = usePathname();
  // Exact match for home, startsWith for other routes
  if (path === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(path);
}
