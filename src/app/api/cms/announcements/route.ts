import { NextRequest, NextResponse } from "next/server";
import { checkCmsAuth } from "@/lib/cms-auth";
import { sanitizeText, sanitizeBilingual } from "@/lib/cms-security";
import { getItems, addItem, deleteItem } from "@/lib/cms-store";

export async function GET() {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const items = await getItems("announcements");
        return NextResponse.json(
            items.map((item) => ({ ...item, _fileName: `${item.id}.json` }))
        );
    } catch (error) {
        console.error("Announcements GET error:", error);
        return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { title, content, contactInfo } = body;

        const id = `announcement-${Date.now()}`;
        const item: Record<string, unknown> = {
            id,
            published: true,
            publishedAt: new Date().toISOString().split("T")[0],
            title: sanitizeBilingual(title || {}),
            content: (content || []).map((c: { en?: string; bn?: string }) =>
                sanitizeBilingual(c)
            ),
            contactInfo: contactInfo ? sanitizeText(String(contactInfo)) : null,
        };

        await addItem("announcements", item);
        return NextResponse.json({ success: true, item });
    } catch (error) {
        console.error("Announcements POST error:", error);
        return NextResponse.json({ error: "Failed to add" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = (searchParams.get("file") || "").replace(/\.json$/, "");

        const deleted = await deleteItem("announcements", id);
        if (!deleted) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.error("Announcements DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
