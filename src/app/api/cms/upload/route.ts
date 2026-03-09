import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

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
            return NextResponse.json(
                { error: "Invalid section" },
                { status: 400 }
            );
        }

        const uploadDir = path.join(process.cwd(), "public", "media", "cms", section);
        await fs.mkdir(uploadDir, { recursive: true });

        // Sanitize filename
        const timestamp = Date.now();
        const ext = path.extname(file.name).toLowerCase();
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
