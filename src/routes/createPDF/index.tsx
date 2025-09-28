import "./style.css";
import FilePicker from "@/lib/Components/FilePicker";
import { mergeImagesToPDF } from "@/lib/CreatePDF";
import VirtualList from "react-virtual-drag-list";
import { downloadFile, downloadURI } from "@/lib/DownloadURI";
import { supported_images } from "@/lib/mimes";
import { useCallback, useState } from "preact/hooks";
import { SortableEvent } from "sortable-dnd";
interface DropEvent<T> {
  key: string | number;
  item: T;
  list: T[];
  event: SortableEvent;
  changed: boolean;
  oldList: T[];
  oldIndex: number;
  newIndex: number;
}
export default function PDFCreator() {
  const [files, setFiles] = useState<File[]>([]);
  const list = useCallback(() => {
    return files.map((f, index) => {
      return { name: f.name, id: index, file: f };
    });
  }, [files]);
  // const list = files.map((f, index) => {
  //   return { name: f.name, id: index };
  // });
  async function uploadCallback(files: FileList) {
    setFiles([...files]);
    // const f = await mergeImagesToPDF(files);
    // downloadFile(f);
  }
  return (
    <>
      <h3>WIP</h3>
      {(() => {
        if (files.length > 0) {
          // plan to use https://github.com/hello-pangea/dnd
          // drag around images to pick page order then click save to use downloadFile or downloadURI to save as pdf
        } else {
          return (
            <FilePicker
              inputTagProps={{ multiple: true }}
              supportedMimes={supported_images}
              uploadCallback={uploadCallback}
            />
          );
        }
      })()}
    </>
  );
}
