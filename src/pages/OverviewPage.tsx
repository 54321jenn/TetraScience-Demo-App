import {
  Card,
  Badge,
  Button,
  Toggle,
  Tooltip,
  TabGroup,
  Checkbox,
  Textarea,
  Toast,
} from "@tetrascience-npm/tetrascience-react-ui";
import { useState } from "react";

export function OverviewPage() {
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [activeTab, setActiveTab] = useState("buttons");

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">TetraScience UI Showcase</h1>
        <p className="text-muted-foreground text-sm">
          Exploring all components from{" "}
          <code className="text-xs bg-muted px-1 py-0.5 rounded">
            @tetrascience-npm/tetrascience-react-ui
          </code>
        </p>
      </div>

      <TabGroup
        tabs={[
          { id: "buttons", label: "Buttons & Badges" },
          { id: "cards", label: "Cards" },
          { id: "inputs", label: "Inputs" },
          { id: "feedback", label: "Feedback" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "buttons" && (
        <div className="space-y-6">
          <Card title="Buttons" variant="outlined">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Variants</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Sizes</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" size="small">Small</Button>
                  <Button variant="primary" size="medium">Medium</Button>
                  <Button variant="secondary" size="small">Small Secondary</Button>
                  <Button variant="secondary" size="medium">Medium Secondary</Button>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Full Width</p>
                <Button variant="primary" fullWidth>Full Width Button</Button>
              </div>
            </div>
          </Card>

          <Card title="Badges" variant="outlined">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="primary">Primary</Badge>
              <Badge variant="default" size="small">Small Default</Badge>
              <Badge variant="primary" size="small">Small Primary</Badge>
            </div>
          </Card>

          <Card title="Tooltip" variant="outlined">
            <div className="flex gap-4">
              <Tooltip content="This is a helpful tooltip" placement="top">
                <Button variant="secondary">Hover (top)</Button>
              </Tooltip>
              <Tooltip content="Tooltip on the right" placement="right">
                <Button variant="secondary">Hover (right)</Button>
              </Tooltip>
              <Tooltip content="Bottom tooltip content" placement="bottom">
                <Button variant="secondary">Hover (bottom)</Button>
              </Tooltip>
              <Tooltip content="Left tooltip content" placement="left">
                <Button variant="secondary">Hover (left)</Button>
              </Tooltip>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "cards" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Card title="Default Card" variant="default">
              <p className="text-sm text-muted-foreground">
                Standard card with default styling. Used for grouping related content.
              </p>
            </Card>
            <Card title="Outlined Card" variant="outlined">
              <p className="text-sm text-muted-foreground">
                Outlined card with a visible border. Ideal for forms and settings.
              </p>
            </Card>
            <Card title="Elevated Card" variant="elevated">
              <p className="text-sm text-muted-foreground">
                Elevated card with a drop shadow. Good for highlighting key info.
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Card title="Small" size="small" variant="outlined">
              <p className="text-sm text-muted-foreground">Compact card for dense layouts.</p>
            </Card>
            <Card title="Medium" size="medium" variant="outlined">
              <p className="text-sm text-muted-foreground">Standard medium card size.</p>
            </Card>
            <Card title="Large" size="large" variant="outlined">
              <p className="text-sm text-muted-foreground">Large card for detailed content sections.</p>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "inputs" && (
        <div className="space-y-6">
          <Card title="Checkbox" variant="outlined">
            <div className="space-y-3">
              <Checkbox
                label="Accept terms and conditions"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
              <Checkbox label="Pre-checked" checked={true} onChange={() => {}} />
              <Checkbox label="Disabled unchecked" checked={false} onChange={() => {}} disabled />
              <Checkbox label="Disabled checked" checked={true} onChange={() => {}} disabled />
            </div>
          </Card>

          <Card title="Toggle" variant="outlined">
            <div className="space-y-3">
              <Toggle checked={toggled} onChange={setToggled} label="Enable notifications" />
              <Toggle checked={true} onChange={() => {}} label="Always on" />
              <Toggle checked={false} onChange={() => {}} label="Disabled" disabled />
            </div>
          </Card>

          <Card title="Textarea" variant="outlined">
            <div className="space-y-3">
              <Textarea placeholder="Enter your notes here..." rows={4} />
              <Textarea placeholder="Error state textarea" rows={2} error />
              <Textarea placeholder="Disabled textarea" rows={2} disabled />
            </div>
          </Card>
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="space-y-6">
          <Card title="Toast Notifications" variant="outlined">
            <div className="space-y-3">
              <Toast type="info" heading="Information" description="This is an informational message for the user." />
              <Toast type="success" heading="Success" description="Operation completed successfully!" />
              <Toast type="warning" heading="Warning" description="Please review your input before proceeding." />
              <Toast type="danger" heading="Error" description="Something went wrong. Please try again." />
              <Toast type="default" heading="Default" description="A standard notification message." />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
