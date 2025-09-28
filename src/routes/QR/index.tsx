import "./style.css";
import QRCode from "$lib/Components/QRCode";
import { useState } from "preact/hooks";

export default function QR() {
  const [qrType, setQrType] = useState<
    | "text"
    | "url"
    | "email"
    | "phone"
    | "sms"
    | "wifi"
    | "geo"
    | "bitcoin"
    | "calendar"
  >("text");
  const [text, setText] = useState("");
  return (
    <>
      <QRCode text={text} />
      <div>
        <select
          value={qrType}
          onChange={(e) => setQrType(e.currentTarget.value as any)}
        >
          <option value="text">Text</option>
          <option value="url">URL</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
          <option value="sms">SMS</option>
          <option value="wifi">WiFi</option>
          <option value="geo">Geo</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="calendar">Calendar</option>
        </select>
        {(() => {
          if (qrType === "text") {
            return (
              <input
                type="text"
                value={text}
                onChange={(e) => {
                  setText(e.currentTarget.value);
                }}
              />
            );
          }
          if (qrType === "email") {
            const [email, setEmail] = useState("");
            const [subject, setSubject] = useState("");
            const [body, setBody] = useState("");
            return (
              <input
                type="email"
                value={text}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
            );
          }
        })()}
      </div>
    </>
  );
}
