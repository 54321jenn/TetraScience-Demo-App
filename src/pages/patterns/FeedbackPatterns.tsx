import { useState, useEffect, useCallback } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
} from "@tetrascience-npm/tetrascience-react-ui";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// Snackbars / Toasts
// =============================================================================

type SnackVariant = "success" | "error" | "info" | "warning";

interface Snack {
  id: number;
  variant: SnackVariant;
  message: string;
  action?: { label: string; onClick: () => void };
}

const SNACK_ICON: Record<SnackVariant, React.FC<React.SVGProps<SVGSVGElement>>> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
};

const SNACK_CN: Record<SnackVariant, string> = {
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100",
  error:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-100",
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-100",
};

const SNACK_ICON_CN: Record<SnackVariant, string> = {
  success: "text-emerald-600 dark:text-emerald-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-blue-600 dark:text-blue-400",
  warning: "text-amber-600 dark:text-amber-400",
};

let _snackId = 0;

function SnackItem({ snack, onDismiss }: { snack: Snack; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(snack.id), 4000);
    return () => clearTimeout(t);
  }, [snack.id, onDismiss]);

  const Icon = SNACK_ICON[snack.variant];
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg border px-4 py-3 shadow-md text-sm min-w-[280px] max-w-[400px]",
        SNACK_CN[snack.variant]
      )}
    >
      <Icon className={cn("w-4 h-4 shrink-0", SNACK_ICON_CN[snack.variant])} />
      <span className="flex-1 font-medium">{snack.message}</span>
      {snack.action && (
        <button
          type="button"
          onClick={snack.action.onClick}
          className="text-xs font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity cursor-pointer shrink-0"
        >
          {snack.action.label}
        </button>
      )}
      <button
        type="button"
        onClick={() => onDismiss(snack.id)}
        className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function SnackbarDemo() {
  const [snacks, setSnacks] = useState<Snack[]>([]);

  const dismiss = useCallback((id: number) => {
    setSnacks((prev) => prev.filter((s) => s.id !== id));
  }, []);

  function show(variant: SnackVariant, message: string, action?: Snack["action"]) {
    const id = ++_snackId;
    setSnacks((prev) => [...prev.slice(-2), { id, variant, message, action }]);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => show("success", "Pipeline started successfully.")}
        >
          Success
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            show("error", "Failed to connect to data source.", {
              label: "Retry",
              onClick: () => {},
            })
          }
        >
          Error + action
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            show("info", "3 rows were excluded from export.", {
              label: "View",
              onClick: () => {},
            })
          }
        >
          Info + action
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => show("warning", "Dataset schema has changed since last run.")}
        >
          Warning
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Toasts auto-dismiss after 4 seconds. Up to 3 visible at once.
      </p>

      {/* Fixed stack — bottom-right of viewport */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-50 pointer-events-none">
        {snacks.map((s) => (
          <div key={s.id} className="pointer-events-auto">
            <SnackItem snack={s} onDismiss={dismiss} />
          </div>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
// Banners
// =============================================================================

type BannerVariant = "info" | "warning" | "error" | "success";

const BANNER_CN: Record<BannerVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800 dark:bg-blue-950/60 dark:text-blue-100",
  warning:
    "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-800 dark:bg-amber-950/60 dark:text-amber-100",
  error:
    "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/60 dark:text-red-100",
  success:
    "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-100",
};

const BANNER_ICON: Record<BannerVariant, React.FC<React.SVGProps<SVGSVGElement>>> = {
  info: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
};

const BANNER_ICON_CN: Record<BannerVariant, string> = {
  info: "text-blue-600 dark:text-blue-400",
  warning: "text-amber-600 dark:text-amber-400",
  error: "text-red-600 dark:text-red-400",
  success: "text-emerald-600 dark:text-emerald-400",
};

function Banner({
  variant,
  title,
  description,
  action,
  dismissible = true,
}: {
  variant: BannerVariant;
  title: string;
  description?: string;
  action?: React.ReactNode;
  dismissible?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  const Icon = BANNER_ICON[variant];

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        BANNER_CN[variant]
      )}
    >
      <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", BANNER_ICON_CN[variant])} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold">{title}</p>
        {description && <p className="mt-0.5 opacity-80 text-sm">{description}</p>}
        {action && <div className="mt-2">{action}</div>}
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer shrink-0 mt-0.5"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

function BannerExamples() {
  return (
    <div className="space-y-3">
      <Banner
        variant="info"
        title="Scheduled maintenance tonight"
        description="The platform will be unavailable from 2:00–4:00 AM UTC on April 26. Save your work before then."
      />
      <Banner
        variant="warning"
        title="Your trial ends in 3 days"
        description="Upgrade to a paid plan to keep access to all features."
        action={
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Upgrade now
          </Button>
        }
      />
      <Banner
        variant="error"
        title="API key expired"
        description="Your TetraScience API key expired on April 20. Pipelines are paused until you renew it."
        action={
          <Button size="sm" variant="outline" className="h-7 text-xs">
            Renew key
          </Button>
        }
      />
      <Banner
        variant="success"
        title="Account verified"
        description="Your email address has been confirmed. You now have full access."
      />
    </div>
  );
}

// =============================================================================
// FeedbackPatterns export
// =============================================================================

export function FeedbackPatterns() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Snackbars / Toasts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Brief, auto-dismissing notifications for action feedback. Stack at the bottom-right of
            the viewport. Include an optional action link for undo or navigation.
          </p>
        </CardHeader>
        <CardContent>
          <SnackbarDemo />
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Banners</CardTitle>
          <p className="text-sm text-muted-foreground">
            Persistent, dismissible notices at the top of a page or section. Use for system status,
            account alerts, or onboarding prompts that need to persist until acted on.
          </p>
        </CardHeader>
        <CardContent>
          <BannerExamples />
        </CardContent>
      </Card>
    </div>
  );
}
