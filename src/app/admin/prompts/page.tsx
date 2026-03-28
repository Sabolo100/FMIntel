"use client";

/**
 * Prompt Editor Page - FRAMEWORK (generic, reusable)
 * Lists all config YAML files and allows editing.
 */
import { useEffect, useState } from "react";

interface PromptFile {
  name: string;
  path: string;
  content: string;
}

const FILE_LABELS: Record<string, { label: string; description: string }> = {
  "prompts/search_prompts.yaml": {
    label: "Keresési promptok",
    description: "Perplexity API keresési utasítások",
  },
  "prompts/extract_prompts.yaml": {
    label: "Kinyerési promptok",
    description: "LLM kinyerési utasítások entitástípusonként",
  },
  "items.yaml": {
    label: "Kutatási témák",
    description: "Keresési témák, ütemezés, max eredmények",
  },
  "policies.yaml": {
    label: "Szabályok",
    description: "Deduplikáció, jóváhagyás, perzisztencia szabályok",
  },
};

export default function PromptsPage() {
  const [files, setFiles] = useState<PromptFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/prompts")
      .then((r) => r.json())
      .then((data) => {
        setFiles(data.files || []);
        if (data.files?.length > 0) {
          setSelectedFile(data.files[0].path);
          setEditContent(data.files[0].content);
          setOriginalContent(data.files[0].content);
        }
      });
  }, []);

  const selectFile = (filePath: string) => {
    const file = files.find((f) => f.path === filePath);
    if (file) {
      setSelectedFile(filePath);
      setEditContent(file.content);
      setOriginalContent(file.content);
      setMessage(null);
    }
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/prompts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: selectedFile, content: editContent }),
      });

      if (res.ok) {
        setOriginalContent(editContent);
        // Update in-memory file list
        setFiles((prev) =>
          prev.map((f) =>
            f.path === selectedFile ? { ...f, content: editContent } : f
          )
        );
        setMessage({ type: "success", text: "Mentve! (backup: .bak)" });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Hiba mentéskor" });
      }
    } catch {
      setMessage({ type: "error", text: "Hálózati hiba" });
    }
    setSaving(false);
  };

  const hasChanges = editContent !== originalContent;
  const info = selectedFile ? FILE_LABELS[selectedFile] : null;

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Prompt szerkesztő
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          AI kutatási és kinyerési promptok szerkesztése
        </p>
      </div>

      <div className="flex gap-4" style={{ height: "calc(100vh - 180px)" }}>
        {/* File list sidebar */}
        <div className="w-64 flex-shrink-0 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Konfigurációs fájlok
            </p>
          </div>
          <div className="divide-y divide-slate-100">
            {files.map((file) => {
              const meta = FILE_LABELS[file.path];
              return (
                <button
                  key={file.path}
                  onClick={() => selectFile(file.path)}
                  className={`w-full text-left px-4 py-3 transition-colors ${
                    selectedFile === file.path
                      ? "bg-slate-900 text-white"
                      : "hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      selectedFile === file.path ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {meta?.label || file.name}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      selectedFile === file.path ? "text-slate-300" : "text-slate-500"
                    }`}
                  >
                    {meta?.description || file.path}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor area */}
        <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Editor header */}
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {info?.label || selectedFile || "—"}
              </p>
              <p className="text-xs text-slate-500">{selectedFile}</p>
            </div>
            <div className="flex items-center gap-3">
              {message && (
                <p
                  className={`text-sm font-medium ${
                    message.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {message.text}
                </p>
              )}
              {hasChanges && (
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                  Módosítva
                </span>
              )}
              <button
                onClick={handleSave}
                disabled={!hasChanges || saving}
                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 disabled:opacity-40 transition-colors"
              >
                {saving ? "Mentés..." : "Mentés"}
              </button>
            </div>
          </div>

          {/* Code editor (textarea) */}
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            spellCheck={false}
            className="flex-1 p-4 font-mono text-sm text-slate-800 bg-slate-50 resize-none outline-none leading-relaxed"
            style={{ tabSize: 2 }}
          />
        </div>
      </div>
    </>
  );
}
