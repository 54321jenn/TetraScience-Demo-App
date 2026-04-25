import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
} from "@tetrascience-npm/tetrascience-react-ui";
import {
  AlertCircle,
  Bell,
  CheckCircle2,
  Database,
  GitBranch,
  Info,
  Settings,
  Shield,
  Upload,
  UserCheck,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// Accordion Config Sections
// =============================================================================

function AccordionConfig() {
  return (
    <Accordion type="multiple" defaultValue={["general"]} className="space-y-2">
      <AccordionItem
        value="general"
        className="rounded-lg border border-border px-4 data-[state=open]:border-primary/40"
      >
        <AccordionTrigger className="py-3 hover:no-underline [&>svg]:text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">General</p>
              <p className="text-xs text-muted-foreground font-normal">
                Pipeline name, version, and description
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cfg-name">Pipeline name</Label>
            <Input id="cfg-name" defaultValue="HTS Primary Screen v2" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cfg-ver">Version</Label>
              <Input id="cfg-ver" defaultValue="2.1.0" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cfg-env">Environment</Label>
              <Select defaultValue="prod">
                <SelectTrigger id="cfg-env">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dev">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="prod">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="data"
        className="rounded-lg border border-border px-4 data-[state=open]:border-primary/40"
      >
        <AccordionTrigger className="py-3 hover:no-underline [&>svg]:text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
              <Database className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Data Sources</p>
              <p className="text-xs text-muted-foreground font-normal">
                Input format and source connection settings
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cfg-source">Data source</Label>
            <Select defaultValue="s3">
              <SelectTrigger id="cfg-source">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                <SelectItem value="azure">Azure Blob</SelectItem>
                <SelectItem value="upload">Direct upload</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cfg-bucket">Bucket / container</Label>
            <Input id="cfg-bucket" placeholder="e.g. ts-hts-data-prod" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Validate on ingest</Label>
              <p className="text-xs text-muted-foreground">
                Run schema checks before processing begins
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="processing"
        className="rounded-lg border border-border px-4 data-[state=open]:border-primary/40"
      >
        <AccordionTrigger className="py-3 hover:no-underline [&>svg]:text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
              <Zap className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Processing</p>
              <p className="text-xs text-muted-foreground font-normal">
                Thresholds, clustering, and compute settings
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="cfg-threshold">Activity threshold (z)</Label>
              <Input id="cfg-threshold" type="number" defaultValue="2.0" step="0.1" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="cfg-purity">Min purity (%)</Label>
              <Input id="cfg-purity" type="number" defaultValue="95" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Auto-cluster</Label>
              <p className="text-xs text-muted-foreground">Run UMAP + HDBSCAN after filtering</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Parallel processing</Label>
              <p className="text-xs text-muted-foreground">Distribute across available workers</p>
            </div>
            <Switch />
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="notifications"
        className="rounded-lg border border-border px-4 data-[state=open]:border-primary/40"
      >
        <AccordionTrigger className="py-3 hover:no-underline [&>svg]:text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
              <Bell className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Notifications</p>
              <p className="text-xs text-muted-foreground font-normal">
                Alerts for job completion, failures, and warnings
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-3">
          {[
            { label: "On completion", desc: "Notify when a job finishes successfully", defaultOn: true },
            { label: "On failure", desc: "Alert immediately when a job fails", defaultOn: true },
            { label: "On warning", desc: "Notify on non-fatal processing warnings", defaultOn: false },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div>
                <Label className="font-medium">{item.label}</Label>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch defaultChecked={item.defaultOn} />
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem
        value="access"
        className="rounded-lg border border-border px-4 data-[state=open]:border-primary/40"
      >
        <AccordionTrigger className="py-3 hover:no-underline [&>svg]:text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-md bg-muted shrink-0">
              <Shield className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">Access Control</p>
              <p className="text-xs text-muted-foreground font-normal">
                Team visibility and role-based permissions
              </p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pb-4 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="cfg-visibility">Visibility</Label>
            <Select defaultValue="team">
              <SelectTrigger id="cfg-visibility">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Private — only me</SelectItem>
                <SelectItem value="team">Team — all members</SelectItem>
                <SelectItem value="org">Organization — everyone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Require approval to run</Label>
              <p className="text-xs text-muted-foreground">
                A team lead must approve before each run
              </p>
            </div>
            <Switch />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// =============================================================================
// Activity Feed / Timeline
// =============================================================================

type EventType = "success" | "info" | "warning" | "error" | "upload" | "user" | "deploy";

interface ActivityEvent {
  id: string;
  type: EventType;
  title: string;
  description?: string;
  actor?: string;
  timestamp: string;
  badges?: string[];
}

const EVENT_ICON: Record<EventType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  success: CheckCircle2,
  info: Info,
  warning: AlertCircle,
  error: AlertCircle,
  upload: Upload,
  user: UserCheck,
  deploy: GitBranch,
};

const EVENT_ICON_CN: Record<EventType, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  info: "text-blue-600 dark:text-blue-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
  upload: "text-violet-600 dark:text-violet-400",
  user: "text-sky-600 dark:text-sky-400",
  deploy: "text-indigo-600 dark:text-indigo-400",
};

const EVENT_DOT_CN: Record<EventType, string> = {
  success: "bg-emerald-500",
  info: "bg-blue-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  upload: "bg-violet-500",
  user: "bg-sky-500",
  deploy: "bg-indigo-500",
};

const EVENTS: ActivityEvent[] = [
  {
    id: "e1",
    type: "success",
    title: "Job completed",
    description: "Primary Screen — Batch 7 finished processing.",
    actor: "Pipeline",
    timestamp: "2 min ago",
    badges: ["649,568 rows", "4m 12s"],
  },
  {
    id: "e2",
    type: "upload",
    title: "Dataset uploaded",
    description: "primary_screen_b7.csv was ingested and validated.",
    actor: "J. Smith",
    timestamp: "18 min ago",
    badges: ["84.2 MB"],
  },
  {
    id: "e3",
    type: "error",
    title: "Job failed",
    description: "Counter Screen QC terminated: schema validation error on column 'purity_pct'.",
    actor: "Pipeline",
    timestamp: "1 hr ago",
  },
  {
    id: "e4",
    type: "user",
    title: "User added",
    description: "Dr. Patel was granted Editor access to this project.",
    actor: "J. Smith",
    timestamp: "3 hr ago",
  },
  {
    id: "e5",
    type: "deploy",
    title: "Pipeline updated",
    description: "hts-primary-screen upgraded from v2.0.4 → v2.1.0.",
    actor: "System",
    timestamp: "Yesterday",
    badges: ["v2.1.0"],
  },
  {
    id: "e6",
    type: "warning",
    title: "High missing-value rate",
    description: "Column 'smiles' had 8.4% null values — rows excluded from clustering.",
    actor: "Pipeline",
    timestamp: "Yesterday",
  },
  {
    id: "e7",
    type: "success",
    title: "Export complete",
    description: "Primary hit list exported to CSV (15 compounds).",
    actor: "A. Chen",
    timestamp: "2 days ago",
    badges: ["15 compounds"],
  },
  {
    id: "e8",
    type: "info",
    title: "Experiment created",
    description: "DUX4 Primary Screen experiment was initialized.",
    actor: "J. Smith",
    timestamp: "Apr 21",
  },
];

function ActivityFeed() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[18px] top-4 bottom-4 w-px bg-border" />

      <div className="space-y-0">
        {EVENTS.map((event, i) => {
          const Icon = EVENT_ICON[event.type];
          return (
            <div key={event.id} className={cn("flex gap-3 relative", i > 0 && "mt-5")}>
              {/* Dot */}
              <div className="flex flex-col items-center shrink-0 z-10 mt-1">
                <div
                  className={cn(
                    "w-[9px] h-[9px] rounded-full ring-2 ring-background shrink-0",
                    EVENT_DOT_CN[event.type]
                  )}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Icon className={cn("w-3.5 h-3.5 shrink-0", EVENT_ICON_CN[event.type])} />
                    <span className="text-sm font-semibold">{event.title}</span>
                    {event.badges?.map((b) => (
                      <Badge key={b} variant="outline" className="text-[10px] px-1.5 py-0">
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-[11px] text-muted-foreground whitespace-nowrap shrink-0 mt-0.5">
                    {event.timestamp}
                  </span>
                </div>
                {event.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {event.description}
                  </p>
                )}
                {event.actor && (
                  <p className="text-[11px] text-muted-foreground/60 mt-0.5">by {event.actor}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
          Load older activity
        </Button>
      </div>
    </div>
  );
}

// =============================================================================
// LayoutPatterns export
// =============================================================================

export function LayoutPatterns() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Accordion Config Sections</CardTitle>
          <p className="text-sm text-muted-foreground">
            Group related settings into collapsible sections. Multiple panels
            can be open simultaneously. Use icons and descriptions to orient
            users at a glance.
          </p>
        </CardHeader>
        <CardContent>
          <AccordionConfig />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Activity Feed / Timeline</CardTitle>
          <p className="text-sm text-muted-foreground">
            Chronological record of system and user events. Color-coded dots
            and icons let users scan for errors or key milestones without
            reading every line.
          </p>
        </CardHeader>
        <CardContent>
          <ActivityFeed />
        </CardContent>
      </Card>
    </div>
  );
}
