import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { checkCmsAuth } from "@/lib/cms-auth";
import { isAllowedMediaUrl, normalizeCloudinaryAsset } from "@/lib/cms-media";
import { sanitizeBilingual } from "@/lib/cms-security";
import { getItems, addItem, deleteItem } from "@/lib/cms-store";

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
        const items = await getItems("news");
        return NextResponse.json(
            items.map((item) => ({ ...item, _fileName: `${item.id}.json` }))
        );
    } catch (error) {
        console.error("News GET error:", error);
        return NextResponse.json({ error: "Failed to load" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const body = await request.json();
        const { title, excerpt, body: postBody, imageUrl, publicId, resourceType } = body;
        const asset = normalizeCloudinaryAsset("news", publicId, resourceType);

        const id = `news-${Date.now()}`;
        const item: Record<string, unknown> = {
            id,
            slug: id,
            published: true,
            featured: false,
            publishedAt: new Date().toISOString().split("T")[0],
            title: sanitizeBilingual(title || {}),
            excerpt: sanitizeBilingual(excerpt || {}),
            body: (postBody || []).map((p: { en?: string; bn?: string }) =>
                sanitizeBilingual(p)
            ),
            imageUrl: isAllowedMediaUrl(imageUrl) ? imageUrl : "",
            _cloudinaryId: asset.publicId,
            _cloudinaryResourceType: asset.resourceType,
        };

        await addItem("news", item);
        return NextResponse.json({ success: true, item });
    } catch (error) {
        console.error("News POST error:", error);
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

        const deleted = await deleteItem("news", id);
        if (!deleted) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        // Best-effort: delete from Cloudinary
        const asset = normalizeCloudinaryAsset("news", deleted._cloudinaryId, deleted._cloudinaryResourceType);
        if (asset.publicId && asset.resourceType) {
            const cld = configureCloudinary();
            if (cld) {
                cld.uploader.destroy(asset.publicId, { resource_type: asset.resourceType }).catch(() => {});
            }
        }

        return NextResponse.json({ success: true, deleted });
    } catch (error) {
        console.error("News DELETE error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}
