import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const ALLOWED_IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".gif", ".bmp", ".svg"];
const ALLOWED_VIDEO_EXTS = [".mp4", ".mpeg", ".mpg", ".avi", ".mov", ".webm", ".mkv", ".3gp", ".m4v"];
const ALLOWED_DOCUMENT_EXTS = [".pdf", ".doc", ".docx"];

const SECTION_FORMATS: Record<string, string[]> = {
    gallery: [...ALLOWED_IMAGE_EXTS, ...ALLOWED_VIDEO_EXTS],
    careers: [...ALLOWED_IMAGE_EXTS],
    news: [...ALLOWED_IMAGE_EXTS],
    documents: [...ALLOWED_DOCUMENT_EXTS, ...ALLOWED_IMAGE_EXTS],
    announcements: [...ALLOWED_IMAGE_EXTS],
};

async function checkAuth() {
    const cookieStore = await cookies();
    return !!cookieStore.get("cms_session")?.value;
}

export async function POST(request: NextRequest) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const section = formData.get("section") as string | null;

        if (!file || !section) {
            return NextResponse.json(
                { error: "File and section are required" },
                { status: 400 }
            );
        }

        const allowedSections = ["gallery", "careers", "documents", "news", "announcements"];
        if (!allowedSections.includes(section)) {
            return NextResponse.json({ error: "Invalid section" }, { status: 400 });
        }

        // Validate file format
        const ext = path.extname(file.name).toLowerCase();
        const allowed = SECTION_FORMATS[section] || [];
        if (!allowed.includes(ext)) {
            return NextResponse.json(
                {
                    error: `Unsupported file format "${ext}" for ${section}. Supported formats: ${allowed.join(", ")}`,
                },
                { status: 400 }
            );
        }

        const uploadDir = path.join(process.cwd(), "public", "media", "cms", section);
        await fs.mkdir(uploadDir, { recursive: true });

        // Sanitize filename
        const timestamp = Date.now();
        const baseName = file.name
            .replace(ext, "")
            .replace(/[^a-zA-Z0-9_-]/g, "_")
            .substring(0, 50);
        const fileName = `${baseName}_${timestamp}${ext}`;
        const filePath = path.join(uploadDir, fileName);

        const buffer = Buffer.from(await file.arrayBuffer());
        await fs.writeFile(filePath, buffer);

        const publicUrl = `/media/cms/${section}/${fileName}`;
        return NextResponse.json({ success: true, url: publicUrl, fileName });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
