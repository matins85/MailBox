import { ThemeProvider } from "@/components/theme-provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import "./index.css";
import { selfXSSWarning } from "./utils/xss-warning.ts";

if (import.meta.env.PROD) {
  selfXSSWarning();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="hs_theme">
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
);
