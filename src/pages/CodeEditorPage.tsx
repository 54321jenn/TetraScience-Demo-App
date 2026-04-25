import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CodeEditor,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@tetrascience-npm/tetrascience-react-ui";
import { ClipboardCheck, Clipboard } from "lucide-react";

const pythonDefault = `import pandas as pd
import numpy as np
from scipy import stats

def analyze_sample(data: list[float]) -> dict:
    """Analyze a sample and return statistical summary."""
    arr = np.array(data)
    return {
        "mean": np.mean(arr),
        "std": np.std(arr),
        "median": np.median(arr),
        "n": len(arr),
        "cv": np.std(arr) / np.mean(arr) * 100,
    }

# Example usage
samples = [2.1, 2.4, 1.9, 2.3, 2.0, 2.5, 2.2, 1.8, 2.6, 2.3]
result = analyze_sample(samples)
print(f"Mean ± SD: {result['mean']:.2f} ± {result['std']:.2f}")
print(f"CV: {result['cv']:.1f}%")
`;

const sqlDefault = `SELECT
    s.sample_id,
    s.sample_name,
    s.sample_type,
    AVG(m.concentration) AS avg_concentration,
    STDDEV(m.concentration) AS std_concentration,
    COUNT(m.measurement_id) AS n_measurements
FROM samples s
JOIN measurements m ON s.sample_id = m.sample_id
WHERE
    s.experiment_id = 'EXP-2024-001'
    AND m.measured_at >= '2024-01-01'
GROUP BY s.sample_id, s.sample_name, s.sample_type
HAVING COUNT(m.measurement_id) >= 3
ORDER BY avg_concentration DESC;
`;

const jsonDefault = `{
  "experiment": {
    "id": "EXP-2024-001",
    "name": "Cytotoxicity Assay Panel",
    "protocol": "IC50-v2",
    "compounds": [
      {
        "id": "CPD-001",
        "name": "Compound A",
        "concentrations": [0.01, 0.1, 1, 10, 100],
        "units": "µM"
      }
    ],
    "readout": "fluorescence",
    "replicates": 3
  }
}`;

const tsDefault = `interface SampleResult {
  sampleId: string;
  concentration: number;
  unit: "µM" | "nM" | "mg/mL";
  timestamp: Date;
}

async function fetchResults(
  experimentId: string
): Promise<SampleResult[]> {
  const response = await fetch(\`/api/experiments/\${experimentId}/results\`);
  if (!response.ok) throw new Error("Failed to fetch results");
  return response.json();
}`;

const defaultCode: Record<string, string> = {
  python: pythonDefault,
  sql: sqlDefault,
  json: jsonDefault,
  typescript: tsDefault,
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? (
        <>
          <ClipboardCheck className="w-4 h-4 mr-1 text-emerald-600" />
          Copied!
        </>
      ) : (
        <>
          <Clipboard className="w-4 h-4 mr-1" />
          Copy
        </>
      )}
    </Button>
  );
}

export function CodeEditorPage() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(pythonDefault);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(defaultCode[value] ?? "");
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Code Editor</h1>
        <p className="text-muted-foreground text-sm">
          Monaco-based code editor with syntax highlighting for multiple languages.
        </p>
      </div>

      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="readonly">Read-only</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="mt-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-40">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="sql">SQL</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CopyButton code={code} />
          </div>

          <Card>
            <CardContent className="p-0">
              <CodeEditor
                value={code}
                onChange={(val) => setCode(val ?? "")}
                language={language}
                height={420}
                onCopy={(c) => navigator.clipboard.writeText(c).catch(() => {})}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="readonly" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Python Analysis Script</CardTitle>
              <CardDescription>
                A read-only view of a sample analysis script.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CodeEditor
                value={pythonDefault}
                onChange={() => {}}
                language="python"
                height={300}
                disabled
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SQL Query</CardTitle>
              <CardDescription>
                A read-only SQL query for sample data retrieval.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <CodeEditor
                value={sqlDefault}
                onChange={() => {}}
                language="sql"
                height={260}
                disabled
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
