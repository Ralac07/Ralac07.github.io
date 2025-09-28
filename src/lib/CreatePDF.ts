import { PDFDocument } from "pdf-lib";
import { ConvertImage } from "./ImageConvert";
// import mime from "mime";
function toArrayBuffer(buffer: Buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i] as number;
  }
  return arrayBuffer;
}

function convertToArrayBuffer(data: ArrayBufferLike): ArrayBuffer {
  // If the data is already an ArrayBuffer, return it directly.
  if (data instanceof ArrayBuffer) {
    return data;
  }

  // If it's a SharedArrayBuffer or a TypedArray, create a Uint8Array
  // and access its underlying buffer.
  // This effectively copies the content into a new ArrayBuffer if `data` is a SharedArrayBuffer.
  // If `data` is a TypedArray, it will return the underlying ArrayBuffer.
  return new Uint8Array(data).buffer as unknown as ArrayBuffer
}

// testing variable
export async function mergeImagesToPDF(
  images: File[] | FileList
): Promise<File> {
  const pdfDoc = await PDFDocument.create();
  for (const imgFile of images) {
    let imgBytes: ArrayBuffer;
    if (imgFile.type === "image/jpeg") {
      console.log("jpg, no convert needed");
      imgBytes = await imgFile.arrayBuffer();
    } else {
      console.log("converting to jpg", imgFile.name, imgFile.type);
      imgBytes = toArrayBuffer(
        await ConvertImage(imgFile, "image/jpeg", {
          output: "buffer",
          quality: 30,
        })
      );
    }
    console.log("creating page for", imgFile.name);
    const jpgImage = await pdfDoc.embedJpg(imgBytes);
    const page = pdfDoc.addPage([jpgImage.width, jpgImage.height]);
    console.log("adding image to page", imgFile.name);
    page.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: jpgImage.width,
      height: jpgImage.height,
    });
  }
  console.log("saving pdf");
  const pdfBytes = await pdfDoc.save();
  return new File(
    [convertToArrayBuffer(pdfBytes.buffer)],
    "merged.pdf",
    {}
  );
}
