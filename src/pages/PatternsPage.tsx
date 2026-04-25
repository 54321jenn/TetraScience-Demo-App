import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "@tetrascience-npm/tetrascience-react-ui";
import {
  AlertCircle,
  Check,
  Database,
  FolderOpen,
  Lock,
  PanelRight,
  PlusCircle,
  SearchX,
  ServerCrash,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// =============================================================================
// Empty States
// =============================================================================

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-14 px-6 text-center gap-4">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted">
        <Icon className="w-7 h-7 text-muted-foreground" />
      </div>
      <div className="space-y-1 max-w-xs">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function NotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-5">
      <span className="text-8xl font-black text-muted-foreground/20 select-none leading-none">
        404
      </span>
      <div className="space-y-1.5 max-w-sm">
        <p className="text-lg font-semibold">Page not found</p>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or head back home.
        </p>
      </div>
      <Button variant="outline" size="sm">
        Back to Home
      </Button>
    </div>
  );
}

// =============================================================================
// Dialogs
// =============================================================================

function ConfirmDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Confirm Action</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently archive this experiment and remove it from
            your active dashboard. You can restore it from Settings.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function DestructiveDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="w-4 h-4" />
          Delete Record
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this record?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <span className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              This action cannot be undone. The record and all associated
              annotations will be permanently deleted.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function FormDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="w-4 h-4" />
          New Experiment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle>Create Experiment</DialogTitle>
          <DialogDescription>
            Set up a new experiment. You can configure parameters after
            creation.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="exp-name">Experiment name</Label>
              <Input id="exp-name" placeholder="e.g. DUX4 Primary Screening" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="exp-project">Project</Label>
              <Input id="exp-project" placeholder="e.g. Target ID 2025" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="exp-desc">Description</Label>
              <Input id="exp-desc" placeholder="Optional short description..." />
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// =============================================================================
// Standard Form
// =============================================================================

function StandardForm() {
  const [notifications, setNotifications] = useState(true);
  const [agreed, setAgreed] = useState(false);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Personal info */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Personal Information
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="sf-first">First name *</Label>
            <Input id="sf-first" placeholder="Jane" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sf-last">Last name *</Label>
            <Input id="sf-last" placeholder="Smith" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="sf-email">Email *</Label>
            <Input id="sf-email" type="email" placeholder="jane@example.com" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Role & team */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Role & Team
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="sf-role">Role</Label>
            <Select>
              <SelectTrigger id="sf-role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scientist">Scientist</SelectItem>
                <SelectItem value="analyst">Data Analyst</SelectItem>
                <SelectItem value="engineer">Engineer</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="sf-team">Team</Label>
            <Input id="sf-team" placeholder="e.g. Biology Platform" />
          </div>
        </div>
      </div>

      <Separator />

      {/* Access level */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
          Access Level
        </p>
        <RadioGroup defaultValue="viewer" className="space-y-2">
          {[
            { value: "viewer", label: "Viewer", desc: "Read-only access to shared datasets" },
            { value: "editor", label: "Editor", desc: "Can create and edit experiments" },
            { value: "admin", label: "Admin", desc: "Full access including user management" },
          ].map((opt) => (
            <div key={opt.value} className="flex items-start gap-3">
              <RadioGroupItem value={opt.value} id={`sf-role-${opt.value}`} className="mt-0.5" />
              <div>
                <Label htmlFor={`sf-role-${opt.value}`} className="font-medium cursor-pointer">
                  {opt.label}
                </Label>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Preferences */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Preferences
        </p>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="sf-notif" className="font-medium">Email notifications</Label>
            <p className="text-xs text-muted-foreground">Receive digest emails for activity</p>
          </div>
          <Switch
            id="sf-notif"
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="sf-bio">Bio</Label>
          <Textarea id="sf-bio" placeholder="A short description about you..." rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="sf-agree"
            checked={agreed}
            onCheckedChange={(v) => setAgreed(v === true)}
          />
          <Label htmlFor="sf-agree" className="cursor-pointer text-sm">
            I agree to the terms and conditions
          </Label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="reset">
          Reset
        </Button>
        <Button type="submit" disabled={!agreed}>
          Save Changes
        </Button>
      </div>
    </form>
  );
}

// =============================================================================
// Stepper Form
// =============================================================================

const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Dataset" },
  { id: 3, label: "Settings" },
  { id: 4, label: "Review" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="Form progress" className="flex items-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <div key={step.id} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors",
                  done
                    ? "bg-primary border-primary text-primary-foreground"
                    : active
                      ? "border-primary text-primary bg-background"
                      : "border-border text-muted-foreground bg-background"
                )}
              >
                {done ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={cn(
                  "text-[11px] font-medium whitespace-nowrap",
                  active ? "text-primary" : done ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-0.5 mx-2 mt-[-14px] rounded-full transition-colors",
                  done ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}

function StepperForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
          <Check className="w-7 h-7 text-primary" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Experiment Created</p>
          <p className="text-sm text-muted-foreground">
            Your new experiment is ready. You'll receive an email when data processing begins.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { setStep(1); setSubmitted(false); }}>
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div>
      <StepIndicator current={step} />

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Step 1 of 4 — Tell us about the project this experiment belongs to.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="st-proj-name">Project name *</Label>
            <Input id="st-proj-name" placeholder="e.g. DUX4 Gene Therapy" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="st-proj-lead">Project lead</Label>
            <Input id="st-proj-lead" placeholder="e.g. Dr. Jane Smith" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="st-proj-type">Project type</Label>
            <Select>
              <SelectTrigger id="st-proj-type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discovery">Discovery</SelectItem>
                <SelectItem value="validation">Validation</SelectItem>
                <SelectItem value="clinical">Clinical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Step 2 of 4 — Choose a dataset to analyze.
          </p>
          <RadioGroup defaultValue="ds1" className="space-y-2.5">
            {[
              { value: "ds1", label: "Primary Screen — Batch 7", meta: "649,568 records · uploaded Apr 2025" },
              { value: "ds2", label: "Secondary Screen — Batch 3", meta: "48,200 records · uploaded Mar 2025" },
              { value: "ds3", label: "Counter Screen", meta: "12,400 records · uploaded Feb 2025" },
            ].map((ds) => (
              <div
                key={ds.value}
                className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-primary/40 transition-colors cursor-pointer"
              >
                <RadioGroupItem value={ds.value} id={`ds-${ds.value}`} className="mt-0.5" />
                <div>
                  <Label htmlFor={`ds-${ds.value}`} className="font-medium cursor-pointer">
                    {ds.label}
                  </Label>
                  <p className="text-xs text-muted-foreground">{ds.meta}</p>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Step 3 of 4 — Configure analysis settings.
          </p>
          <div className="space-y-1.5">
            <Label htmlFor="st-threshold">Activity threshold</Label>
            <Input id="st-threshold" type="number" defaultValue="2.0" step="0.1" />
            <p className="text-xs text-muted-foreground">Z-score cutoff for hit calling</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="st-purity">Minimum purity (%)</Label>
            <Input id="st-purity" type="number" defaultValue="95" min="0" max="100" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <div>
              <Label className="font-medium">Auto-cluster results</Label>
              <p className="text-xs text-muted-foreground">Run UMAP + HDBSCAN after filtering</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Email when complete</Label>
              <p className="text-xs text-muted-foreground">Notify when processing finishes</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-muted-foreground mb-4">
            Step 4 of 4 — Review your configuration before submitting.
          </p>
          <div className="rounded-lg border border-border divide-y divide-border text-sm">
            {[
              { label: "Project", value: "DUX4 Gene Therapy" },
              { label: "Dataset", value: "Primary Screen — Batch 7" },
              { label: "Activity threshold", value: "z ≥ 2.0" },
              { label: "Minimum purity", value: "95%" },
              { label: "Auto-cluster", value: "Enabled" },
              { label: "Email notification", value: "Enabled" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-2.5">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-8 pt-4 border-t border-border">
        <Button
          variant="outline"
          disabled={step === 1}
          onClick={() => setStep((s) => s - 1)}
        >
          Back
        </Button>
        <span className="text-xs text-muted-foreground">{step} / {STEPS.length}</span>
        {step < STEPS.length ? (
          <Button onClick={() => setStep((s) => s + 1)}>Next</Button>
        ) : (
          <Button onClick={() => setSubmitted(true)}>Submit</Button>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// Side Sheet Form
// =============================================================================

function SideSheetForm() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PanelRight className="w-4 h-4" />
          Edit in Side Sheet
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[400px] sm:w-[480px] sm:max-w-[480px] flex flex-col p-0"
      >
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle>Edit Compound</SheetTitle>
          <p className="text-sm text-muted-foreground">
            Update properties for CMP-1042. Changes are saved when you click Save.
          </p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="ss-name">Compound name</Label>
            <Input id="ss-name" defaultValue="CMP-1042" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ss-smiles">SMILES</Label>
            <Textarea id="ss-smiles" rows={2} defaultValue="CC(=O)Oc1ccccc1C(=O)O" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="ss-mw">MW (Da)</Label>
              <Input id="ss-mw" type="number" defaultValue="180.16" step="0.01" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="ss-logp">cLogP</Label>
              <Input id="ss-logp" type="number" defaultValue="1.19" step="0.01" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ss-status">Status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="ss-status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Flag for review</Label>
              <p className="text-xs text-muted-foreground">
                Adds this compound to the review queue
              </p>
            </div>
            <Switch />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ss-notes">Notes</Label>
            <Textarea
              id="ss-notes"
              rows={4}
              placeholder="Add internal notes about this compound..."
            />
          </div>
        </div>

        <SheetFooter className="px-6 py-4 border-t border-border">
          <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={() => setOpen(false)}>
            Save Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// =============================================================================
// PatternsPage
// =============================================================================

export function PatternsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Design Patterns</h1>
        <p className="text-muted-foreground text-sm">
          Common UI patterns — empty states, dialogs, forms, and error pages.
        </p>
      </div>

      <Tabs defaultValue="empty-states">
        <TabsList>
          <TabsTrigger value="empty-states">Empty States</TabsTrigger>
          <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="404">404 / Error</TabsTrigger>
        </TabsList>

        {/* ── Empty States ─────────────────────────────────────────────── */}
        <TabsContent value="empty-states" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  No Data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <EmptyState
                  icon={Database}
                  title="No records yet"
                  description="Import a dataset or connect a data source to get started."
                  action={
                    <Button size="sm">
                      <PlusCircle className="w-4 h-4" />
                      Import Data
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  No Search Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <EmptyState
                  icon={SearchX}
                  title="No results found"
                  description='No experiments match "ProteinX". Try adjusting your filters or search terms.'
                  action={
                    <Button variant="ghost" size="sm">
                      Clear filters
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  No Access
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <EmptyState
                  icon={Lock}
                  title="Access restricted"
                  description="You don't have permission to view this resource. Contact your admin."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  Empty Folder
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <EmptyState
                  icon={FolderOpen}
                  title="This folder is empty"
                  description="Drag files here or use the upload button to add content."
                  action={
                    <Button size="sm" variant="outline">
                      Upload files
                    </Button>
                  }
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">
                  Server Error
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <EmptyState
                  icon={ServerCrash}
                  title="Something went wrong"
                  description="We couldn't load your data. This is usually temporary — try again."
                  action={
                    <Button size="sm" variant="outline">
                      Retry
                    </Button>
                  }
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── Dialogs ──────────────────────────────────────────────────── */}
        <TabsContent value="dialogs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Confirmation Dialog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use for actions that are reversible but need acknowledgement.
              </p>
              <ConfirmDialog />
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Destructive Action Dialog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use for irreversible actions. Include a visual danger indicator
                inside the dialog body.
              </p>
              <DestructiveDialog />
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Form Dialog</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Use for lightweight creation flows that don't warrant a full
                page.
              </p>
              <FormDialog />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Forms ────────────────────────────────────────────────────── */}
        <TabsContent value="forms" className="space-y-8 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Standard Form</CardTitle>
              <p className="text-sm text-muted-foreground">
                Full-page form layout with sections, radio groups, toggles, and
                validation-ready structure.
              </p>
            </CardHeader>
            <CardContent>
              <StandardForm />
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Stepper Form</CardTitle>
              <p className="text-sm text-muted-foreground">
                Multi-step form with a progress indicator. Use when the task has
                distinct sequential phases.
              </p>
            </CardHeader>
            <CardContent>
              <StepperForm />
            </CardContent>
          </Card>

          <Separator />

          <Card>
            <CardHeader>
              <CardTitle>Side Sheet Form</CardTitle>
              <p className="text-sm text-muted-foreground">
                Edit panel in a side sheet overlay. Keeps the user in context
                while editing a record inline.
              </p>
            </CardHeader>
            <CardContent>
              <SideSheetForm />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── 404 / Error ──────────────────────────────────────────────── */}
        <TabsContent value="404" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>404 — Page Not Found</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <NotFoundState />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
