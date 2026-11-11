import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Every sitemap URL ships pre-rendered HTML inside #root (scripts/prerender.mjs),
// so attach to it instead of replacing it — no blank flash, no layout shift.
// Any other URL gets the empty shell and renders normally.
if (rootElement.firstElementChild) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}