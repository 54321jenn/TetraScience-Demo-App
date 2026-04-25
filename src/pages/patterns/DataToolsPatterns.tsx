import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@tetrascience-npm/tetrascience-react-ui";
import { Check, Copy, Download, Filter, Search, Tag, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// Filter Bar with Chips
// =============================================================================

type FilterKey = "status" | "assay" | "team";

const FILTER_OPTIONS: Record<FilterKey, string[]> = {
  status: ["Running", "Completed", "Failed", "Queued"],
  assay: ["Primary Screen", "Secondary Screen", "Counter Screen"],
  team: ["Biology", "Chemistry", "Informatics"],
};

const FILTER_LABELS: Record<FilterKey, string> = {
  status: "Status",
  assay: "Assay",
  team: "Team",
};

interface ActiveFilter {
  key: FilterKey;
  value: string;
}

function FilterBar() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<ActiveFilter[]>([]);

  function addFilter(key: FilterKey, value: string) {
    if (filters.some((f) => f.key === key && f.value === value)) return;
    setFilters((prev) => [...prev, { key, value }]);
  }

  function removeFilter(key: FilterKey, value: string) {
    setFilters((prev) => prev.filter((f) => !(f.key === key && f.value === value)));
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[160px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none z-10" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search experiments..."
            className="pl-9 h-8 text-sm"
          />
        </div>

        {(Object.keys(FILTER_OPTIONS) as FilterKey[]).map((key) => (
          <Select key={key} onValueChange={(v) => addFilter(key, v)}>
            <SelectTrigger className="h-8 text-sm w-auto gap-1.5 px-2.5">
              <Filter className="w-3 h-3 text-muted-foreground" />
              <SelectValue placeholder={FILTER_LABELS[key]} />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS[key].map((opt) => (
                <SelectItem key={opt} value={opt} className="text-sm">
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}

        {filters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground"
            onClick={() => setFilters([])}
          >
            Clear all
          </Button>
        )}
      </div>

      {filters.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {filters.map((f) => (
            <span
              key={`${f.key}-${f.value}`}
              className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary"
            >
              <span className="text-primary/60">{FILTER_LABELS[f.key]}:</span>
              {f.value}
              <button
                type="button"
                onClick={() => removeFilter(f.key, f.value)}
                className="ml-0.5 rounded-full hover:bg-primary/10 p-0.5 transition-colors cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="rounded-lg border border-border overflow-hidden text-sm">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Experiment</span>
          <span>Assay</span>
          <span>Team</span>
          <span>Status</span>
        </div>
        {[
          { name: "DUX4 Primary Screen", assay: "Primary Screen", team: "Biology", status: "Running" },
          { name: "ALS Validation", assay: "Secondary Screen", team: "Chemistry", status: "Completed" },
          { name: "Counter Screen QC", assay: "Counter Screen", team: "Informatics", status: "Failed" },
          { name: "HTF Cluster Analysis", assay: "Primary Screen", team: "Biology", status: "Queued" },
        ]
          .filter((row) => {
            const matchesSearch = !search || row.name.toLowerCase().includes(search.toLowerCase());
            const matchesFilters =
              filters.length === 0 ||
              filters.every((f) => {
                if (f.key === "status") return row.status === f.value;
                if (f.key === "assay") return row.assay === f.value;
                if (f.key === "team") return row.team === f.value;
                return true;
              });
            return matchesSearch && matchesFilters;
          })
          .map((row) => (
            <div
              key={row.name}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-x-4 px-4 py-2.5 border-b border-border last:border-0 items-center"
            >
              <span className="font-medium truncate">{row.name}</span>
              <span className="text-muted-foreground">{row.assay}</span>
              <span className="text-muted-foreground">{row.team}</span>
              <Badge variant="outline" className="text-xs">
                {row.status}
              </Badge>
            </div>
          ))}
      </div>
    </div>
  );
}

// =============================================================================
// Copy to Clipboard
// =============================================================================

const CODE_SNIPPETS: { label: string; language: string; code: string }[] = [
  {
    label: "Python — fetch results",
    language: "python",
    code: `import requests

resp = requests.get(
    "https://api.tetrascience.com/v1/experiments/exp-001/results",
    headers={"Authorization": f"Bearer {TOKEN}"},
)
data = resp.json()`,
  },
  {
    label: "cURL — upload dataset",
    language: "bash",
    code: `curl -X POST https://api.tetrascience.com/v1/datasets \\
  -H "Authorization: Bearer $TOKEN" \\
  -F "file=@primary_screen.csv" \\
  -F "name=Primary Screen Batch 7"`,
  },
  {
    label: "JSON — pipeline config",
    language: "json",
    code: `{
  "pipeline": "hts-primary-screen",
  "version": "2.1.0",
  "params": {
    "activity_threshold": 2.0,
    "min_purity": 0.95,
    "cluster": true
  }
}`,
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors cursor-pointer border",
        copied
          ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
          : "border-border bg-background text-muted-foreground hover:text-foreground hover:border-border/60"
      )}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  );
}

function CopyToClipboard() {
  return (
    <div className="space-y-4">
      {CODE_SNIPPETS.map((snippet) => (
        <div key={snippet.label} className="rounded-lg border border-border overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
            <span className="text-xs font-medium text-muted-foreground">{snippet.label}</span>
            <CopyButton text={snippet.code} />
          </div>
          <pre className="px-4 py-3 text-xs font-mono overflow-x-auto leading-relaxed text-foreground bg-muted/20">
            <code>{snippet.code}</code>
          </pre>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// Resizable Split Panel
// =============================================================================

const SAMPLE_FILES = [
  { name: "primary_screen_b7.csv", size: "84.2 MB", rows: "649,568" },
  { name: "secondary_screen_b3.csv", size: "12.1 MB", rows: "48,200" },
  { name: "counter_screen.csv", size: "3.4 MB", rows: "12,400" },
  { name: "compounds_library.csv", size: "22.7 MB", rows: "210,000" },
  { name: "metadata.json", size: "128 KB", rows: "—" },
];

function ResizableSplit() {
  const [selected, setSelected] = useState(SAMPLE_FILES[0]);

  return (
    <div className="rounded-lg border border-border overflow-hidden h-72">
      {/* @ts-expect-error direction prop passes through to react-resizable-panels but isn't reflected in the wrapper type */}
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize="35%" minSize="20%" maxSize="55%">
          <div className="flex flex-col h-full">
            <div className="px-3 py-2 border-b border-border bg-muted/30">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Files
              </p>
            </div>
            <ScrollArea className="flex-1">
              <div className="py-1">
                {SAMPLE_FILES.map((file) => (
                  <button
                    key={file.name}
                    type="button"
                    onClick={() => setSelected(file)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-xs transition-colors cursor-pointer border-none bg-transparent",
                      selected.name === file.name
                        ? "bg-primary/8 text-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                  >
                    <span className="truncate block">{file.name}</span>
                    <span className="text-[10px] text-muted-foreground/60">{file.size}</span>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize="65%">
          <div className="flex flex-col h-full">
            <div className="px-4 py-2 border-b border-border bg-muted/30 flex items-center justify-between">
              <p className="text-xs font-semibold text-foreground truncate">{selected.name}</p>
              <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{selected.size}</span>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Row count", value: selected.rows },
                    { label: "File size", value: selected.size },
                    { label: "Format", value: selected.name.endsWith(".json") ? "JSON" : "CSV" },
                    { label: "Status", value: "Available" },
                  ].map((item) => (
                    <div key={item.label} className="space-y-0.5">
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-medium mb-2">
                    Preview
                  </p>
                  <div className="rounded border border-border overflow-x-auto">
                    <table className="text-[11px] w-full">
                      <thead className="bg-muted/40">
                        <tr>
                          {["compound_id", "smiles", "activity", "purity"].map((col) => (
                            <th
                              key={col}
                              className="px-2 py-1 text-left font-medium text-muted-foreground whitespace-nowrap"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {[
                          ["CMP-001", "CC(=O)Oc1cccc...", "3.42", "98.1%"],
                          ["CMP-002", "c1ccc(cc1)C(=O)...", "1.87", "95.4%"],
                          ["CMP-003", "CCO", "0.21", "99.9%"],
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-muted/20">
                            {row.map((cell, j) => (
                              <td key={j} className="px-2 py-1 font-mono text-muted-foreground">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

// =============================================================================
// Contextual Action Bar
// =============================================================================

const SELECTABLE_ROWS = [
  { id: "EXP-001", name: "DUX4 Primary Screen", assay: "Primary Screen", team: "Biology" },
  { id: "EXP-002", name: "ALS Validation Run", assay: "Secondary Screen", team: "Chemistry" },
  { id: "EXP-003", name: "Counter Screen QC", assay: "Counter Screen", team: "Informatics" },
  { id: "EXP-004", name: "HTF Cluster Analysis", assay: "Primary Screen", team: "Biology" },
  { id: "EXP-005", name: "KRAS Inhibitor Panel", assay: "Secondary Screen", team: "Chemistry" },
];

function ContextualActionBar() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) =>
      prev.size === SELECTABLE_ROWS.length
        ? new Set()
        : new Set(SELECTABLE_ROWS.map((r) => r.id))
    );
  }

  const allChecked = selected.size === SELECTABLE_ROWS.length;
  const someChecked = selected.size > 0 && !allChecked;

  return (
    <div className="rounded-lg border border-border overflow-hidden text-sm">
      {/* Contextual bar — appears when rows are selected */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 border-b border-border transition-colors",
          selected.size > 0
            ? "bg-primary/5 border-primary/20"
            : "bg-muted/30"
        )}
      >
        <input
          type="checkbox"
          checked={allChecked}
          ref={(el) => { if (el) el.indeterminate = someChecked; }}
          onChange={toggleAll}
          className="accent-primary cursor-pointer"
          aria-label="Select all"
        />

        {selected.size > 0 ? (
          <>
            <span className="text-xs font-semibold text-primary">
              {selected.size} selected
            </span>
            <div className="flex items-center gap-1.5 ml-1">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                <Download className="w-3 h-3" />
                Export
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1.5">
                <Tag className="w-3 h-3" />
                Tag
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs gap-1.5 text-destructive hover:text-destructive border-destructive/30 hover:border-destructive/60"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setSelected(new Set())}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          </>
        ) : (
          <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 flex-1 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Experiment</span>
            <span>Assay</span>
            <span>Team</span>
          </div>
        )}
      </div>

      {SELECTABLE_ROWS.map((row) => (
        <div
          key={row.id}
          onClick={() => toggle(row.id)}
          className={cn(
            "grid grid-cols-[auto_1fr_auto_auto] gap-x-4 px-4 py-2.5 border-b border-border last:border-0 items-center cursor-pointer transition-colors",
            selected.has(row.id) ? "bg-primary/5" : "hover:bg-muted/40"
          )}
        >
          <input
            type="checkbox"
            checked={selected.has(row.id)}
            onChange={() => toggle(row.id)}
            onClick={(e) => e.stopPropagation()}
            className="accent-primary cursor-pointer"
          />
          <span className="font-medium truncate">{row.name}</span>
          <span className="text-muted-foreground text-xs">{row.assay}</span>
          <span className="text-muted-foreground text-xs">{row.team}</span>
        </div>
      ))}
    </div>
  );
}

// =============================================================================
// DataToolsPatterns export
// =============================================================================

export function DataToolsPatterns() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Filter Bar with Chips</CardTitle>
          <p className="text-sm text-muted-foreground">
            Combine free-text search with structured dropdown filters. Active
            filters render as removable chips below the bar and filter the table
            live.
          </p>
        </CardHeader>
        <CardContent>
          <FilterBar />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Copy to Clipboard</CardTitle>
          <p className="text-sm text-muted-foreground">
            Code blocks with a copy button. The button shows a check mark for 2
            seconds after copying, then resets.
          </p>
        </CardHeader>
        <CardContent>
          <CopyToClipboard />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Contextual Action Bar</CardTitle>
          <p className="text-sm text-muted-foreground">
            Actions that appear when rows are selected. The header transforms from column labels
            into a count + action bar. Clicking the row or checkbox toggles selection.
          </p>
        </CardHeader>
        <CardContent>
          <ContextualActionBar />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Resizable Split Panel</CardTitle>
          <p className="text-sm text-muted-foreground">
            Drag the handle to resize panes. Use for file browsers, detail
            views, or any master-detail layout.
          </p>
        </CardHeader>
        <CardContent>
          <ResizableSplit />
        </CardContent>
      </Card>
    </div>
  );
}
