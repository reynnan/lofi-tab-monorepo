import "@repo/ui/global.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";
import { PostHogConfig } from "posthog-js";

const options: Partial<PostHogConfig> = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  persistence: "localStorage",
  autocapture: true,
  disable_session_recording: false,
  capture_pageview: true,
  loaded: (posthog) => {
    posthog.register({
      full_url: window.location.href,
      domain: window.location.hostname,
    });
  },
  disable_external_dependency_loading: true,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider
      apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
      options={options}
    >
      <App />
    </PostHogProvider>
  </StrictMode>
);
