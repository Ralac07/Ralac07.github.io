export function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  // document.body.appendChild(link);
  link.click();
  // document.body.removeChild(link);
}
export function downloadFile(file: File) {
  const url = URL.createObjectURL(file);
  downloadURI(url, file.name);
}
