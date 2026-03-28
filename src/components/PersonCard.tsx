import Link from "next/link";
import type { Person, Job, Company } from "@/lib/types";

interface PersonCardProps {
  person: Person;
  currentJob?: Job & { company: Company };
}

export default function PersonCard({ person, currentJob }: PersonCardProps) {
  const nameParts = person.name.split(' ');
  const initials = nameParts.length >= 2
    ? `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(0)}`
    : person.name.charAt(0);

  return (
    <Link
      href={`/emberek/${person.id}`}
      className="block bg-white rounded-xl border border-brand-100 p-5 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200 group"
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center">
          {person.photo_url ? (
            <img
              src={person.photo_url}
              alt={person.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <span className="text-sm font-bold text-brand-600">
              {initials}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-brand-900 group-hover:text-accent-600 transition-colors leading-snug">
            {person.name}
          </h3>

          {currentJob && (
            <div className="mt-1.5 space-y-0.5">
              <p className="text-sm font-medium text-brand-700">
                {currentJob.position_title}
              </p>
              <p className="text-sm text-brand-500">
                {currentJob.company.name}
              </p>
            </div>
          )}

          {!currentJob && person.title && (
            <p className="text-sm text-brand-600 mt-1">
              {person.title}
            </p>
          )}

          {/* LinkedIn indicator */}
          {person.linkedin_url && (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1 text-xs text-brand-400">
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
