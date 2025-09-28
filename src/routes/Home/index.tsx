import "./style.css";
import { useLocation } from "preact-iso";
export default function Home() {
  const location = useLocation();
  return (
    <>
      <pre>{JSON.stringify(location)}</pre>
    </>
  );
}
