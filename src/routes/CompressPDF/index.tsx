import "./style.css";
import FilePicker from "@/lib/Components/FilePicker";
import { CompressPDF } from "@/lib/CompressPDF";
// const CompressPDF_worker = greenlet(CompressPDF);
import { downloadFile } from "@/lib/DownloadURI";
// import loadWASM from "@okathira/ghostpdl-wasm";
export default function PDFCompressor() {
  async function uploadCallback(files: FileList) {
    // multiple is false, so only one file
    const file = files[0];
    console.log(file);
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }
    downloadFile(await CompressPDF(file));
  }
  return (
    <>
      <h3>WIP</h3>
      <FilePicker
        supportedMimes={["application/pdf"]}
        uploadCallback={uploadCallback}
      />
    </>
  );
}
