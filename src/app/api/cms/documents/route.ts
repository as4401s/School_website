import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { checkCmsAuth, safeFilePath } from "@/lib/cms-auth";
import { sanitizeText, sanitizeBilingual } from "@/lib/cms-security";

const contentDir = path.join(process.cwd(), "content", "documents");
const mediaBase = path.join(process.cwd(), "public");

export async function GET() {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await fs.mkdir(contentDir, { recursive: true });
        const files = await fs.readdir(contentDir);
        const items = (
            await Promise.all(
                files
                    .filter((f) => f.endsWith(".json"))
                    .map(async (f) => {
                        try {
                            const raw = await fs.readFile(path.join(contentDir, f), "utf8");
                            return { ...JSON.parse(raw), _fileName: f };
                        } catch {
                            console.error(`Skipping malformed file: ${f}`);
                            return null;
                        }
                    })
            )
        ).filter(Boolean);
        return NextResponse.json(items);
    } catch (error) {
        console.error("Documents GET error:", error);
        return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { title, category, description, href } = body;

        const id = `doc-${Date.now()}`;
        const item = {
            id,
            slug: id,
            published: true,
            order: 999,
            title: sanitizeBilingual(title || {}),
            category: sanitizeBilingual(category || { en: "General", bn: "" }),
            description: sanitizeBilingual(description || {}),
            // Only allow internal CMS-managed URLs
            href: typeof href === "string" && href.startsWith("/media/cms/") ? href : sanitizeText(href || ""),
        };

        await fs.mkdir(contentDir, { recursive: true });
        await fs.writeFile(
            path.join(contentDir, `${id}.json`),
            JSON.stringify(item, null, 2)
        );

        return NextResponse.json({ success: true, item });
    } catch (error) {
        console.error("Documents POST error:", error);
        return NextResponse.json({ error: "Failed to add" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const check = safeFilePath(searchParams.get("file"), contentDir);
        if (!check.ok) {
            return NextResponse.json({ error: check.error }, { status: 400 });
        }
        const raw = await fs.readFile(check.filePath, "utf8");
        const item = JSON.parse(raw);
        await fs.unlink(check.filePath);

        // Best-effort: also remove the uploaded document file
        if (item.href && typeof item.href === "string" && item.href.startsWith("/media/cms/")) {
            const mediaPath = path.join(mediaBase, item.href);
            fs.unlink(mediaPath).catch(() => { /* ignore if already gone */ });
        }

        return NextResponse.json({ success: true, deleted: item });
    } catch (error) {
        console.error("Documents DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
