import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
import "@/i18n/index";  // مهم! این فایل باید قبل از render لود شود


const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [rtlPlugin],
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
      <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </CacheProvider>
  </React.StrictMode>
);
