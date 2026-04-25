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
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tetrascience-npm/tetrascience-react-ui";
import {
  AlertCircle,
  Database,
  FileSearch,
  FolderOpen,
  Lock,
  PlusCircle,
  SearchX,
  ServerCrash,
  Trash2,
} from "lucide-react";

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
      <div className="relative">
        <span className="text-8xl font-black text-muted/60 select-none leading-none">404</span>
        <div className="absolute inset-0 flex items-center justify-center">
          <FileSearch className="w-12 h-12 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1.5 max-w-sm">
        <p className="text-lg font-semibold">Page not found</p>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Check
          the URL or head back home.
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
          <AlertDialogDescription>
            <span className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 text-destructive text-sm mb-2">
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
              <Input
                id="exp-desc"
                placeholder="Optional short description..."
              />
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
// PatternsPage
// =============================================================================

export function PatternsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Design Patterns</h1>
        <p className="text-muted-foreground text-sm">
          Common UI patterns — empty states, dialogs, and error pages.
        </p>
      </div>

      <Tabs defaultValue="empty-states">
        <TabsList>
          <TabsTrigger value="empty-states">Empty States</TabsTrigger>
          <TabsTrigger value="dialogs">Dialogs</TabsTrigger>
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
                Use for lightweight creation flows that don't warrant a
                full page.
              </p>
              <FormDialog />
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
