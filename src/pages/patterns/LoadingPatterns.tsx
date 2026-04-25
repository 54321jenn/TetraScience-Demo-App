import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Skeleton,
} from "@tetrascience-npm/tetrascience-react-ui";
import { cn } from "@/lib/utils";

// =============================================================================
// Skeleton Loaders
// =============================================================================

function StatCardSkeleton() {
  return (
    <div className="p-4 rounded-lg border bg-card space-y-2">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-7 w-28" />
      <Skeleton className="h-3 w-10" />
    </div>
  );
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-border last:border-0">
      <Skeleton className="h-4 w-24 shrink-0" />
      <Skeleton className="h-4 flex-1" />
      <Skeleton className="h-5 w-16 rounded-full shrink-0" />
      <Skeleton className="h-4 w-20 shrink-0" />
    </div>
  );
}

function CardSkeleton() {
  return (
    <Card>
      <CardHeader className="space-y-2 pb-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

function ProfileSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4">
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </div>
  );
}

// =============================================================================
// Status Badges
// =============================================================================

type JobStatus = "running" | "queued" | "failed" | "completed" | "cancelled" | "paused";

const STATUS: Record<
  JobStatus,
  { dot: string; badge: string; label: string; pulse?: boolean }
> = {
  running: {
    dot: "bg-blue-500",
    badge: "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
    label: "Running",
    pulse: true,
  },
  queued: {
    dot: "bg-amber-500",
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
    label: "Queued",
  },
  failed: {
    dot: "bg-red-500",
    badge: "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
    label: "Failed",
  },
  completed: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    label: "Completed",
  },
  cancelled: {
    dot: "bg-muted-foreground/40",
    badge: "border-border bg-muted text-muted-foreground",
    label: "Cancelled",
  },
  paused: {
    dot: "bg-violet-500",
    badge: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-950 dark:text-violet-300",
    label: "Paused",
  },
};

export function StatusBadge({ status }: { status: JobStatus }) {
  const cfg = STATUS[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        cfg.badge
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full shrink-0",
          cfg.dot,
          cfg.pulse && "animate-pulse"
        )}
      />
      {cfg.label}
    </span>
  );
}

const SAMPLE_JOBS = [
  { id: "JOB-001", name: "Primary Screen — Batch 7", status: "running" as JobStatus, duration: "4m 12s", records: "649,568" },
  { id: "JOB-002", name: "Global Filtering Pass", status: "completed" as JobStatus, duration: "1m 03s", records: "4,823" },
  { id: "JOB-003", name: "UMAP Clustering", status: "queued" as JobStatus, duration: "—", records: "—" },
  { id: "JOB-004", name: "Counter Screen QC", status: "failed" as JobStatus, duration: "0m 44s", records: "—" },
  { id: "JOB-005", name: "Export — Primary List", status: "cancelled" as JobStatus, duration: "—", records: "—" },
  { id: "JOB-006", name: "Secondary Screen", status: "paused" as JobStatus, duration: "2m 18s", records: "48,200" },
];

// =============================================================================
// LoadingPatterns export
// =============================================================================

export function LoadingPatterns() {
  return (
    <div className="space-y-8">
      {/* Skeleton loaders */}
      <Card>
        <CardHeader>
          <CardTitle>Skeleton Loaders</CardTitle>
          <p className="text-sm text-muted-foreground">
            Use shimmer placeholders while async data is fetching. Match the
            shape of the real content to reduce layout shift.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Stat cards
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Table rows
            </p>
            <div className="rounded-lg border border-border overflow-hidden">
              {Array.from({ length: 4 }).map((_, i) => (
                <TableRowSkeleton key={i} />
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Content cards
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardSkeleton />
              <ProfileSkeleton />
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Status badges */}
      <Card>
        <CardHeader>
          <CardTitle>Status Badges</CardTitle>
          <p className="text-sm text-muted-foreground">
            Consistent status indicators for pipeline jobs, experiments, and
            data processing runs.
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(STATUS) as JobStatus[]).map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>

          <Separator />

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              In context — job list
            </p>
            <div className="rounded-lg border border-border overflow-hidden text-sm">
              <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 px-4 py-2 border-b border-border bg-muted/30 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                <span>ID</span>
                <span>Job</span>
                <span>Status</span>
                <span className="text-right">Duration</span>
                <span className="text-right">Records</span>
              </div>
              {SAMPLE_JOBS.map((job) => (
                <div
                  key={job.id}
                  className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-x-4 px-4 py-2.5 border-b border-border last:border-0 items-center"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {job.id}
                  </span>
                  <span className="font-medium truncate">{job.name}</span>
                  <StatusBadge status={job.status} />
                  <span className="text-right text-muted-foreground tabular-nums">
                    {job.duration}
                  </span>
                  <span className="text-right text-muted-foreground tabular-nums">
                    {job.records}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
