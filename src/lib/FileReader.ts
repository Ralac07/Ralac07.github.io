export function ReadFile(
  file: File
): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      resolve(null);
    };
    reader.readAsArrayBuffer(file);
  });
}
