import { createJimp } from "@jimp/core";
import { defaultFormats, defaultPlugins } from "jimp";
import webp from "@jimp/wasm-webp";
import avif from "@jimp/wasm-avif";
import png from "@jimp/wasm-png";
import jpeg from "@jimp/wasm-jpeg";

export const supportedMimes = [
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/tiff",
  "image/webp",
  "image/avif",
] as const;
export type supportedMimesType = (typeof supportedMimes)[number]
// A custom jimp that supports webp
export const Jimp = createJimp({
  formats: [
    ...defaultFormats.filter((f) => {
      return !(
        f().mime in
        ["image/webp", "image/avif", "image/png", "image/jpeg"]
      );
    }),
    webp,
    avif,
    png,
    jpeg,
  ],
  plugins: defaultPlugins,
});
