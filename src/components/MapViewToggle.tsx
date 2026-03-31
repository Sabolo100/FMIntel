"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import type { BuildingWithOwner } from "@/lib/db/buildings";

// Leaflet must be loaded client-side only
const BuildingMap = dynamic(() => import("./BuildingMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 540,
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: "3px solid #0284c7",
          borderTopColor: "transparent",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span style={{ color: "#94a3b8", fontSize: 13, fontFamily: "monospace" }}>
        Térkép betöltése…
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

interface MapViewToggleProps {
  isMapView: boolean;
}

// Toggle button — uses URL param ?view=map
export default function MapViewToggle({ isMapView }: MapViewToggleProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggle() {
    const params = new URLSearchParams(searchParams.toString());
    if (isMapView) {
      params.delete("view");
    } else {
      params.set("view", "map");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <button
      onClick={toggle}
      className="flex-shrink-0 inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-xl text-sm transition-all"
      style={
        isMapView
          ? {
              background: "#0284c7",
              color: "#ffffff",
              border: "1px solid #0284c7",
            }
          : {
              background: "rgba(2,132,199,0.06)",
              color: "#0284c7",
              border: "1px solid rgba(2,132,199,0.25)",
            }
      }
    >
      {/* Map pin icon */}
      <svg
        className="w-4 h-4 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
        />
      </svg>
      {isMapView ? "Lista nézet" : "Térkép nézet"}
    </button>
  );
}

// Static sub-component that renders the map (server-side wrapper)
MapViewToggle.Map = function MapSection({
  buildings,
}: {
  buildings: BuildingWithOwner[];
}) {
  return (
    <div className="w-full">
      <BuildingMap buildings={buildings} />
    </div>
  );
};
