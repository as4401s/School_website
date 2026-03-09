import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content", "news");

async function checkAuth() {
    const cookieStore = await cookies();
    return !!cookieStore.get("cms_session")?.value;
}

export async function GET() {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        await fs.mkdir(contentDir, { recursive: true });
        const files = await fs.readdir(contentDir);
        const items = await Promise.all(
            files
                .filter((f) => f.endsWith(".json"))
                .map(async (f) => {
                    const raw = await fs.readFile(path.join(contentDir, f), "utf8");
                    return { ...JSON.parse(raw), _fileName: f };
                })
        );
        return NextResponse.json(items);
    } catch (error) {
        console.error("News GET error:", error);
        return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { title, excerpt, body: postBody, imageUrl } = body;

        const id = `news-${Date.now()}`;
        const item = {
            id,
            slug: id,
            published: true,
            featured: false,
            publishedAt: new Date().toISOString().split("T")[0],
            title: {
                en: title?.en || "Untitled",
                bn: title?.bn || "",
            },
            excerpt: {
                en: excerpt?.en || "",
                bn: excerpt?.bn || "",
            },
            body: (postBody || []).map((p: { en?: string; bn?: string }) => ({
                en: p.en || "",
                bn: p.bn || "",
            })),
            imageUrl: imageUrl || "",
        };

        await fs.mkdir(contentDir, { recursive: true });
        await fs.writeFile(
            path.join(contentDir, `${id}.json`),
            JSON.stringify(item, null, 2)
        );

        return NextResponse.json({ success: true, item });
    } catch (error) {
        console.error("News POST error:", error);
        return NextResponse.json({ error: "Failed to add" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    if (!(await checkAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const fileName = searchParams.get("file");
        if (!fileName) {
            return NextResponse.json({ error: "File name required" }, { status: 400 });
        }
        const filePath = path.join(contentDir, fileName);
        const raw = await fs.readFile(filePath, "utf8");
        const item = JSON.parse(raw);
        await fs.unlink(filePath);
        return NextResponse.json({ success: true, deleted: item });
    } catch (error) {
        console.error("News DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
