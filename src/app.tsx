import PWABadge from "./PWABadge.tsx";
import "simpledotcss/simple.css";
import "./app.css";
// import "./simplecss.scss";
import {
  lazy,
  LocationProvider,
  ErrorBoundary,
  Router,
  Route,
} from "preact-iso";
const Home = lazy(() => import("@/routes/Home/index.tsx"));
const ConvertImage = lazy(
  () => import("@/routes/ConvertImage/index.tsx")
);
const NotFound = lazy(() => import("@/routes/404/index.tsx"));
// import Home from "@/routes/Home/index.tsx";
// import NotFound from "@/routes/404/index.tsx";
import Layout from "$lib/Components/Layout";
import Link from "$lib/Components/Link.tsx";
import QR from "./routes/QR/index.tsx";
import CompressPDF from "./routes/CompressPDF/index.tsx";

export function App() {
  return (
    <>
      <LocationProvider>
        <ErrorBoundary>
          <Layout
            nav={
              <>
                <Link href="/">Home</Link>
                <Link href="/image">Image Tools</Link>
                <Link href="/qr">QR Code</Link>
                <Link href="/pdf">PDF</Link>
              </>
            }
          >
            <Router>
              <Route path="/" component={Home} />
              <Route path="/qr" component={QR} />
              <Route path="/image/*" component={ImageTools} />
              <Route path="/image" component={ImageToolList} />
              <Route path="/pdf/*" component={PDFTools} />
              <Route path="/pdf" component={PDFToolList} />
              {/* Alternative dedicated route component for better TS support */}
              {/* <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} /> */}
              {/* `default` prop indicates a fallback route. Useful for 404 pages */}
              <Route default component={NotFound} />
            </Router>
          </Layout>
        </ErrorBoundary>
      </LocationProvider>
      <PWABadge />
    </>
  );
}

const ImageToolList = () => (
  <ul>
    <li>
      <Link href="/image/convert">Image Convert</Link>
    </li>
  </ul>
);
const ImageTools = () => (
  <LocationProvider>
    <ErrorBoundary>
      <Router>
        {/* <Route path="/convert" component={Convert} /> */}
        <Route path="/compress" component={ConvertImage} />
        <Route path="/compress" component={ConvertImage} />
      </Router>
    </ErrorBoundary>
  </LocationProvider>
);
const PDFToolList = () => (
  <ul>
    <li>
      <Link href="/pdf/compress">PDF Compressor</Link>
    </li>
  </ul>
);
const PDFTools = () => (
  <LocationProvider>
    <ErrorBoundary>
      <Router>
        <Route path="/compress" component={CompressPDF} />
        <Route path="/compress" component={CompressPDF} />
      </Router>
    </ErrorBoundary>
  </LocationProvider>
);
