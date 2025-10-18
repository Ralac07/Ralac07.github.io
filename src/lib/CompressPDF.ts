// @ts-ignore because no types available
// import loadWASM from "@okathira/ghostpdl-wasm";
// globalThis.prompt = (
//   message?: string | undefined,
//   _default?: string | undefined
// ) => {
//   // track where it was called from
//   throw new Error("prompt is not supported");
// };
import loadWASM from "@okathira/ghostpdl-wasm";

import { ReadFile } from "$lib/FileReader";

export async function CompressPDF(file: File): Promise<File> {
  // const loadWASM = (await import("@okathira/ghostpdl-wasm")).default;
  if (file.type !== "application/pdf") {
    throw new Error("File is not a PDF");
  }
  const Module = await loadWASM();
  console.log("loaded wasm");
  const buffer = await ReadFile(file);
  console.log("read file");
  Module.FS.writeFile("example.pdf", new Uint8Array(buffer));
  console.log("pdf saved to virtual FS");

  // Convert PDF to PDF (example settings)
  let resolution: number;
  let downsampleType: string;
  let compatibilityLevel: number;
  let PdfSettings:
    | "/screen"
    | "/ebook"
    | "/printer"
    | "/prepress"
    | "/default";
  /**
   * unsure what r does but apparently it helps with compression when its 130
   */
  let r: number;
  resolution = 72;
  downsampleType = "/Bicubic";
  compatibilityLevel = 1.3;
  PdfSettings = "/screen";
  r = 130;
  const params = [
    // "-q",
    "-dNOPAUSE",
    "-dBATCH",
    // "-dQUIET",
    "-dSAFER",
    "-sProcessColorModel=DeviceGray",
    "-sColorConversionStrategy=Gray",
    "-dOverrideICC",
    "-sDEVICE=pdfwrite",
    `-r${r}`,

    `-dCompatibilityLevel=${compatibilityLevel}`,
    `-dPDFSETTINGS=${PdfSettings}`,
    "-dEmbedAllFonts=true",
    "-dSubsetFonts=true",
    `-dColorImageDownsampleType=${downsampleType}`,
    `-dColorImageResolution=${resolution}`,
    `-dGrayImageDownsampleType=${downsampleType}`,
    `-dGrayImageResolution=${resolution}`,
    `-dMonoImageDownsampleType=${downsampleType}`,
    `-dMonoImageResolution=${resolution}`,
    "-dDownsampleColorImages=true",
    "-dDownsampleGrayImages=true",
    "-dDownsampleMonoImages=true",

    "-sOutputFile=example_output.pdf",
    "example.pdf",
  ];
  console.log("calling ghostscript with params:", params);
  // return new File([], "fakefile.pdf");
  Module.callMain(params);
  console.log("virtual pdf compressed");

  // Read the output PDF file
  const output = await Module.FS.readFile("example_output.pdf", {
    encoding: "binary",
  });
  const output_filename = file.name.replace(
    /\.pdf$/i,
    "_compressed.pdf"
  );
  console.log("pdf extracted from virtual FS");
  const output_file = new File([output], output_filename, {
    type: "application/pdf",
  });
  return output_file;
}
