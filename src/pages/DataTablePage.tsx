import { type ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DataTable,
  DataTableColumnToggle,
  DataTablePagination,
  TableToolbar,
} from "@tetrascience-npm/tetrascience-react-ui";
import { Download } from "lucide-react";

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

const statusConfig: Record<Sample["status"], { variant: "default" | "secondary" | "outline" | "destructive"; label: string }> = {
  active: { variant: "default", label: "Active" },
  pending: { variant: "secondary", label: "Pending" },
  failed: { variant: "destructive", label: "Failed" },
  complete: { variant: "outline", label: "Complete" },
};

const columns: ColumnDef<Sample>[] = [
  {
    accessorKey: "id",
    header: "Sample ID",
    size: 100,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const value = getValue<Sample["status"]>();
      const cfg = statusConfig[value];
      return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
    },
  },
  {
    accessorKey: "concentration",
    header: "Conc. (mg/mL)",
    cell: ({ getValue }) => getValue<number>().toFixed(1),
  },
  {
    accessorKey: "volume",
    header: "Volume (µL)",
    cell: ({ getValue }) => getValue<number>().toLocaleString(),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
];

const stats = [
  { label: "Total", value: samples.length, color: "" },
  { label: "Active", value: samples.filter((s) => s.status === "active").length, color: "text-blue-600" },
  { label: "Complete", value: samples.filter((s) => s.status === "complete").length, color: "text-emerald-600" },
  { label: "Failed", value: samples.filter((s) => s.status === "failed").length, color: "text-red-500" },
];

export function DataTablePage() {
  return (
    <div className="p-8 space-y-6 max-w-6xl">
      <div>
        <h1 className="text-2xl font-semibold mb-1">Data Table</h1>
        <p className="text-muted-foreground text-sm">
          Full-featured table with sorting, column visibility, and pagination.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-4 pb-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sample Registry</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={samples}
            enableSorting
            enableColumnVisibility
            enablePagination
            defaultPageSize={8}
          >
            <TableToolbar className="px-4 pt-3 pb-2">
              <div className="flex items-center gap-2 ml-auto">
                <DataTableColumnToggle />
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
            </TableToolbar>
            <DataTablePagination />
          </DataTable>
        </CardContent>
      </Card>
    </div>
  );
}
