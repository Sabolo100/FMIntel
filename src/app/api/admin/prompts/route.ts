/**
 * Admin Prompts API - FRAMEWORK (generic, reusable)
 * Read and write YAML prompt files from the research_config directory.
 */
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Resolve research_config path relative to webapp root
function getConfigDir(): string {
  return path.resolve(process.cwd(), "research_config");
}

const ALLOWED_FILES = [
  "prompts/search_prompts.yaml",
  "prompts/extract_prompts.yaml",
  "items.yaml",
  "policies.yaml",
];

// GET /api/admin/prompts — list all editable files with their content
export async function GET() {
  const configDir = getConfigDir();
  const files: { name: string; path: string; content: string }[] = [];

  for (const relPath of ALLOWED_FILES) {
    const fullPath = path.join(configDir, relPath);
    try {
      const content = fs.readFileSync(fullPath, "utf-8");
      files.push({
        name: relPath,
        path: relPath,
        content,
      });
    } catch (e) {
      files.push({
        name: relPath,
        path: relPath,
        content: `# File not found: ${relPath}`,
      });
    }
  }

  return NextResponse.json({ files });
}

// PUT /api/admin/prompts { path, content }
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { path: relPath, content } = body;

    if (!relPath || typeof content !== "string") {
      return NextResponse.json(
        { error: "Missing path or content" },
        { status: 400 }
      );
    }

    // Security: only allow editing whitelisted files
    if (!ALLOWED_FILES.includes(relPath)) {
      return NextResponse.json(
        { error: "File not in allowed list" },
        { status: 403 }
      );
    }

    const configDir = getConfigDir();
    const fullPath = path.join(configDir, relPath);

    // Create backup before writing
    if (fs.existsSync(fullPath)) {
      const backupPath = fullPath + ".bak";
      fs.copyFileSync(fullPath, backupPath);
    }

    fs.writeFileSync(fullPath, content, "utf-8");

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
