import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { checkCmsAuth, safeFilePath } from "@/lib/cms-auth";
import { sanitizeBilingual } from "@/lib/cms-security";

const contentDir = path.join(process.cwd(), "content", "gallery");
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
        console.error("Gallery GET error:", error);
        return NextResponse.json({ error: "Failed to load gallery" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { imageUrl, title, summary, mediaType } = body;

        if (!imageUrl || typeof imageUrl !== "string" || !imageUrl.startsWith("/media/cms/")) {
            return NextResponse.json({ error: "Valid CMS media URL is required" }, { status: 400 });
        }

        const id = `gallery-${Date.now()}`;
        const item = {
            id,
            order: 999,
            published: true,
            title: sanitizeBilingual(title || {}),
            summary: sanitizeBilingual(summary || {}),
            imageUrl,
            mediaType: mediaType === "video" ? "video" : "image",
        };

        await fs.mkdir(contentDir, { recursive: true });
        await fs.writeFile(
            path.join(contentDir, `${id}.json`),
            JSON.stringify(item, null, 2)
        );

        return NextResponse.json({ success: true, item });
    } catch (error) {
        console.error("Gallery POST error:", error);
        return NextResponse.json({ error: "Failed to add gallery item" }, { status: 500 });
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
        let item: Record<string, unknown> = {};
        try { item = JSON.parse(raw); } catch { /* corrupted file — still proceed with deletion */ }
        await fs.unlink(check.filePath);

        // Best-effort: also remove the uploaded media file
        if (item.imageUrl && typeof item.imageUrl === "string" && item.imageUrl.startsWith("/media/cms/")) {
            const mediaPath = path.join(mediaBase, item.imageUrl);
            fs.unlink(mediaPath).catch(() => { /* ignore if already gone */ });
        }

        return NextResponse.json({ success: true, deleted: item });
    } catch (error) {
        console.error("Gallery DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
