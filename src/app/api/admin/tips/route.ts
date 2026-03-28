/**
 * Admin Research Tips API - FRAMEWORK (generic, reusable)
 * Manages research tips stored in a YAML file.
 * Tips are URLs, company names, or keywords that the research pipeline
 * should investigate during its next run.
 */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getTipsFilePath(): string {
  return path.resolve(process.cwd(), "research_config", "tips.yaml");
}

interface ResearchTip {
  id: string;
  type: "url" | "company_name" | "keyword" | "person_name";
  value: string;
  note: string;
  status: "pending" | "processed" | "failed";
  created_at: string;
}

function loadTips(): ResearchTip[] {
  const filePath = getTipsFilePath();
  try {
    if (!fs.existsSync(filePath)) return [];
    const raw = fs.readFileSync(filePath, "utf-8");
    // Simple YAML-like JSON array stored as YAML
    // We store as JSON for simplicity (valid YAML too)
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveTips(tips: ResearchTip[]) {
  const filePath = getTipsFilePath();
  fs.writeFileSync(filePath, JSON.stringify(tips, null, 2), "utf-8");
}

// GET /api/admin/tips
export async function GET() {
  const tips = loadTips();
  return NextResponse.json({ tips });
}

// POST /api/admin/tips { type, value, note }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, value, note } = body;

    if (!type || !value) {
      return NextResponse.json(
        { error: "Missing type or value" },
        { status: 400 }
      );
    }

    const tips = loadTips();
    const newTip: ResearchTip = {
      id: `tip_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      type,
      value: value.trim(),
      note: note?.trim() || "",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    tips.unshift(newTip);
    saveTips(tips);

    return NextResponse.json({ success: true, tip: newTip });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}

// PUT /api/admin/tips { id, status }
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const tips = loadTips();
    const tip = tips.find((t) => t.id === id);
    if (!tip) {
      return NextResponse.json({ error: "Tip not found" }, { status: 404 });
    }

    tip.status = status;
    saveTips(tips);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}

// DELETE /api/admin/tips { id }
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    let tips = loadTips();
    tips = tips.filter((t) => t.id !== id);
    saveTips(tips);

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 400 });
  }
}
