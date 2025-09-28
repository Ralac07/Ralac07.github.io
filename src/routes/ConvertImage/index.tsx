import "./style.css";
import FilePicker from "$lib/Components/FilePicker";
import {
  ConvertImage,
  withQuality,
} from "@/lib/ImageConvert";
import { useRef, useState } from "preact/hooks";
import { downloadURI } from "@/lib/DownloadURI";
import { mime_db, type Mime } from "@/mime-db.ts";
import { toast } from "sonner";
import { supportedMimesType } from "$lib/jimp.ts";

export default function Convert() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [outputType, setOutputType] =
    useState<supportedMimesType>("image/png");
  const [files, setFiles] = useState<File[]>([]);
  const [quality, setQuality] = useState(50);
  return (
    <>
      <FilePicker
        inputTagProps={{
          multiple: true,
        }}
        supportedMimes={[
          "image/bmp",
          "image/gif",
          "image/jpeg",
          "image/png",
          "image/tiff",
          "image/webp",
          "image/avif",
        ]}
        uploadCallback={async (files) => {
          setFiles([...files]);
          // [...files].map(async (f) => {
          if (dialog.current) {
            dialog.current.showModal();
          }
          // });
        }}
      />
      <dialog ref={dialog}>
        <h3>Output Controls</h3>
        <form method="dialog">
          <select
            value={outputType}
            onChange={(e) =>
              setOutputType(e.currentTarget.value as supportedMimesType)
            }
          >
            {[
              "image/bmp",
              "image/gif",
              "image/jpeg",
              "image/png",
              "image/tiff",
              "image/webp",
              "image/avif",
            ].map((mime) => {
              return (
                <option value={mime}>
                  {mime_db[mime as Mime].extensions?.[0]}
                </option>
              );
            })}
          </select>
          {(withQuality as unknown as string[]).includes(
            outputType as string
          ) && (
            <label for="quality">
              Quality (0-100):{" "}
              <input
                type="number"
                id="quality"
                min="0"
                max="100"
                value={quality}
                step="1"
                onChange={(e) => {
                  let val = parseInt(e.currentTarget.value);
                  if (isNaN(val)) val = 0;
                  if (val < 0) val = 0;
                  if (val > 100) val = 100;
                  setQuality(val);
                }}
              />
            </label>
          )}
          <div>
            <button
              autofocus
              onClick={async () => {
                if (files.length === 0) return;
                for (let i = 0; i < files.length; i++) {
                  toast.loading(`Converting ${i + 1}/${files.length}`, {
                    id: "convert",
                  });
                  let file = files[i];
                  let convertedIMG;
                  convertedIMG = await ConvertImage(
                    file,
                    outputType as string,
                    {
                      output: "dataURI",
                      quality: quality,
                    }
                  );
                  // if (outputType in withQuality) {
                  //   convertedIMG = await ConvertImage(
                  //     file,
                  //     outputType as (typeof withQuality)[number],
                  //     {
                  //       output: "dataURI",
                  //       quality,
                  //     }
                  //   );
                  // } else {
                  //   convertedIMG = await ConvertImage(
                  //     file,
                  //     outputType as withoutQuality,
                  //     {
                  //       output: "dataURI",
                  //     }
                  //   );
                  // }

                  downloadURI(
                    convertedIMG,
                    Date.now().toString() +
                      "." +
                      (mime_db[outputType as Mime].extensions?.[0] ||
                        "png")
                  );
                }
                if (files.length === 1) {
                  toast.success(`Converted ${files[0].name}!`, {
                    id: "convert",
                  });
                } else {
                  toast.success(
                    `Converted all ${files.length} images!`,
                    {
                      id: "convert",
                    }
                  );
                }
                if (dialog.current) {
                  dialog.current.close();
                }
              }}
            >
              Save File
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
