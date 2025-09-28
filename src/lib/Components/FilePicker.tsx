import { useRef } from "preact/hooks";
import "./FilePicker.css";
import { mime_db } from "@/mime-db.ts";
// import db from "mime-db";
// const mime_db = db as const;
import { InputHTMLAttributes } from "preact";
export default function FilePicker(props: {
  supportedMimes: (keyof typeof mime_db)[];
  uploadCallback?: (files: FileList) => void;
  inputTagProps?: InputHTMLAttributes;
}) {
  const fileInput = useRef<HTMLInputElement>(null);
  function handleFiles(files: FileList | null | undefined) {
    if (files && props.uploadCallback) {
      props.uploadCallback(files);
    }
    // if (files !== null && files !== undefined) {
    //   for (const file of files) {
    //     console.log(file.name);
    //   }
    // }
  }
  return (
    <div
      class="dropbox"
      id="dropbox"
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add("dragover");
      }}
      onDragLeave={(e) => {
        e.currentTarget.classList.remove("dragover");
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("dragover");
        const files = e.dataTransfer?.files;
        handleFiles(files);
      }}
      onClick={() => {
        fileInput.current?.click();
      }}
    >
      <div class="dropbox-icon">📁</div>
      <div class="dropbox-text">Drop files here</div>
      <div class="dropbox-subtext">
        Supported formats:{" "}
        {props.supportedMimes
          .map((mime) => {
            return mime_db[mime].extensions?.[0].toUpperCase();
          })
          .join(", ")}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          fileInput.current?.click();
        }}
        class="browse-btn"
      >
        Browse Files
      </button>
      <input
        ref={fileInput}
        type="file"
        id="fileInput"
        accept={props.supportedMimes.join(",")}
        hidden
        onChange={(e) => {
          const files = e.currentTarget.files;
          handleFiles(files);
        }}
        {...props.inputTagProps}
      ></input>
    </div>
  );
}
