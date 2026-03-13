import { NextRequest, NextResponse } from "next/server";
import path from "node:path";
import { v2 as cloudinary } from "cloudinary";
import { checkCmsAuth } from "@/lib/cms-auth";
import { checkFileSize } from "@/lib/cms-security";
import type { CmsMediaSection } from "@/lib/cms-media";

const ALLOWED_IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif", ".gif", ".bmp"];
const ALLOWED_VIDEO_EXTS = [".mp4", ".mpeg", ".mpg", ".avi", ".mov", ".webm", ".mkv", ".3gp", ".m4v"];
const ALLOWED_DOCUMENT_EXTS = [".pdf", ".doc", ".docx"];

const MIME_TYPES: Record<string, readonly string[]> = {
    ".jpg": ["image/jpeg"],
    ".jpeg": ["image/jpeg"],
    ".png": ["image/png"],
    ".webp": ["image/webp"],
    ".heic": ["image/heic", "image/heif"],
    ".heif": ["image/heif", "image/heic"],
    ".gif": ["image/gif"],
    ".bmp": ["image/bmp", "image/x-ms-bmp"],
    ".mp4": ["video/mp4"],
    ".mpeg": ["video/mpeg"],
    ".mpg": ["video/mpeg"],
    ".avi": ["video/x-msvideo"],
    ".mov": ["video/quicktime"],
    ".webm": ["video/webm"],
    ".mkv": ["video/x-matroska"],
    ".3gp": ["video/3gpp"],
    ".m4v": ["video/x-m4v", "video/mp4"],
    ".pdf": ["application/pdf"],
    ".doc": ["application/msword"],
    ".docx": ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
};

const SECTION_FORMATS: Record<string, string[]> = {
    gallery: [...ALLOWED_IMAGE_EXTS, ...ALLOWED_VIDEO_EXTS],
    careers: [...ALLOWED_IMAGE_EXTS],
    news: [...ALLOWED_IMAGE_EXTS],
    documents: [...ALLOWED_DOCUMENT_EXTS, ...ALLOWED_IMAGE_EXTS],
    announcements: [...ALLOWED_IMAGE_EXTS],
};

const SECTION_CATEGORY: Record<string, "image" | "video" | "document"> = {
    gallery: "image",   // checked per file below
    careers: "image",
    news: "image",
    documents: "document",
    announcements: "image",
};

const VIDEO_EXTS = new Set(ALLOWED_VIDEO_EXTS);
const DOCUMENT_EXTS = new Set(ALLOWED_DOCUMENT_EXTS);
const ALLOWED_SECTIONS: readonly CmsMediaSection[] = [
    "gallery",
    "careers",
    "documents",
    "news",
    "announcements",
];

function getCloudinaryResourceType(ext: string): "image" | "video" | "raw" {
    if (VIDEO_EXTS.has(ext)) return "video";
    if (DOCUMENT_EXTS.has(ext)) return "raw";
    return "image";
}

function hasCompatibleMimeType(ext: string, mimeType: string): boolean {
    const allowedMimeTypes = MIME_TYPES[ext];
    if (!allowedMimeTypes || !mimeType) {
        return true;
    }

    const normalizedMimeType = mimeType.toLowerCase();
    return allowedMimeTypes.includes(normalizedMimeType);
}

function getMimeTypeForExtension(ext: string): string {
    return MIME_TYPES[ext]?.[0] || "application/octet-stream";
}

export async function POST(request: NextRequest) {
    if (!(await checkCmsAuth())) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (
        !process.env.CLOUDINARY_CLOUD_NAME ||
        !process.env.CLOUDINARY_API_KEY ||
        !process.env.CLOUDINARY_API_SECRET
    ) {
        return NextResponse.json(
            { error: "Cloudinary is not configured on the server." },
            { status: 500 }
        );
    }

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

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

        if (!ALLOWED_SECTIONS.includes(section as CmsMediaSection)) {
            return NextResponse.json({ error: "Invalid section" }, { status: 400 });
        }

        // Validate file extension
        const ext = path.extname(file.name).toLowerCase();
        const allowed = SECTION_FORMATS[section] || [];
        if (!allowed.includes(ext)) {
            return NextResponse.json(
                {
                    error: `Unsupported file format "${ext}" for ${section}. Supported: ${allowed.join(", ")}`,
                },
                { status: 400 }
            );
        }

        if (!hasCompatibleMimeType(ext, file.type)) {
            return NextResponse.json(
                { error: `File type "${file.type}" does not match the "${ext}" extension.` },
                { status: 400 }
            );
        }

        // Server-side file size check
        const isVideo = section === "gallery" && VIDEO_EXTS.has(ext);
        const category = isVideo ? "video" : SECTION_CATEGORY[section];
        const sizeCheck = checkFileSize({ size: file.size, name: file.name }, category);
        if (!sizeCheck.allowed) {
            return NextResponse.json({ error: sizeCheck.message }, { status: 413 });
        }

        // Convert to base64 data URI for Cloudinary
        const buffer = Buffer.from(await file.arrayBuffer());
        const base64 = buffer.toString("base64");
        const mimeType = getMimeTypeForExtension(ext);
        const dataUri = `data:${mimeType};base64,${base64}`;

        const resourceType = getCloudinaryResourceType(ext);

        const result = await cloudinary.uploader.upload(dataUri, {
            folder: `kms/${section}`,
            resource_type: resourceType,
            use_filename: true,
            unique_filename: true,
        });

        return NextResponse.json({
            success: true,
            url: result.secure_url,
            publicId: result.public_id,
            resourceType,
        });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
