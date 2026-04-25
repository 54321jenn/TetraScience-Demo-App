import ReactMarkdown from "react-markdown";
import {
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@tetrascience-npm/tetrascience-react-ui";
import { X } from "lucide-react";

const HELP_MARKDOWN = `# TetraScience UI Showcase

This showcase demonstrates the component library **\`@tetrascience-npm/tetrascience-react-ui\`** built on shadcn/ui principles with TetraScience's design tokens.

---

## Components Available

### Layout
- **DataAppShell** — Full-page app shell with icon-rail sidebar, breadcrumb top nav, mobile drawer, and \`sidebarPanel\` slot
- **WorkflowPanel** — Collapsible step-by-step workflow panel for the \`sidebarPanel\` slot

### Navigation & Feedback
- **Breadcrumb** — Multi-level breadcrumb with link and button variants
- **Badge** — Status and label indicators
- **Alert** — Info, success, warning, and error messages
- **Tooltip** — Accessible hover hints (requires \`TooltipProvider\` at root)

### Input & Forms
- **Button** — Variants: default, secondary, outline, ghost, destructive, link
- **ButtonGroup** — Joined button segments
- **Checkbox**, **Switch**, **Textarea**, **Input** — Form controls
- **Select**, **Combobox** — Dropdown selection

### Data Display
- **DataTable** — Full-featured table with sorting, filtering, column visibility, and pagination
- **Card** — Content grouping with header, body, and footer
- **Tabs** — Horizontal tab navigation

### Overlays
- **Dialog** — Modal dialogs with header, body, and footer zones
- **AlertDialog** — Destructive action confirmation with cancel/action
- **Sheet** — Side-panel overlay (this panel!)

### Visualization
- **CodeEditor** — Monaco-based code editor with syntax highlighting
- **Charts** — Bar, line, area, pie/donut charts (via Recharts)

---

## Design Tokens

All colors use CSS custom properties defined in the toolkit's \`index.css\`. Dark mode is activated by adding the \`dark\` class to \`<html>\` — no extra config needed.

\`\`\`css
/* Light and dark tokens are auto-loaded */
@import "@tetrascience-npm/tetrascience-react-ui/dist/index.css";
\`\`\`

Key token namespaces:
- \`--background\`, \`--foreground\` — page surface
- \`--card\`, \`--card-foreground\` — card surface
- \`--primary\`, \`--primary-foreground\` — brand actions
- \`--muted\`, \`--muted-foreground\` — subdued content
- \`--sidebar\`, \`--sidebar-border\` — sidebar chrome
- \`--destructive\` — danger actions

---

## Getting Started

\`\`\`bash
npm install @tetrascience-npm/tetrascience-react-ui
\`\`\`

Wrap your app root:

\`\`\`tsx
import { TooltipProvider } from "@tetrascience-npm/tetrascience-react-ui";

<TooltipProvider>
  <App />
</TooltipProvider>
\`\`\`

---

## Resources

- [GitHub — ts-lib-ui-kit](https://github.com/tetrascience/ts-lib-ui-kit)
- [Storybook](https://ts-lib-ui-kit-storybook-nwitlg40m-tetra-science.vercel.app)
- [DataAppShell PR #71](https://github.com/tetrascience/ts-lib-ui-kit/pull/71)
`;

interface HelpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpSheet({ open, onOpenChange }: HelpSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        className="w-[460px] sm:w-[520px] sm:max-w-[520px] flex flex-col p-0"
      >
        <SheetHeader className="flex flex-row items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
          <SheetTitle className="text-sm">Help & Documentation</SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="w-7 h-7 shrink-0 text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground [&_h1]:text-xl [&_h1]:font-bold [&_h1]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:mt-5 [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-1.5 [&_p]:text-sm [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_ul]:text-sm [&_ul]:space-y-0.5 [&_li]:text-muted-foreground [&_hr]:border-border [&_hr]:my-4 [&_strong]:text-foreground [&_code]:text-xs [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_pre]:bg-muted [&_pre]:rounded-md [&_pre]:p-3 [&_pre]:overflow-x-auto [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_a]:text-primary [&_a]:underline">
            <ReactMarkdown>{HELP_MARKDOWN}</ReactMarkdown>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
