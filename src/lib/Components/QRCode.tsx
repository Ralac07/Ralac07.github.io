import { useState } from "preact/hooks";
import qrcode, { type QRCodeToDataURLOptions } from "qrcode";
export default function QRCode(
  props: {
    text: string;
  } & QRCodeToDataURLOptions
) {
  const [qrURI, setQRURI] = useState<string | null>(" ");
  qrcode
    .toDataURL(
      props.text.trim() === "" ? " " : props.text,
      props.text.trim() === ""
        ? {
            color: {
              dark: "#d3d3d3ff",
              light: "#d3d3d3ff",
            },
          }
        : props
    )
    .then(setQRURI)
    .catch(() => {
      setQRURI(" ");
    });
  return <img src={qrURI ?? ""} />;
}
