"use client";

/**
 * Research Tips Page - FRAMEWORK (generic, reusable)
 * Admin can add URLs, company names, keywords as research hints.
 */
import { useEffect, useState } from "react";

interface ResearchTip {
  id: string;
  type: "url" | "company_name" | "keyword" | "person_name";
  value: string;
  note: string;
  status: "pending" | "processed" | "failed";
  created_at: string;
}

const TYPE_OPTIONS = [
  { value: "url", label: "Weboldal URL" },
  { value: "company_name", label: "Cégnév" },
  { value: "person_name", label: "Személy neve" },
  { value: "keyword", label: "Kulcsszó / téma" },
];

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 border-amber-200",
  processed: "bg-green-100 text-green-700 border-green-200",
  failed: "bg-red-100 text-red-700 border-red-200",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Várakozik",
  processed: "Feldolgozva",
  failed: "Sikertelen",
};

export default function TipsPage() {
  const [tips, setTips] = useState<ResearchTip[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newType, setNewType] = useState<string>("url");
  const [newValue, setNewValue] = useState("");
  const [newNote, setNewNote] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/tips");
      const data = await res.json();
      setTips(data.tips || []);
    } catch {
      setTips([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTips();
  }, []);

  const showMsg = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue.trim()) return;

    const res = await fetch("/api/admin/tips", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: newType, value: newValue, note: newNote }),
    });

    if (res.ok) {
      showMsg("success", "Tipp hozzáadva");
      setNewValue("");
      setNewNote("");
      setShowForm(false);
      fetchTips();
    } else {
      showMsg("error", "Hiba");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Biztosan törlöd?")) return;
    const res = await fetch("/api/admin/tips", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showMsg("success", "Törölve");
      fetchTips();
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    await fetch("/api/admin/tips", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchTips();
  };

  const pendingCount = tips.filter((t) => t.status === "pending").length;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Research tippek
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            URL-ek, cégnevek, kulcsszavak megadása a kutatáshoz ({pendingCount} várakozik)
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2.5 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Új tipp
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <h3 className="text-sm font-bold text-slate-900 mb-4">
            Új research tipp hozzáadása
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Típus
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Érték
                </label>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder={
                    newType === "url"
                      ? "https://..."
                      : newType === "company_name"
                      ? "pl. WING Zrt"
                      : newType === "person_name"
                      ? "pl. Kiss Péter"
                      : "pl. ESG tanúsítás"
                  }
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Megjegyzés (opcionális)
              </label>
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="pl. Fontos új szereplő a piacon"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 outline-none"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Hozzáadás
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
              >
                Mégse
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tips list */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Betöltés...</div>
        ) : tips.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <p className="mb-2">Még nincsenek tippek</p>
            <p className="text-sm">
              Adj hozzá URL-eket, cégneveket vagy kulcsszavakat, amiket a kutatás
              figyelembe vesz.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {tips.map((tip) => (
              <div
                key={tip.id}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-500 uppercase">
                      {TYPE_OPTIONS.find((o) => o.value === tip.type)?.label || tip.type}
                    </span>
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                        STATUS_COLORS[tip.status]
                      }`}
                    >
                      {STATUS_LABELS[tip.status] || tip.status}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {tip.value}
                  </p>
                  {tip.note && (
                    <p className="text-xs text-slate-500 mt-0.5">{tip.note}</p>
                  )}
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(tip.created_at).toLocaleDateString("hu-HU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {tip.status === "pending" && (
                    <button
                      onClick={() => handleStatusChange(tip.id, "processed")}
                      className="px-2.5 py-1.5 text-xs font-medium text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Megjelölés feldolgozottként"
                    >
                      Kész
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(tip.id)}
                    className="px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    Törlés
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
