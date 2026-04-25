import { useState } from "react";
import {
  BarChart2,
  BarChart3,
  Code2,
  Download,
  Filter,
  FlaskConical,
  LayoutGrid,
  LogOut,
  Monitor,
  Moon,
  LayoutDashboard,
  Search,
  Sun,
  Table2,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@tetrascience-npm/tetrascience-react-ui";

import { DataAppShell } from "@/components/DataAppShell";
import { WorkflowPanel, type WorkflowStep } from "@/components/WorkflowPanel";
import { HelpSheet } from "@/components/HelpSheet";
import { useTheme } from "@/lib/theme";
import { OverviewPage } from "@/pages/OverviewPage";
import { DataTablePage } from "@/pages/DataTablePage";
import { ChartsPage } from "@/pages/ChartsPage";
import { CodeEditorPage } from "@/pages/CodeEditorPage";
import { WorkflowPage } from "@/pages/WorkflowPage";
import { PatternsPage } from "@/pages/PatternsPage";

type Page = "overview" | "data-table" | "charts" | "code-editor" | "workflow" | "patterns";

const PAGE_LABELS: Record<Page, string> = {
  overview: "Components",
  "data-table": "Data Table",
  charts: "Charts",
  "code-editor": "Code Editor",
  workflow: "Workflow",
  patterns: "Patterns",
};

const WORKFLOW_STEPS: WorkflowStep[] = [
  { id: "data-overview", label: "Data Overview", icon: LayoutGrid, input: 649568, output: 645396 },
  { id: "global-filtering", label: "Global Filtering", icon: Filter, input: 645396, output: 4823 },
  { id: "explore-clusters", label: "Explore Clusters", icon: BarChart3, input: 4823, output: 20 },
  { id: "review-selection", label: "Review Selection", icon: Search, input: 20, output: 15 },
  { id: "export-primary-list", label: "Export Primary List", icon: Download, output: 15 },
];

const THEME_META = {
  system: { icon: Monitor, label: "System theme", next: "Switch to light" },
  light:  { icon: Sun,     label: "Light mode",   next: "Switch to dark" },
  dark:   { icon: Moon,    label: "Dark mode",     next: "Follow system" },
} as const;

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { icon: Icon, label, next } = THEME_META[theme];
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="w-7 h-7"
          onClick={toggleTheme}
          aria-label={label}
        >
          <Icon className="w-4 h-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {label} — {next}
      </TooltipContent>
    </Tooltip>
  );
}

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
  const [activeStepId, setActiveStepId] = useState("data-overview");
  const [workflowCollapsed, setWorkflowCollapsed] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const isWorkflow = activePage === "workflow";
  const activeStep = WORKFLOW_STEPS.find((s) => s.id === activeStepId);
  const activeStepIndex = WORKFLOW_STEPS.findIndex((s) => s.id === activeStepId);
  const hasNext = activeStepIndex < WORKFLOW_STEPS.length - 1;

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
        {
          id: "patterns",
          label: "Patterns",
          icon: LayoutDashboard,
          isActive: activePage === "patterns",
          onClick: () => setActivePage("patterns"),
        },
        {
          id: "workflow",
          label: "Workflow",
          icon: FlaskConical,
          isActive: activePage === "workflow",
          onClick: () => setActivePage("workflow"),
        },
      ],
    },
  ];

  const breadcrumbs = isWorkflow
    ? [
        { label: "All Datasets" },
        { label: "DUX4", onClick: () => setActiveStepId("data-overview") },
        { label: "Primary Screening", onClick: () => setActiveStepId("data-overview") },
        { label: activeStep?.label ?? "" },
      ]
    : [{ label: "TetraScience UI" }, { label: PAGE_LABELS[activePage] }];

  const workflowHeaderActions = isWorkflow ? (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 text-sm">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          INPUT
        </span>
        <span className="font-semibold tabular-nums">
          {activeStep?.input !== undefined ? activeStep.input.toLocaleString() : "—"}
        </span>
      </div>
      <span className="text-muted-foreground">→</span>
      <div className="flex items-center gap-1.5 border border-border rounded-md px-2 py-0.5 text-sm">
        <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
          OUTPUT
        </span>
        <span className="font-semibold tabular-nums">
          {activeStep?.output !== undefined ? activeStep.output.toLocaleString() : "—"}
        </span>
      </div>
      <Button
        size="sm"
        disabled={!hasNext}
        onClick={() => hasNext && setActiveStepId(WORKFLOW_STEPS[activeStepIndex + 1].id)}
      >
        Next
      </Button>
    </div>
  ) : null;

  const headerActions = (
    <div className="flex items-center gap-1">
      {workflowHeaderActions}
      <ThemeToggle />
    </div>
  );

  const sidebarPanel = isWorkflow ? (
    <WorkflowPanel
      steps={WORKFLOW_STEPS}
      activeStepId={activeStepId}
      onStepClick={setActiveStepId}
      collapsed={workflowCollapsed}
      onToggleCollapse={() => setWorkflowCollapsed((c) => !c)}
    />
  ) : undefined;

  return (
    <>
      <DataAppShell
        appName="TS"
        appFullName="TetraScience UI"
        version="0.5.0-beta.33.1"
        navGroups={navGroups}
        userMenu={<UserMenu />}
        breadcrumbs={breadcrumbs}
        headerActions={headerActions}
        sidebarPanel={sidebarPanel}
        onHelpClick={() => setHelpOpen(true)}
      >
        {activePage === "overview" && <OverviewPage />}
        {activePage === "data-table" && <DataTablePage />}
        {activePage === "charts" && <ChartsPage />}
        {activePage === "code-editor" && <CodeEditorPage />}
        {activePage === "patterns" && <PatternsPage />}
        {activePage === "workflow" && <WorkflowPage activeStepId={activeStepId} />}
      </DataAppShell>

      <HelpSheet open={helpOpen} onOpenChange={setHelpOpen} />
    </>
  );
}

export default App;
