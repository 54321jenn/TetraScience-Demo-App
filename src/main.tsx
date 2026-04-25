import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TooltipProvider } from "@tetrascience-npm/tetrascience-react-ui";
import { ThemeProvider } from "@/lib/theme";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TooltipProvider>
        <App />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>
);
