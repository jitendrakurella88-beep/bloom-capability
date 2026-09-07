import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Download,
  FileText,
  FileType2,
  Loader2,
  Presentation,
  RefreshCw,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import { Protected } from "@/components/layout/Protected";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ErrorState,
  LoadingState,
  Modal,
  PageHeader,
  ProgressBar,
  SectionTitle,
  StatCard,
  Toast,
} from "@/components/ui-kit";
import { useApi } from "@/hooks/useApi";
import { getLearningMaterials } from "@/services/api";
import type { Material } from "@/data/mock";

export const Route = createFileRoute("/learning-materials")({
  head: () => ({
    meta: [
      { title: "Learning Materials — AI LearnHub" },
      {
        name: "description",
        content: "Upload PDF, DOCX, PPTX and TXT learning material and track AI processing status.",
      },
      { property: "og:title", content: "Learning Materials — AI LearnHub" },
      { property: "og:description", content: "Your document library and AI-readiness status." },
    ],
  }),
  component: () => (
    <Protected role="employee" title="Learning Materials">
      <MaterialsPage />
    </Protected>
  ),
});

const typeIcon = { PDF: FileText, DOCX: FileType2, PPTX: Presentation, TXT: FileText } as const;

function StatusBadge({ status }: { status: Material["status"] }) {
  if (status === "Processed")
    return (
      <Badge tone="success">
        <CheckCircle2 className="h-3.5 w-3.5" /> Processed
      </Badge>
    );
  if (status === "Processing")
    return (
      <Badge tone="warning">
        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Processing
      </Badge>
    );
  return (
    <Badge tone="danger">
      <XCircle className="h-3.5 w-3.5" /> Failed
    </Badge>
  );
}

function MaterialsPage() {
  const { data, loading, error, retry } = useApi(getLearningMaterials);
  const [items, setItems] = useState<Material[] | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [toast, setToast] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (data) setItems(data);
  }, [data]);

  // Simulated document-processing pipeline.
  useEffect(() => {
    const t = setInterval(() => {
      setItems((cur) =>
        cur
          ? cur.map((m) =>
              m.status === "Processing"
                ? m.progress >= 100
                  ? { ...m, status: "Processed" as const, chunks: 128 }
                  : { ...m, progress: Math.min(100, m.progress + 7) }
                : m,
            )
          : cur,
      );
    }, 900);
    return () => clearInterval(t);
  }, []);

  if (loading) return <LoadingState rows={2} />;
  if (error || !items) return <ErrorState onRetry={retry} />;

  const addFiles = (names: string[]) => {
    const created: Material[] = names.map((name, i) => ({
      id: `up-${Date.now()}-${i}`,
      name,
      type: (name.split(".").pop()?.toUpperCase() ?? "PDF") as Material["type"],
      size: `${(Math.random() * 8 + 0.4).toFixed(1)} MB`,
      uploadedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      status: "Processing",
      progress: 4,
      chunks: 0,
    }));
    setItems((cur) => [...created, ...(cur ?? [])]);
    setUploadOpen(false);
    setToast(`${names.length} file${names.length > 1 ? "s" : ""} queued for AI processing`);
    setTimeout(() => setToast(""), 2400);
  };

  const processed = items.filter((m) => m.status === "Processed").length;
  const processing = items.filter((m) => m.status === "Processing").length;
  const failed = items.filter((m) => m.status === "Failed").length;

  return (
    <>
      <PageHeader
        title="Learning Materials"
        subtitle="Upload course documents. Each file is parsed and indexed so the AI Tutor and assessments can use it."
        actions={
          <Button icon={Upload} onClick={() => setUploadOpen(true)}>
            Upload Learning Material
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total documents" value={items.length} icon={FileText} />
        <StatCard label="AI-ready" value={processed} icon={CheckCircle2} tone="success" trend="Indexed for retrieval" />
        <StatCard label="Processing" value={processing} icon={Loader2} tone="warning" trend="Parsing & chunking" />
        <StatCard label="Failed" value={failed} icon={XCircle} tone="danger" trend="Retry available" />
      </div>

      <Card className="mt-5">
        <SectionTitle title="Document library" subtitle="Processing status updates automatically" />

        {items.length === 0 ? (
          <EmptyState
            title="No learning material yet"
            description="Upload a PDF, DOCX, PPTX or TXT file to make it available to the AI Tutor."
            icon={Upload}
            action={<Button onClick={() => setUploadOpen(true)}>Upload material</Button>}
          />
        ) : (
          <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs font-bold tracking-wide text-muted-foreground uppercase">
                    <th className="py-2.5 pr-3">File</th>
                    <th className="px-3 py-2.5">Type</th>
                    <th className="px-3 py-2.5">Uploaded</th>
                    <th className="px-3 py-2.5">Size</th>
                    <th className="px-3 py-2.5">Status</th>
                    <th className="py-2.5 pl-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((m) => {
                    const Icon = typeIcon[m.type] ?? FileText;
                    return (
                      <tr key={m.id} className="border-b border-border/70 transition-colors last:border-0 hover:bg-secondary/50">
                        <td className="py-3 pr-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                              <Icon className="h-4 w-4" />
                            </span>
                            <div className="min-w-0">
                              <p className="truncate font-semibold text-foreground">{m.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {m.status === "Processed" ? `${m.chunks} indexed chunks · AI-ready` : "Awaiting index"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-muted-foreground">{m.type}</td>
                        <td className="px-3 py-3 text-muted-foreground">{m.uploadedOn}</td>
                        <td className="px-3 py-3 text-muted-foreground">{m.size}</td>
                        <td className="px-3 py-3">
                          <StatusBadge status={m.status} />
                          {m.status === "Processing" ? (
                            <ProgressBar value={m.progress} size="sm" tone="warning" className="mt-2 w-28" />
                          ) : null}
                        </td>
                        <td className="py-3 pl-3">
                          <div className="flex justify-end gap-1.5">
                            {m.status === "Failed" ? (
                              <Button
                                size="icon"
                                variant="outline"
                                aria-label="Retry processing"
                                onClick={() =>
                                  setItems(
                                    (cur) =>
                                      cur?.map((x) =>
                                        x.id === m.id ? { ...x, status: "Processing" as const, progress: 5 } : x,
                                      ) ?? cur,
                                  )
                                }
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button size="icon" variant="outline" aria-label="Download">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              size="icon"
                              variant="outline"
                              aria-label="Delete"
                              onClick={() => setItems((cur) => cur?.filter((x) => x.id !== m.id) ?? cur)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="grid gap-3 md:hidden">
              {items.map((m) => {
                const Icon = typeIcon[m.type] ?? FileText;
                return (
                  <div key={m.id} className="rounded-xl border border-border p-3.5">
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {m.type} · {m.size} · {m.uploadedOn}
                        </p>
                        <div className="mt-2">
                          <StatusBadge status={m.status} />
                        </div>
                        {m.status === "Processing" ? <ProgressBar value={m.progress} size="sm" tone="warning" className="mt-2" /> : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </Card>

      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload learning material"
        subtitle="PDF, DOCX, PPTX or TXT · up to 25 MB per file"
        footer={
          <>
            <Button variant="outline" onClick={() => setUploadOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => addFiles(["New_Learning_Material.pdf"])}>Upload sample file</Button>
          </>
        }
      >
        <button
          onClick={() => fileRef.current?.click()}
          className="grid w-full place-items-center rounded-xl border-2 border-dashed border-border bg-secondary/40 px-6 py-10 text-center transition-colors hover:border-primary hover:bg-primary-soft/50"
        >
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-card text-primary shadow-sm">
            <Upload className="h-5 w-5" />
          </span>
          <span className="mt-3 text-sm font-bold text-foreground">Click to browse or drop files here</span>
          <span className="mt-1 text-xs text-muted-foreground">Documents are parsed, chunked and indexed for AI retrieval</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.docx,.pptx,.txt"
          className="hidden"
          onChange={(e) => {
            const names = Array.from(e.target.files ?? []).map((f) => f.name);
            if (names.length) addFiles(names);
          }}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {["PDF", "DOCX", "PPTX", "TXT"].map((t) => (
            <Badge key={t} tone="neutral">
              {t}
            </Badge>
          ))}
        </div>
      </Modal>

      <Toast show={!!toast} message={toast} />
    </>
  );
}
