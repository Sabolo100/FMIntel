/**
 * Admin Entities API - FRAMEWORK (generic, reusable)
 * Generic CRUD for any Supabase table, controlled by query params.
 */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Use service key for admin operations (full access)
function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return createClient(url, key);
}

const ALLOWED_TABLES = ["companies", "buildings", "people", "jobs", "building_management", "changes", "news_mentions"];

function validateTable(table: string | null): string | null {
  if (!table || !ALLOWED_TABLES.includes(table)) return null;
  return table;
}

// GET /api/admin/entities?table=companies&page=1&pageSize=50&search=xyz&orderBy=name
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const table = validateTable(searchParams.get("table"));
  if (!table) {
    return NextResponse.json({ error: "Invalid table" }, { status: 400 });
  }

  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = Math.min(parseInt(searchParams.get("pageSize") || "50"), 200);
  const search = searchParams.get("search") || "";
  const orderBy = searchParams.get("orderBy") || "created_at";
  const orderDir = searchParams.get("orderDir") === "asc" ? true : false;
  const offset = (page - 1) * pageSize;

  const supabase = getAdminSupabase();

  try {
    let query = supabase
      .from(table)
      .select("*", { count: "exact" })
      .order(orderBy, { ascending: orderDir })
      .range(offset, offset + pageSize - 1);

    // Apply search filter on name/title columns
    if (search) {
      const searchFields: Record<string, string> = {
        companies: "name",
        buildings: "name",
        people: "name",
        jobs: "position_title",
        building_management: "id",
        changes: "change_summary",
        news_mentions: "title",
      };
      const field = searchFields[table] || "id";
      if (field !== "id") {
        query = query.ilike(field, `%${search}%`);
      }
    }

    const { data, error, count } = await query;

    if (error) {
      console.error(`Admin entities GET error [${table}]:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      data: data || [],
      count: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

// PUT /api/admin/entities { table, id, updates }
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { table: rawTable, id, updates } = body;
    const table = validateTable(rawTable);
    if (!table || !id || !updates) {
      return NextResponse.json({ error: "Missing table, id, or updates" }, { status: 400 });
    }

    const supabase = getAdminSupabase();

    // Add updated_at timestamp
    const data = { ...updates, updated_at: new Date().toISOString() };
    // Remove id from updates to avoid overwriting primary key
    delete data.id;
    delete data.created_at;

    const { error } = await supabase.from(table).update(data).eq("id", id);

    if (error) {
      console.error(`Admin entities PUT error [${table}]:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}

// DELETE /api/admin/entities { table, id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { table: rawTable, id } = body;
    const table = validateTable(rawTable);
    if (!table || !id) {
      return NextResponse.json({ error: "Missing table or id" }, { status: 400 });
    }

    const supabase = getAdminSupabase();
    const { error } = await supabase.from(table).delete().eq("id", id);

    if (error) {
      console.error(`Admin entities DELETE error [${table}]:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
