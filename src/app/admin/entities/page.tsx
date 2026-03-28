"use client";

/**
 * Entity Management Page - FRAMEWORK UI (generic) + WEBAPP config (specific)
 * Table selector, list, edit, delete, merge — all driven by config.ts
 */
import { Suspense, useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAvailableTables, getTableConfig, type TableConfig, type ColumnDef } from "./config";

interface EntityRow {
  id: string;
  [key: string]: unknown;
}

export default function EntitiesPageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-400">Betöltés...</div>}>
      <EntitiesPage />
    </Suspense>
  );
}

function EntitiesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tables = getAvailableTables();
  const selectedTable = searchParams.get("table") || tables[0]?.value || "companies";
  const config = getTableConfig(selectedTable);

  const [rows, setRows] = useState<EntityRow[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingRow, setEditingRow] = useState<EntityRow | null>(null);
  const [mergeMode, setMergeMode] = useState(false);
  const [mergeSelection, setMergeSelection] = useState<string[]>([]);
  const [actionMessage, setActionMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const pageSize = 30;

  const fetchData = useCallback(async () => {
    if (!config) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({
        table: selectedTable,
        page: String(page),
        pageSize: String(pageSize),
        orderBy: config.nameField,
        orderDir: "asc",
      });
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/entities?${params}`);
      const json = await res.json();
      if (res.ok) {
        setRows(json.data);
        setCount(json.count);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }, [selectedTable, page, search, config]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setPage(1);
    setSearch("");
    setEditingRow(null);
    setMergeMode(false);
    setMergeSelection([]);
  }, [selectedTable]);

  const showMessage = (type: "success" | "error", text: string) => {
    setActionMessage({ type, text });
    setTimeout(() => setActionMessage(null), 3000);
  };

  // -- Delete --
  const handleDelete = async (id: string) => {
    if (!confirm(`Biztosan törlöd? (ID: ${id})`)) return;
    const res = await fetch("/api/admin/entities", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: selectedTable, id }),
    });
    if (res.ok) {
      showMessage("success", "Sikeresen törölve");
      fetchData();
    } else {
      const data = await res.json();
      showMessage("error", data.error || "Hiba törléskor");
    }
  };

  // -- Save edit --
  const handleSave = async () => {
    if (!editingRow || !config) return;
    const updates: Record<string, unknown> = {};
    for (const col of config.columns) {
      if (col.showInEdit && col.type !== "readonly") {
        updates[col.key] = editingRow[col.key];
      }
    }
    const res = await fetch("/api/admin/entities", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: selectedTable, id: editingRow.id, updates }),
    });
    if (res.ok) {
      showMessage("success", "Sikeresen mentve");
      setEditingRow(null);
      fetchData();
    } else {
      const data = await res.json();
      showMessage("error", data.error || "Hiba mentéskor");
    }
  };

  // -- Merge --
  const toggleMergeSelect = (id: string) => {
    setMergeSelection((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id]; // max 2
      return [...prev, id];
    });
  };

  const handleMerge = async () => {
    if (mergeSelection.length !== 2) return;
    const [primaryId, secondaryId] = mergeSelection;
    if (!confirm(`Összevonás: ${primaryId} (marad) ← ${secondaryId} (törlődik). Biztos?`)) return;

    const res = await fetch("/api/admin/entities/merge", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ table: selectedTable, primaryId, secondaryId }),
    });
    if (res.ok) {
      showMessage("success", "Sikeresen összevonva");
      setMergeMode(false);
      setMergeSelection([]);
      fetchData();
    } else {
      const data = await res.json();
      showMessage("error", data.errors?.join(", ") || data.error || "Hiba");
    }
  };

  if (!config) {
    return <p className="text-slate-500">Ismeretlen tábla</p>;
  }

  const listColumns = config.columns.filter((c) => c.showInList);
  const editColumns = config.columns.filter((c) => c.showInEdit);
  const totalPages = Math.ceil(count / pageSize);

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Entitások kezelése
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {count} {config.label.toLowerCase()} az adatbázisban
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMergeMode(!mergeMode);
              setMergeSelection([]);
            }}
            className={`px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
              mergeMode
                ? "bg-amber-100 text-amber-800 border-amber-300"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {mergeMode ? "Összevonás mód aktív" : "Összevonás"}
          </button>
        </div>
      </div>

      {/* Action message */}
      {actionMessage && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            actionMessage.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {actionMessage.text}
        </div>
      )}

      {/* Table selector + search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex bg-white rounded-lg border border-slate-200 overflow-hidden">
          {tables.map((t) => (
            <button
              key={t.value}
              onClick={() => router.push(`/admin/entities?table=${t.value}`)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedTable === t.value
                  ? "bg-slate-900 text-white"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={`Keresés ${config.label.toLowerCase()} névben...`}
            className="w-full max-w-sm px-3.5 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Merge bar */}
      {mergeMode && (
        <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
          <div className="text-sm text-amber-800">
            <strong>Összevonás:</strong> Válassz ki 2 entitást.
            Az első marad meg (elsődleges), a második törlődik, és minden hivatkozás átíródik.
            {mergeSelection.length > 0 && (
              <span className="ml-2">
                Kiválasztva: {mergeSelection.length}/2
              </span>
            )}
          </div>
          <div className="flex gap-2">
            {mergeSelection.length === 2 && (
              <button
                onClick={handleMerge}
                className="px-4 py-2 text-sm font-medium bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              >
                Összevonás végrehajtása
              </button>
            )}
            <button
              onClick={() => {
                setMergeMode(false);
                setMergeSelection([]);
              }}
              className="px-3 py-2 text-sm text-amber-700 hover:text-amber-900"
            >
              Mégse
            </button>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                Szerkesztés: {String(editingRow[config.nameField] || editingRow.id)}
              </h3>
              <button
                onClick={() => setEditingRow(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {editColumns.map((col) => (
                <FieldEditor
                  key={col.key}
                  column={col}
                  value={editingRow[col.key]}
                  onChange={(v) =>
                    setEditingRow({ ...editingRow, [col.key]: v })
                  }
                />
              ))}
            </div>
            <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setEditingRow(null)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                Mégse
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Mentés
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {mergeMode && <th className="px-3 py-3 text-left w-10"></th>}
                {listColumns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.width || ""}`}
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider w-32">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={listColumns.length + (mergeMode ? 2 : 1)}
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    Betöltés...
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={listColumns.length + (mergeMode ? 2 : 1)}
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    Nincs adat
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`hover:bg-slate-50 transition-colors ${
                      mergeSelection.includes(row.id) ? "bg-amber-50" : ""
                    }`}
                  >
                    {mergeMode && (
                      <td className="px-3 py-3">
                        <input
                          type="checkbox"
                          checked={mergeSelection.includes(row.id)}
                          onChange={() => toggleMergeSelect(row.id)}
                          className="w-4 h-4 rounded border-slate-300"
                        />
                      </td>
                    )}
                    {listColumns.map((col) => (
                      <td key={col.key} className={`px-4 py-3 text-slate-700 ${col.width || ""}`}>
                        <CellRenderer column={col} value={row[col.key]} />
                      </td>
                    ))}
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setEditingRow({ ...row })}
                          className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
                        >
                          Szerkesztés
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="px-2.5 py-1.5 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        >
                          Törlés
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 py-3 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-500">
              {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, count)} / {count}
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                Előző
              </button>
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40"
              >
                Következő
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// -- Cell Renderer --
function CellRenderer({ column, value }: { column: ColumnDef; value: unknown }) {
  if (value === null || value === undefined) {
    return <span className="text-slate-300">—</span>;
  }

  if (column.type === "boolean") {
    return (
      <span
        className={`inline-flex text-xs font-medium px-2 py-0.5 rounded-full ${
          value ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
        }`}
      >
        {value ? "Igen" : "Nem"}
      </span>
    );
  }

  if (column.type === "select" && column.options) {
    const opt = column.options.find((o) => o.value === String(value));
    return <span>{opt?.label || String(value)}</span>;
  }

  if (column.type === "array" && Array.isArray(value)) {
    return (
      <div className="flex flex-wrap gap-1">
        {value.map((v, i) => (
          <span
            key={i}
            className="inline-flex text-xs font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700"
          >
            {String(v)}
          </span>
        ))}
      </div>
    );
  }

  if (column.type === "number" && column.key === "confidence") {
    const n = Number(value);
    return <span>{(n * 100).toFixed(0)}%</span>;
  }

  const str = String(value);
  return <span className="truncate max-w-xs block">{str.length > 60 ? str.slice(0, 60) + "..." : str}</span>;
}

// -- Field Editor --
function FieldEditor({
  column,
  value,
  onChange,
}: {
  column: ColumnDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  const label = (
    <label className="block text-sm font-medium text-slate-700 mb-1">
      {column.label}
    </label>
  );

  if (column.type === "select" && column.options) {
    return (
      <div>
        {label}
        <select
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none"
        >
          <option value="">—</option>
          {column.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (column.type === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300"
        />
        <span className="text-sm text-slate-700">{column.label}</span>
      </div>
    );
  }

  if (column.type === "number") {
    return (
      <div>
        {label}
        <input
          type="number"
          step={column.key === "confidence" ? "0.01" : "1"}
          value={value !== null && value !== undefined ? String(value) : ""}
          onChange={(e) => {
            const v = e.target.value;
            onChange(v === "" ? null : Number(v));
          }}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none"
        />
      </div>
    );
  }

  if (column.type === "array") {
    const arr = Array.isArray(value) ? value : [];
    return (
      <div>
        {label}
        <input
          type="text"
          value={arr.join(", ")}
          onChange={(e) =>
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder="vesszővel elválasztva"
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none"
        />
      </div>
    );
  }

  // Default: text
  const isLong = column.key === "description" || column.key === "bio";
  return (
    <div>
      {label}
      {isLong ? (
        <textarea
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value || null)}
          rows={4}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none resize-y"
        />
      ) : (
        <input
          type="text"
          value={String(value || "")}
          onChange={(e) => onChange(e.target.value || null)}
          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:ring-2 focus:ring-slate-900 outline-none"
        />
      )}
    </div>
  );
}
