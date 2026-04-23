import {
  Table,
  Badge,
  Button,
  Card,
  type TableColumn,
} from "@tetrascience-npm/tetrascience-react-ui";
import { useState } from "react";

interface Sample {
  id: string;
  name: string;
  type: string;
  status: "active" | "pending" | "failed" | "complete";
  concentration: number;
  volume: number;
  createdAt: string;
}

const samples: Sample[] = [
  { id: "S-001", name: "Blood Sample A", type: "Serum", status: "complete", concentration: 2.4, volume: 500, createdAt: "2024-01-15" },
  { id: "S-002", name: "Plasma Extract B", type: "Plasma", status: "active", concentration: 1.8, volume: 250, createdAt: "2024-01-16" },
  { id: "S-003", name: "Urine Sample C", type: "Urine", status: "pending", concentration: 0.9, volume: 1000, createdAt: "2024-01-17" },
  { id: "S-004", name: "Tissue Biopsy D", type: "Tissue", status: "failed", concentration: 3.2, volume: 100, createdAt: "2024-01-18" },
  { id: "S-005", name: "CSF Sample E", type: "CSF", status: "complete", concentration: 0.5, volume: 200, createdAt: "2024-01-19" },
  { id: "S-006", name: "Saliva Sample F", type: "Saliva", status: "active", concentration: 1.1, volume: 750, createdAt: "2024-01-20" },
  { id: "S-007", name: "Sweat Sample G", type: "Sweat", status: "pending", concentration: 0.3, volume: 300, createdAt: "2024-01-21" },
  { id: "S-008", name: "Synovial Fluid H", type: "Synovial", status: "complete", concentration: 2.9, volume: 150, createdAt: "2024-01-22" },
  { id: "S-009", name: "Peritoneal I", type: "Peritoneal", status: "active", concentration: 1.5, volume: 400, createdAt: "2024-01-23" },
  { id: "S-010", name: "Bone Marrow J", type: "Marrow", status: "failed", concentration: 4.1, volume: 50, createdAt: "2024-01-24" },
  { id: "S-011", name: "Lymph Fluid K", type: "Lymph", status: "complete", concentration: 0.8, volume: 600, createdAt: "2024-01-25" },
  { id: "S-012", name: "Pleural Fluid L", type: "Pleural", status: "pending", concentration: 1.3, volume: 350, createdAt: "2024-01-26" },
];

const statusBadge: Record<Sample["status"], { variant: "default" | "primary"; label: string }> = {
  active: { variant: "primary", label: "Active" },
  pending: { variant: "default", label: "Pending" },
  failed: { variant: "default", label: "Failed" },
  complete: { variant: "primary", label: "Complete" },
};

const columns: TableColumn<Sample>[] = [
  { key: "id", header: "Sample ID", sortable: true, width: "100px" },
  { key: "name", header: "Name", sortable: true },
  {
    key: "type",
    header: "Type",
    sortable: true,
    filterable: true,
    filterOptions: [
      { label: "Serum", value: "Serum" },
      { label: "Plasma", value: "Plasma" },
      { label: "Urine", value: "Urine" },
      { label: "Tissue", value: "Tissue" },
      { label: "CSF", value: "CSF" },
    ],
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    render: (value: Sample["status"]) => (
      <Badge variant={statusBadge[value].variant} size="small">
        {statusBadge[value].label}
      </Badge>
    ),
  },
  {
    key: "concentration",
    header: "Conc. (mg/mL)",
    sortable: true,
    align: "right",
    render: (value: number) => value.toFixed(1),
  },
  {
    key: "volume",
    header: "Volume (µL)",
    sortable: true,
    align: "right",
    render: (value: number) => value.toLocaleString(),
  },
  { key: "createdAt", header: "Created", sortable: true },
];

export function DataTablePage() {
  const [selected, setSelected] = useState<Sample[]>([]);

  return (
    <div className="p-8 space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Data Table</h1>
        <p className="text-muted-foreground text-sm">
          Full-featured table with sorting, filtering, pagination, and row selection.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {selected.length > 0 && (
            <>
              <Badge variant="primary">{selected.length} selected</Badge>
              <Button variant="secondary" size="small" onClick={() => setSelected([])}>
                Clear selection
              </Button>
              <Button variant="tertiary" size="small">
                Export selected
              </Button>
            </>
          )}
        </div>
        <Button variant="primary" size="small">
          + Add Sample
        </Button>
      </div>

      <Card variant="outlined">
        <Table
          columns={columns}
          data={samples}
          pageSize={8}
          rowKey="id"
          selectable
          onRowSelect={setSelected}
          selectedRows={selected}
        />
      </Card>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Samples" size="small" variant="default">
          <p className="text-2xl font-bold">{samples.length}</p>
        </Card>
        <Card title="Active" size="small" variant="default">
          <p className="text-2xl font-bold text-blue-600">
            {samples.filter((s) => s.status === "active").length}
          </p>
        </Card>
        <Card title="Complete" size="small" variant="default">
          <p className="text-2xl font-bold text-green-600">
            {samples.filter((s) => s.status === "complete").length}
          </p>
        </Card>
        <Card title="Failed" size="small" variant="default">
          <p className="text-2xl font-bold text-red-600">
            {samples.filter((s) => s.status === "failed").length}
          </p>
        </Card>
      </div>
    </div>
  );
}
