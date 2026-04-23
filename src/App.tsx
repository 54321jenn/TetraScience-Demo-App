import { useState } from "react";
import {
  AppLayout,
  ThemeProvider,
} from "@tetrascience-npm/tetrascience-react-ui";
import { OverviewPage } from "./pages/OverviewPage";
import { DataTablePage } from "./pages/DataTablePage";
import { ChartsPage } from "./pages/ChartsPage";
import { CodeEditorPage } from "./pages/CodeEditorPage";

type Page = "overview" | "data-table" | "charts" | "code-editor";

const pages: Array<{ id: Page; label: string }> = [
  { id: "overview", label: "Components" },
  { id: "data-table", label: "Data Table" },
  { id: "charts", label: "Charts" },
  { id: "code-editor", label: "Code Editor" },
];

function App() {
  const [activePage, setActivePage] = useState<Page>("overview");

  return (
    <ThemeProvider>
      <AppLayout
        userProfile={{ name: "Shelbie" }}
        hostname="ts-ui-showcase.local"
        organization={{ name: "TetraScience", subtext: "UI Showcase" }}
      >
        <div className="flex h-full min-h-screen">
          {/* Simple nav sidebar */}
          <nav className="w-52 shrink-0 border-r border-border bg-card flex flex-col py-6 px-3 gap-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
              Showcase
            </p>
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePage(p.id)}
                className={[
                  "text-sm text-left px-3 py-2 rounded-lg transition-colors w-full",
                  activePage === p.id
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted",
                ].join(" ")}
              >
                {p.label}
              </button>
            ))}
          </nav>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {activePage === "overview" && <OverviewPage />}
            {activePage === "data-table" && <DataTablePage />}
            {activePage === "charts" && <ChartsPage />}
            {activePage === "code-editor" && <CodeEditorPage />}
          </main>
        </div>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
