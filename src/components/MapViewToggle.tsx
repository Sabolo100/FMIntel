"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

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
      {isMapView ? (
        /* List icon */
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ) : (
        /* Map icon */
        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
      )}
      {isMapView ? "Lista nézet" : "Térkép nézet"}
    </button>
  );
}
