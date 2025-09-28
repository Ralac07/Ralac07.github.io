import { mime_db } from "@/mime-db";

export const supported_images: (keyof typeof mime_db)[] = [
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
  "image/avif",
];
