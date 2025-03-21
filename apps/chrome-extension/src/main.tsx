import "@repo/ui/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "posthog-js/dist/recorder";
import "posthog-js/dist/exception-autocapture";
import "posthog-js/dist/tracing-headers";
import "posthog-js/dist/web-vitals";
import posthog from "posthog-js/dist/module.no-external";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  persistence: "localStorage" as const,
  autocapture: true,
  disable_session_recording: false,
  capture_pageview: true,
  disable_external_dependency_loading: true,
};

if (
  !window.location.host.includes("127.0.0.1") &&
  !window.location.host.includes("localhost")
) {
  posthog.init(import.meta.env.VITE_POSTHOG_API_KEY, options);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
