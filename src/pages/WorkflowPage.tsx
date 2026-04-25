import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@tetrascience-npm/tetrascience-react-ui";
import {
  BarChart3,
  Download,
  Filter,
  LayoutGrid,
  Search,
  TrendingDown,
} from "lucide-react";

const STEP_CONTENT: Record<
  string,
  { title: string; description: string; icon: React.FC; stats: { label: string; value: string }[] }
> = {
  "data-overview": {
    title: "Data Overview",
    description:
      "Review the raw dataset before any filtering. Inspect distributions, check data quality, and identify potential outliers.",
    icon: () => <LayoutGrid className="w-5 h-5 text-primary" />,
    stats: [
      { label: "Total Records", value: "649,568" },
      { label: "Features", value: "24" },
      { label: "Missing Values", value: "0.4%" },
      { label: "Duplicates", value: "6,172" },
    ],
  },
  "global-filtering": {
    title: "Global Filtering",
    description:
      "Apply quality filters to remove low-confidence hits. Records failing purity, activity, or completeness thresholds are excluded.",
    icon: () => <Filter className="w-5 h-5 text-primary" />,
    stats: [
      { label: "Passed Filter", value: "4,823" },
      { label: "Removed", value: "640,573" },
      { label: "Removal Rate", value: "98.6%" },
      { label: "Purity Cutoff", value: "≥ 95%" },
    ],
  },
  "explore-clusters": {
    title: "Explore Clusters",
    description:
      "Use dimensionality reduction and clustering to group similar compounds. Identify distinct populations for downstream selection.",
    icon: () => <BarChart3 className="w-5 h-5 text-primary" />,
    stats: [
      { label: "Clusters Found", value: "20" },
      { label: "Compounds", value: "4,823" },
      { label: "Avg Cluster Size", value: "241" },
      { label: "Silhouette Score", value: "0.74" },
    ],
  },
  "review-selection": {
    title: "Review Selection",
    description:
      "Manually review top candidates from each cluster. Apply domain expertise to curate a final set for experimental confirmation.",
    icon: () => <Search className="w-5 h-5 text-primary" />,
    stats: [
      { label: "Candidates In", value: "20" },
      { label: "Selected", value: "15" },
      { label: "Rejected", value: "5" },
      { label: "Confidence", value: "High" },
    ],
  },
  "export-primary-list": {
    title: "Export Primary List",
    description:
      "Export the curated primary hit list as a structured dataset. Downstream teams can use this for synthesis and biological validation.",
    icon: () => <Download className="w-5 h-5 text-primary" />,
    stats: [
      { label: "Records", value: "15" },
      { label: "Format", value: "CSV / JSON" },
      { label: "Schema Version", value: "v2.1" },
      { label: "Status", value: "Ready" },
    ],
  },
};

function FunnelBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(4, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-28 shrink-0 text-right">{label}</span>
      <div className="flex-1 bg-muted rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-xs font-mono text-muted-foreground w-20 shrink-0">
        {value.toLocaleString()}
      </span>
    </div>
  );
}

interface WorkflowPageProps {
  activeStepId: string;
}

export function WorkflowPage({ activeStepId }: WorkflowPageProps) {
  const content = STEP_CONTENT[activeStepId];
  if (!content) return null;
  const Icon = content.icon;

  return (
    <div className="p-8 space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20">
          <Icon />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{content.title}</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{content.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {content.stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-5 pb-4">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeStepId === "data-overview" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <TrendingDown className="w-4 h-4" />
              Processing Funnel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <FunnelBar label="Raw Records" value={649568} max={649568} />
            <FunnelBar label="After QC Filter" value={4823} max={649568} />
            <FunnelBar label="After Clustering" value={20} max={649568} />
            <FunnelBar label="Final Selection" value={15} max={649568} />
          </CardContent>
        </Card>
      )}

      {activeStepId === "global-filtering" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Active Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {[
                "Purity ≥ 95%",
                "Activity z-score ≥ 2.0",
                "No missing values",
                "Exclude flagged batches",
                "MW ≤ 500 Da",
                "cLogP ≤ 5",
              ].map((f) => (
                <Badge key={f} variant="secondary" className="font-mono text-xs">
                  {f}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeStepId === "explore-clusters" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Cluster Size Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { name: "Cluster A", size: 412 },
              { name: "Cluster B", size: 387 },
              { name: "Cluster C", size: 301 },
              { name: "Cluster D", size: 278 },
              { name: "Cluster E", size: 194 },
            ].map((c) => (
              <FunnelBar key={c.name} label={c.name} value={c.size} max={412} />
            ))}
            <p className="text-xs text-muted-foreground pt-1">Showing top 5 of 20 clusters</p>
          </CardContent>
        </Card>
      )}

      {activeStepId === "review-selection" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Selection Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from({ length: 15 }, (_, i) => ({
                id: `CMP-${1000 + i}`,
                cluster: `Cluster ${String.fromCharCode(65 + (i % 5))}`,
                score: (0.95 - i * 0.02).toFixed(2),
              })).map((row) => (
                <div
                  key={row.id}
                  className="flex items-center justify-between py-1.5 px-3 rounded-md bg-muted/40 text-sm"
                >
                  <span className="font-mono text-xs text-muted-foreground">{row.id}</span>
                  <Badge variant="outline" className="text-xs">{row.cluster}</Badge>
                  <span className="text-xs font-semibold">{row.score}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeStepId === "export-primary-list" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Export Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs font-mono bg-muted/50 rounded-md p-4 overflow-x-auto text-muted-foreground leading-relaxed">
              {`compound_id,cluster,activity_score,purity,mw
CMP-1000,Cluster A,0.95,98.2,342.4
CMP-1001,Cluster A,0.93,97.8,318.1
CMP-1002,Cluster B,0.91,99.1,401.7
CMP-1003,Cluster B,0.89,96.4,287.3
CMP-1004,Cluster C,0.87,98.8,365.2
...`}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
