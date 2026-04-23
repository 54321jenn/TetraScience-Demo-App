import {
  CodeEditor,
  CodeScriptEditorButton,
  SelectField,
  Card,
  Button,
  TabGroup,
} from "@tetrascience-npm/tetrascience-react-ui";
import { useState } from "react";

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
      },
      {
        "id": "CPD-002",
        "name": "Compound B",
        "concentrations": [0.001, 0.01, 0.1, 1, 10],
        "units": "µM"
      }
    ],
    "readout": "fluorescence",
    "replicates": 3
  }
}`;

const languageOptions = [
  { value: "python", label: "Python" },
  { value: "sql", label: "SQL" },
  { value: "json", label: "JSON" },
  { value: "typescript", label: "TypeScript" },
];

const defaultCode: Record<string, string> = {
  python: pythonDefault,
  sql: sqlDefault,
  json: jsonDefault,
  typescript: `interface SampleResult {
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
}`,
};

export function CodeEditorPage() {
  const [activeTab, setActiveTab] = useState("inline");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(pythonDefault);
  const [savedCode, setSavedCode] = useState<string | null>(null);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    setCode(defaultCode[value] ?? "");
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Code Editor</h1>
        <p className="text-muted-foreground text-sm">
          Monaco-based code editor with syntax highlighting and a modal launch variant.
        </p>
      </div>

      <TabGroup
        tabs={[
          { id: "inline", label: "Inline Editor" },
          { id: "modal", label: "Modal Editor" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "inline" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <SelectField
              label="Language"
              options={languageOptions}
              value={language}
              onChange={handleLanguageChange}
            />
          </div>

          <Card variant="outlined">
            <CodeEditor
              value={code}
              onChange={(val) => setCode(val ?? "")}
              language={language}
              height={400}
              label={`${language.toUpperCase()} Editor`}
              onCopy={(c) => navigator.clipboard.writeText(c).catch(() => {})}
            />
          </Card>

          {savedCode && (
            <Card title="Last Saved Snapshot" variant="outlined" size="small">
              <pre className="text-xs font-mono overflow-auto max-h-40 text-muted-foreground whitespace-pre-wrap">
                {savedCode.slice(0, 300)}
                {savedCode.length > 300 && "\n..."}
              </pre>
            </Card>
          )}
        </div>
      )}

      {activeTab === "modal" && (
        <div className="space-y-6">
          <Card title="CodeScriptEditorButton" variant="outlined">
            <p className="text-sm text-muted-foreground mb-4">
              Opens a full-screen modal with a Monaco editor. Useful for script configuration in
              forms or cards without taking up inline space.
            </p>
            <div className="flex flex-wrap gap-3">
              <CodeScriptEditorButton
                initialCode={pythonDefault}
                language="python"
                buttonText="Edit Python Script"
                modalTitle="Python Analysis Script"
                onCodeSave={(saved) => setSavedCode(saved)}
              />
              <CodeScriptEditorButton
                initialCode={sqlDefault}
                language="sql"
                buttonText="Edit SQL Query"
                modalTitle="Data Query"
                onCodeSave={(saved) => setSavedCode(saved)}
              />
              <CodeScriptEditorButton
                initialCode={jsonDefault}
                language="json"
                buttonText="Edit Config"
                modalTitle="Experiment Configuration"
                onCodeSave={(saved) => setSavedCode(saved)}
              />
              <CodeScriptEditorButton
                initialCode="# disabled"
                language="python"
                buttonText="Edit (Disabled)"
                modalTitle="Disabled"
                disabled
              />
            </div>
          </Card>

          {savedCode && (
            <Card title="Last Saved Code" variant="outlined" size="small">
              <pre className="text-xs font-mono overflow-auto max-h-48 text-muted-foreground whitespace-pre-wrap">
                {savedCode.slice(0, 500)}
                {savedCode.length > 500 && "\n..."}
              </pre>
              <Button
                variant="tertiary"
                size="small"
                onClick={() => setSavedCode(null)}
              >
                Clear
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
