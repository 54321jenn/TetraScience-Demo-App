import { useState } from "react";
import {
  BarChart2,
  Code2,
  LayoutGrid,
  LogOut,
  Table2,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@tetrascience-npm/tetrascience-react-ui";

import { DataAppShell } from "@/components/DataAppShell";
import { OverviewPage } from "@/pages/OverviewPage";
import { DataTablePage } from "@/pages/DataTablePage";
import { ChartsPage } from "@/pages/ChartsPage";
import { CodeEditorPage } from "@/pages/CodeEditorPage";

type Page = "overview" | "data-table" | "charts" | "code-editor";

const PAGE_LABELS: Record<Page, string> = {
  overview: "Components",
  "data-table": "Data Table",
  charts: "Charts",
  "code-editor": "Code Editor",
};

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="cursor-pointer bg-transparent border-none p-0">
          <Avatar size="sm" className="cursor-pointer hover:opacity-85 transition-opacity">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
              SH
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="end" className="min-w-[180px]">
        <DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
          Admin
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-destructive">
          <LogOut className="w-4 h-4" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function App() {
  const [activePage, setActivePage] = useState<Page>("overview");

  const navGroups = [
    {
      pages: [
        {
          id: "overview",
          label: "Components",
          icon: LayoutGrid,
          isActive: activePage === "overview",
          onClick: () => setActivePage("overview"),
        },
        {
          id: "data-table",
          label: "Data Table",
          icon: Table2,
          isActive: activePage === "data-table",
          onClick: () => setActivePage("data-table"),
        },
        {
          id: "charts",
          label: "Charts",
          icon: BarChart2,
          isActive: activePage === "charts",
          onClick: () => setActivePage("charts"),
        },
        {
          id: "code-editor",
          label: "Code Editor",
          icon: Code2,
          isActive: activePage === "code-editor",
          onClick: () => setActivePage("code-editor"),
        },
      ],
    },
  ];

  return (
    <DataAppShell
      appName="TS"
      appFullName="TetraScience UI"
      version="0.5.0-beta.33.1"
      navGroups={navGroups}
      userMenu={<UserMenu />}
      breadcrumbs={[
        { label: "TetraScience UI" },
        { label: PAGE_LABELS[activePage] },
      ]}
      onHelpClick={() =>
        window.open("https://github.com/tetrascience/ts-lib-ui-kit", "_blank")
      }
    >
      {activePage === "overview" && <OverviewPage />}
      {activePage === "data-table" && <DataTablePage />}
      {activePage === "charts" && <ChartsPage />}
      {activePage === "code-editor" && <CodeEditorPage />}
    </DataAppShell>
  );
}

export default App;
