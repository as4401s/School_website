import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { checkCmsAuth } from "@/lib/cms-auth";
import { sanitizeText, sanitizeBilingual } from "@/lib/cms-security";
import { getItems, addItem, deleteItem } from "@/lib/cms-store";

function isAllowedMediaUrl(url: unknown): url is string {
    if (typeof url !== "string" || !url) return false;
    return url.startsWith("/media/cms/") || url.startsWith("https://res.cloudinary.com/");
}

function configureCloudinary() {
    if (!process.env.CLOUDINARY_CLOUD_NAME) return null;
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    return cloudinary;
}

export async function GET() {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const items = await getItems("careers");
        return NextResponse.json(
            items.map((item) => ({ ...item, _fileName: `${item.id}.json` }))
        );
    } catch (error) {
        console.error("Careers GET error:", error);
        return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { title, description, qualifications, imageUrl, contactInfo, publicId, resourceType } = body;

        const id = `career-${Date.now()}`;
        const item: Record<string, unknown> = {
            id,
            published: true,
            publishedAt: new Date().toISOString().split("T")[0],
            title: sanitizeBilingual(title || {}),
            description: sanitizeBilingual(description || {}),
            qualifications: (qualifications || []).map((q: { en?: string; bn?: string }) =>
                sanitizeBilingual(q)
            ),
            imageUrl: isAllowedMediaUrl(imageUrl) ? imageUrl : null,
            contactInfo: contactInfo ? sanitizeText(String(contactInfo)) : null,
            _cloudinaryId: publicId || null,
            _cloudinaryResourceType: resourceType || "image",
        };

        await addItem("careers", item);
        return NextResponse.json({ success: true, item });
    } catch (error) {
        console.error("Careers POST error:", error);
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

        const deleted = await deleteItem("careers", id);
        if (!deleted) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        // Best-effort: delete from Cloudinary
        if (deleted._cloudinaryId && typeof deleted._cloudinaryId === "string") {
            const cld = configureCloudinary();
            if (cld) {
                cld.uploader.destroy(deleted._cloudinaryId, { resource_type: "image" }).catch(() => {});
            }
        }

        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.error("Careers DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
