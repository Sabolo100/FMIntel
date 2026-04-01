"use client";

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

interface BuildingMapWrapperProps {
  buildings: BuildingWithOwner[];
}

export default function BuildingMapWrapper({ buildings }: BuildingMapWrapperProps) {
  return (
    <div className="w-full">
      <BuildingMap buildings={buildings} />
    </div>
  );
}
