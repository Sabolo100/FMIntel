import Link from "next/link";
import React from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  href?: string;
}

export default function StatCard({ label, value, icon, href }: StatCardProps) {
  const content = (
    <div
      className={`bg-white rounded-xl border border-brand-100 p-5 flex items-center gap-4 ${
        href
          ? "hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200 group cursor-pointer"
          : ""
      }`}
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-accent-50 group-hover:text-accent-600 transition-colors">
        {icon}
      </div>

      {/* Value & Label */}
      <div className="min-w-0">
        <p className="text-2xl font-bold text-brand-900 leading-none">
          {typeof value === "number" ? value.toLocaleString("hu-HU") : value}
        </p>
        <p className="text-sm text-brand-500 mt-1 truncate">{label}</p>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
