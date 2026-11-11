import { Writable } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";

// Build-time only (scripts/prerender.mjs): renders one URL to finished HTML so
// crawlers get each page's own title, description, canonical, H1 and text
// without running JavaScript. Waits for every lazy-loaded page (onAllReady)
// so the output is the real page, never the Suspense "Loading..." fallback.
export function render(url: string): Promise<{ html: string; helmet: HelmetServerState | undefined }> {
  const helmetContext: { helmet?: HelmetServerState } = {};
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve({ html, helmet: helmetContext.helmet });
        callback();
      },
    });
    const { pipe } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <App renderRouter={(routes) => <StaticRouter location={url}>{routes}</StaticRouter>} />
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError(error) {
          reject(error);
        },
      },
    );
  });
}
