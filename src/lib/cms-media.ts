export type CmsMediaSection = "gallery" | "careers" | "news" | "documents" | "announcements";
export type CloudinaryResourceType = "image" | "video" | "raw";

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/";

const SECTION_RESOURCE_TYPES: Record<CmsMediaSection, readonly CloudinaryResourceType[]> = {
    gallery: ["image", "video"],
    careers: ["image"],
    news: ["image"],
    documents: ["image", "raw"],
    announcements: ["image"],
};

export function isAllowedMediaUrl(url: unknown): url is string {
    if (typeof url !== "string" || !url) {
        return false;
    }

    if (url.startsWith("/media/cms/")) {
        return true;
    }

    if (!url.startsWith(CLOUDINARY_BASE_URL)) {
        return false;
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    if (!cloudName) {
        return true;
    }

    return url.startsWith(`${CLOUDINARY_BASE_URL}${cloudName}/`);
}

export function normalizeCloudinaryPublicId(
    section: CmsMediaSection,
    publicId: unknown
): string | null {
    if (typeof publicId !== "string") {
        return null;
    }

    const trimmed = publicId.trim();
    if (!trimmed) {
        return null;
    }

    if (!trimmed.startsWith(`kms/${section}/`)) {
        return null;
    }

    if (trimmed.includes("..") || trimmed.includes("//")) {
        return null;
    }

    return /^[A-Za-z0-9/_-]+$/.test(trimmed) ? trimmed : null;
}

export function normalizeCloudinaryResourceType(
    section: CmsMediaSection,
    resourceType: unknown
): CloudinaryResourceType | null {
    if (typeof resourceType !== "string") {
        return null;
    }

    const normalized = resourceType.trim().toLowerCase() as CloudinaryResourceType;
    return SECTION_RESOURCE_TYPES[section].includes(normalized) ? normalized : null;
}

export function normalizeCloudinaryAsset(
    section: CmsMediaSection,
    publicId: unknown,
    resourceType: unknown
): { publicId: string | null; resourceType: CloudinaryResourceType | null } {
    const safePublicId = normalizeCloudinaryPublicId(section, publicId);
    const safeResourceType = normalizeCloudinaryResourceType(section, resourceType);

    if (!safePublicId || !safeResourceType) {
        return { publicId: null, resourceType: null };
    }

    return {
        publicId: safePublicId,
        resourceType: safeResourceType,
    };
}
