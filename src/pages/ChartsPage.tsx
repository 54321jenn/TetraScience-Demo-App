import {
  BarGraph,
  AreaGraph,
  LineGraph,
  ScatterGraph,
  PieChart,
  Histogram,
  TabGroup,
  Card,
  COLORS,
} from "@tetrascience-npm/tetrascience-react-ui";
import { useState } from "react";

const wavelengths = [200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800];
const timePoints = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 60];

export function ChartsPage() {
  const [activeChart, setActiveChart] = useState("bar");

  const barData = [
    { name: "Compound A", color: COLORS.BLUE, x: wavelengths, y: [180, 220, 310, 450, 380, 290, 240, 200, 170, 145, 120, 100, 85] },
    { name: "Compound B", color: COLORS.ORANGE, x: wavelengths, y: [95, 140, 200, 280, 350, 320, 270, 220, 185, 150, 125, 105, 90] },
    { name: "Compound C", color: COLORS.GREEN, x: wavelengths, y: [60, 90, 130, 200, 290, 380, 340, 280, 230, 190, 155, 130, 110] },
  ];

  const areaData = [
    { name: "Trial 1", color: COLORS.BLUE, x: timePoints, y: [0.2, 1.4, 3.8, 6.2, 7.9, 8.5, 8.1, 7.2, 6.0, 4.8, 2.1] },
    { name: "Trial 2", color: COLORS.GREEN, x: timePoints, y: [0.1, 1.1, 3.2, 5.8, 7.5, 8.8, 8.6, 7.8, 6.5, 5.2, 2.8] },
  ];

  const lineData = [
    { name: "Control", color: COLORS.BLUE, x: timePoints, y: [100, 98, 95, 91, 86, 80, 73, 65, 58, 50, 30] },
    { name: "Treatment A", color: COLORS.ORANGE, x: timePoints, y: [100, 96, 89, 79, 68, 57, 47, 38, 30, 24, 12] },
    { name: "Treatment B", color: COLORS.RED, x: timePoints, y: [100, 94, 84, 71, 57, 44, 33, 24, 17, 12, 5] },
  ];

  const seed = 42;
  const lcg = (n: number) => (1664525 * n + 1013904223) % 2 ** 32;
  const rng = (i: number) => lcg(seed + i) / 2 ** 32;

  const scatterData = [
    {
      name: "Group A",
      color: COLORS.BLUE,
      x: Array.from({ length: 40 }, (_, i) => rng(i) * 6 + 1),
      y: Array.from({ length: 40 }, (_, i) => rng(i + 100) * 4 + 2),
    },
    {
      name: "Group B",
      color: COLORS.ORANGE,
      x: Array.from({ length: 40 }, (_, i) => rng(i + 200) * 5 + 4),
      y: Array.from({ length: 40 }, (_, i) => rng(i + 300) * 6 + 1),
    },
  ];

  const histogramData = {
    x: Array.from({ length: 200 }, (_, i) => {
      const r1 = rng(i) + rng(i + 500) + rng(i + 1000);
      return Math.floor(r1 * 90 + 10);
    }),
    name: "Cell Count Distribution",
    color: COLORS.BLUE,
  };

  const pieData = {
    name: "Protein Composition",
    labels: ["Protein A", "Protein B", "Protein C", "Protein D", "Other"],
    values: [35, 25, 20, 12, 8],
    colors: [COLORS.BLUE, COLORS.ORANGE, COLORS.GREEN, COLORS.RED, COLORS.PURPLE],
  };

  return (
    <div className="p-8 space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Charts & Visualizations</h1>
        <p className="text-muted-foreground text-sm">
          Scientific data visualization powered by Plotly.js.
        </p>
      </div>

      <TabGroup
        tabs={[
          { id: "bar", label: "Bar Graph" },
          { id: "area", label: "Area Graph" },
          { id: "line", label: "Line Graph" },
          { id: "scatter", label: "Scatter" },
          { id: "histogram", label: "Histogram" },
          { id: "pie", label: "Pie Chart" },
        ]}
        activeTab={activeChart}
        onChange={setActiveChart}
      />

      {activeChart === "bar" && (
        <Card title="Absorbance by Wavelength" variant="outlined">
          <p className="text-xs text-muted-foreground mb-4">
            UV-Vis spectrophotometry data for three compounds across the visible spectrum.
          </p>
          <BarGraph
            dataSeries={barData}
            width={800}
            height={400}
            xTitle="Wavelength (nm)"
            yTitle="Absorbance (AU)"
            title="UV-Vis Absorption Spectrum"
            variant="group"
          />
        </Card>
      )}

      {activeChart === "area" && (
        <Card title="Drug Concentration Over Time" variant="outlined">
          <p className="text-xs text-muted-foreground mb-4">
            Pharmacokinetic profiles from two independent trials.
          </p>
          <AreaGraph
            dataSeries={areaData}
            width={800}
            height={400}
            xTitle="Time (min)"
            yTitle="Concentration (µM)"
            title="PK Profile — Trials 1 & 2"
          />
        </Card>
      )}

      {activeChart === "line" && (
        <Card title="Cell Viability Over Time" variant="outlined">
          <p className="text-xs text-muted-foreground mb-4">
            Comparison of control vs. treatment groups in a cytotoxicity assay.
          </p>
          <LineGraph
            dataSeries={lineData}
            width={800}
            height={400}
            xTitle="Time (min)"
            yTitle="Cell Viability (%)"
            title="Cytotoxicity Assay"
          />
        </Card>
      )}

      {activeChart === "scatter" && (
        <Card title="Protein Expression Correlation" variant="outlined">
          <p className="text-xs text-muted-foreground mb-4">
            Scatter plot showing expression levels across two experimental groups.
          </p>
          <ScatterGraph
            dataSeries={scatterData}
            width={800}
            height={400}
            xTitle="Log2 Fold Change"
            yTitle="-Log10 p-value"
            title="Differential Expression"
          />
        </Card>
      )}

      {activeChart === "histogram" && (
        <Card title="Cell Count Distribution" variant="outlined">
          <p className="text-xs text-muted-foreground mb-4">
            Distribution of cell counts per field of view from 200 measurements.
          </p>
          <Histogram
            dataSeries={histogramData}
            width={800}
            height={400}
            xTitle="Cell Count"
            yTitle="Frequency"
            title="Cell Count Distribution"
          />
        </Card>
      )}

      {activeChart === "pie" && (
        <Card title="Protein Composition" variant="outlined">
          <p className="text-xs text-muted-foreground mb-4">
            Relative abundance of proteins in a fractionated sample.
          </p>
          <PieChart
            dataSeries={pieData}
            width={500}
            height={400}
            title="Protein Abundance"
            textInfo="label+percent"
          />
        </Card>
      )}
    </div>
  );
}
