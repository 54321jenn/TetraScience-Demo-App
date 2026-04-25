import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Checkbox,
  Label,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@tetrascience-npm/tetrascience-react-ui";
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from "lucide-react";

export function OverviewPage() {
  const [checked, setChecked] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">TetraScience UI Showcase</h1>
        <p className="text-muted-foreground text-sm">
          Exploring components from{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            @tetrascience-npm/tetrascience-react-ui@0.5.0-beta
          </code>
        </p>
      </div>

      <Tabs defaultValue="buttons">
        <TabsList>
          <TabsTrigger value="buttons">Buttons & Badges</TabsTrigger>
          <TabsTrigger value="cards">Cards</TabsTrigger>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        {/* ── Buttons & Badges ──────────────────────────────────────────── */}
        <TabsContent value="buttons" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  Variants
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button>Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="link">Link</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  Sizes
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="xs">XS</Button>
                  <Button size="sm">Small</Button>
                  <Button>Default</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  Button Group
                </p>
                <ButtonGroup>
                  <Button variant="outline">Left</Button>
                  <Button variant="outline">Center</Button>
                  <Button variant="outline">Right</Button>
                </ButtonGroup>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tooltips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover (top)</Button>
                  </TooltipTrigger>
                  <TooltipContent>This is a helpful tooltip</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover (right)</Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Tooltip on the right</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover (bottom)</Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Bottom tooltip</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Cards ──────────────────────────────────────────────────────── */}
        <TabsContent value="cards" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Default Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Standard card for grouping related content.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle>Highlighted Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card with a custom border accent for emphasis.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle>Muted Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Card with a muted background for less prominent content.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Stat Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Samples", value: "1,284", delta: "+12%" },
                  { label: "Experiments", value: "47", delta: "+3%" },
                  { label: "Avg Purity", value: "98.2%", delta: "-0.4%" },
                  { label: "Active Runs", value: "6", delta: "0" },
                ].map((stat) => (
                  <div key={stat.label} className="p-4 rounded-lg border bg-card space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p
                      className={`text-xs font-medium ${
                        stat.delta.startsWith("+")
                          ? "text-emerald-600"
                          : stat.delta.startsWith("-")
                            ? "text-red-500"
                            : "text-muted-foreground"
                      }`}
                    >
                      {stat.delta}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Inputs ─────────────────────────────────────────────────────── */}
        <TabsContent value="inputs" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Checkbox</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="terms"
                  checked={checked}
                  onCheckedChange={(v) => setChecked(v === true)}
                />
                <Label htmlFor="terms">Accept terms and conditions</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="pre-checked" checked={true} onCheckedChange={() => {}} />
                <Label htmlFor="pre-checked">Pre-checked</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="disabled" disabled />
                <Label htmlFor="disabled" className="text-muted-foreground">
                  Disabled
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="disabled-checked" checked={true} disabled />
                <Label htmlFor="disabled-checked" className="text-muted-foreground">
                  Disabled checked
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Switch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Switch
                  id="notifications"
                  checked={switchOn}
                  onCheckedChange={setSwitchOn}
                />
                <Label htmlFor="notifications">Enable notifications</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch id="always-on" checked={true} disabled />
                <Label htmlFor="always-on" className="text-muted-foreground">
                  Always on (disabled)
                </Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea placeholder="Enter your notes here..." rows={4} />
              <Textarea placeholder="Disabled textarea" rows={2} disabled />
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── Feedback ───────────────────────────────────────────────────── */}
        <TabsContent value="feedback" className="space-y-4 mt-6">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information</AlertTitle>
            <AlertDescription>
              This is an informational message for the user.
            </AlertDescription>
          </Alert>

          <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900 [&>svg]:text-emerald-600">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Operation completed successfully!</AlertDescription>
          </Alert>

          <Alert className="border-amber-200 bg-amber-50 text-amber-900 [&>svg]:text-amber-600">
            <TriangleAlert className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Please review your input before proceeding.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
