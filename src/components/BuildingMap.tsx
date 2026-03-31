"use client";

import { useEffect, useRef } from "react";
import type { Building } from "@/lib/types";

interface BuildingWithOwner extends Building {
  owner_company_name?: string | null;
}

interface BuildingMapProps {
  buildings: BuildingWithOwner[];
}

const buildingTypeLabel: Record<string, string> = {
  iroda: "Iroda",
  raktar: "Raktár",
  logisztikai: "Logisztikai",
  vegyes: "Vegyes",
};

const buildingTypeColor: Record<string, string> = {
  iroda: "#0284c7",
  raktar: "#d97706",
  logisztikai: "#65a30d",
  vegyes: "#7c3aed",
};

export default function BuildingMap({ buildings }: BuildingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);

  const mappable = buildings.filter(
    (b) => b.latitude && b.longitude
  );

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    if (mappable.length === 0) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default marker icon paths for Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [47.497913, 19.040236], // Budapest
        zoom: 8,
        zoomControl: true,
        attributionControl: true,
      });

      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Fit map to markers
      const bounds: [number, number][] = [];

      mappable.forEach((b) => {
        const lat = b.latitude!;
        const lng = b.longitude!;
        const color = buildingTypeColor[b.building_type] || "#0284c7";
        const typeLabel = buildingTypeLabel[b.building_type] || b.building_type;

        // Custom circular SVG marker
        const svgMarker = L.divIcon({
          className: "",
          html: `
            <div style="
              position: relative;
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
            ">
              <div style="
                background: ${color};
                border: 2.5px solid white;
                border-radius: 50%;
                width: 14px;
                height: 14px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.35);
                transition: transform 0.15s;
              "></div>
              <div style="
                background: white;
                color: #0f172a;
                font-family: system-ui, sans-serif;
                font-size: 10px;
                font-weight: 600;
                padding: 2px 5px;
                border-radius: 4px;
                margin-top: 3px;
                white-space: nowrap;
                max-width: 140px;
                overflow: hidden;
                text-overflow: ellipsis;
                box-shadow: 0 1px 4px rgba(0,0,0,0.18);
                border: 1px solid ${color}33;
              ">${b.name}</div>
            </div>
          `,
          iconAnchor: [7, 7],
          popupAnchor: [0, -14],
        });

        // Popup content
        const ownerHtml = b.owner_company_name
          ? `<div style="margin-top:6px;padding-top:6px;border-top:1px solid #f1f5f9;">
               <span style="font-size:10px;color:#94a3b8;font-family:monospace;text-transform:uppercase;letter-spacing:0.05em;">Tulajdonos</span>
               <div style="font-size:12px;font-weight:600;color:#0284c7;margin-top:1px;">${b.owner_company_name}</div>
             </div>`
          : "";

        const areaHtml = b.total_area_sqm
          ? `<span style="font-size:11px;color:#64748b;">· ${b.total_area_sqm.toLocaleString("hu-HU")} m²</span>`
          : "";

        const popupHtml = `
          <div style="font-family:system-ui,sans-serif;min-width:180px;max-width:240px;">
            <div style="
              display:inline-flex;align-items:center;gap:5px;
              background:${color}12;border:1px solid ${color}33;
              border-radius:999px;padding:2px 8px;margin-bottom:6px;
            ">
              <span style="width:6px;height:6px;border-radius:50%;background:${color};display:inline-block;"></span>
              <span style="font-size:10px;color:${color};font-weight:600;font-family:monospace;">${typeLabel}</span>
            </div>
            <div style="font-size:13px;font-weight:700;color:#0f172a;line-height:1.3;margin-bottom:4px;">${b.name}</div>
            ${b.address
              ? `<div style="font-size:11px;color:#64748b;margin-bottom:2px;">📍 ${b.address}${b.city && !b.address.toLowerCase().includes(b.city.toLowerCase()) ? ", " + b.city : ""}</div>`
              : `<div style="font-size:11px;color:#94a3b8;">${b.city}</div>`
            }
            ${areaHtml}
            ${ownerHtml}
            <div style="margin-top:8px;">
              <a href="/ingatlanok/${b.id}" style="
                font-size:11px;font-weight:600;color:#0284c7;
                text-decoration:none;
              ">Részletek →</a>
            </div>
          </div>
        `;

        const marker = L.marker([lat, lng], { icon: svgMarker })
          .addTo(map)
          .bindPopup(popupHtml, {
            maxWidth: 260,
            className: "fm-popup",
          });

        // Open popup on hover
        marker.on("mouseover", function (this: typeof marker) {
          this.openPopup();
        });

        bounds.push([lat, lng]);
      });

      // Fit to all markers with some padding
      if (bounds.length > 1) {
        map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [40, 40] });
      } else if (bounds.length === 1) {
        map.setView(bounds[0], 14);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mappable.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl"
        style={{ border: "1px solid #e2e8f0" }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        <p className="text-sm mt-3" style={{ color: "#94a3b8" }}>
          Nincs megjeleníthető ingatlan (hiányzó koordináták)
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      {/* Custom popup style */}
      <style>{`
        .fm-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          border: 1px solid #e2e8f0;
          padding: 0;
        }
        .fm-popup .leaflet-popup-content {
          margin: 12px 14px;
        }
        .fm-popup .leaflet-popup-tip {
          background: white;
        }
        .leaflet-popup-close-button {
          top: 6px !important;
          right: 8px !important;
          font-size: 16px !important;
          color: #94a3b8 !important;
        }
      `}</style>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-3 px-1">
        {Object.entries(buildingTypeLabel).map(([key, label]) => (
          <span key={key} className="inline-flex items-center gap-1.5 text-xs font-mono" style={{ color: "#64748b" }}>
            <span className="w-3 h-3 rounded-full border-2 border-white shadow-sm" style={{ background: buildingTypeColor[key] }} />
            {label}
          </span>
        ))}
        <span className="ml-auto text-xs font-mono" style={{ color: "#94a3b8" }}>
          {mappable.length} ingatlan a térképen
        </span>
      </div>

      {/* Map container */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: 540,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        }}
      />
    </>
  );
}
