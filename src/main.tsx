import React from "react";
import ReactDOM from "react-dom/client";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import "@/i18n/index";
import AppWrapper from "@/AppWrapper";
import { loadConfig } from "./config/loadConfig";

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [rtlPlugin],
});

const queryClient = new QueryClient();

async function bootstrap() {

  try {
    await loadConfig();
    ReactDOM.createRoot(
      document.getElementById("root")!
    ).render(
      <React.StrictMode>
        <CacheProvider value={cacheRtl}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <AppWrapper />
            </BrowserRouter>
          </QueryClientProvider>
        </CacheProvider>
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Failed to bootstrap app:", err);
  }
}

bootstrap();
