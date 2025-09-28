import { type JimpMime } from "jimp";
import {
  Jimp,
  supportedMimesType,
  type supportedMimes,
} from "$lib/jimp.ts";

export const withQuality = [
  "image/jpeg",
  "image/webp",
  "image/avif",
] as const;
export type withoutQuality = Exclude<
  (typeof supportedMimes)[number],
  (typeof withQuality)[number]
>;

export async function ConvertImage(
  file: File | ArrayBuffer,
  targetMime: (typeof withQuality)[number] | string,
  options?: {
    output?: "buffer";
    quality?: number; // 0-100 only for jpeg, webp, avif
  }
): Promise<Buffer>;

export async function ConvertImage(
  file: File | ArrayBuffer,
  targetMime: (typeof withQuality)[number] | string,
  options?: {
    output?: "dataURI";
    quality?: number; // 0-100 only for jpeg, webp, avif
  }
): Promise<string>;

export async function ConvertImage(
  file: File | ArrayBuffer,
  targetMime: withoutQuality | string,
  options?: {
    output?: "buffer";
  }
): Promise<Buffer>;
export async function ConvertImage(
  file: File | ArrayBuffer,
  targetMime: withoutQuality | string,
  options?: {
    output?: "dataURI";
  }
): Promise<string>;
export async function ConvertImage(
  file: File | ArrayBuffer,
  targetMime: supportedMimesType | (typeof withQuality)[number] | withoutQuality | string,
  options?: {
    output?: "buffer" | "dataURI";
    quality?: number; // 0-100 only for jpeg, webp, avif
  }
): Promise<Buffer | string> {
  let image;
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    image = await Jimp.fromBuffer(arrayBuffer);
  } else {
    image = await Jimp.fromBuffer(file);
  }
  let mime = targetMime.toLowerCase();
  if (mime === "image/jpg") {
    mime = "image/jpeg";
  }
  let quality: number = 80;
  if (options?.quality !== undefined) {
    quality = options.quality;
    if (quality < 0) quality = 0;
    if (quality > 100) quality = 100;
  }
  if (options?.output === "dataURI") {
    return image.getBase64<any, any>(
      mime as (typeof JimpMime)[keyof typeof JimpMime],
      {
        quality: quality,
      }
    );
  }
  // default to buffer
  return image.getBuffer<any, any>(
    mime as (typeof JimpMime)[keyof typeof JimpMime],
    { quality: quality }
  );
}
