/**
 * Admin Entity Merge API - FRAMEWORK (generic, reusable)
 * Merges two entities: keeps primary, deletes secondary,
 * updates all foreign key references.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, key);
}

// Foreign key references to update when merging
// Map: table -> { referencing_table: referencing_column }[]
const FK_REFERENCES: Record<string, { table: string; column: string }[]> = {
  companies: [
    { table: "building_management", column: "company_id" },
    { table: "jobs", column: "company_id" },
    { table: "people", column: "current_company_id" },
    { table: "company_relations", column: "parent_company_id" },
    { table: "company_relations", column: "child_company_id" },
    { table: "buildings", column: "owner_company_id" },
    { table: "buildings", column: "developer_company_id" },
  ],
  buildings: [
    { table: "building_management", column: "building_id" },
  ],
  people: [
    { table: "jobs", column: "person_id" },
  ],
};

// POST /api/admin/entities/merge { table, primaryId, secondaryId, mergedFields }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { table, primaryId, secondaryId, mergedFields } = body;

    if (!table || !primaryId || !secondaryId) {
      return NextResponse.json(
        { error: "Missing table, primaryId, or secondaryId" },
        { status: 400 }
      );
    }

    if (primaryId === secondaryId) {
      return NextResponse.json(
        { error: "Cannot merge entity with itself" },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();
    const errors: string[] = [];

    // 1. Update primary entity with merged fields (if provided)
    if (mergedFields && Object.keys(mergedFields).length > 0) {
      const { error } = await supabase
        .from(table)
        .update({ ...mergedFields, updated_at: new Date().toISOString() })
        .eq("id", primaryId);
      if (error) errors.push(`Update primary: ${error.message}`);
    }

    // 2. Update all foreign key references from secondary -> primary
    const refs = FK_REFERENCES[table] || [];
    for (const ref of refs) {
      const { error } = await supabase
        .from(ref.table)
        .update({ [ref.column]: primaryId })
        .eq(ref.column, secondaryId);
      if (error) {
        errors.push(`FK update ${ref.table}.${ref.column}: ${error.message}`);
      }
    }

    // 3. Delete secondary entity
    const { error: deleteError } = await supabase
      .from(table)
      .delete()
      .eq("id", secondaryId);
    if (deleteError) errors.push(`Delete secondary: ${deleteError.message}`);

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 207 } // Multi-status
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
