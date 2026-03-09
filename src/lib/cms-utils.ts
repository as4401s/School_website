/**
 * CMS file validation and image compression utilities.
 * Runs on the client side before uploading.
 */

// ── Supported formats ──

export const SUPPORTED_IMAGES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "image/gif",
    "image/bmp",
    "image/svg+xml",
];

export const SUPPORTED_VIDEOS = [
    "video/mp4",
    "video/mpeg",
    "video/avi",
    "video/x-msvideo",
    "video/quicktime",  // .mov (iPhone)
    "video/webm",
    "video/x-matroska", // .mkv
    "video/3gpp",
];

export const SUPPORTED_DOCUMENTS = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const IMAGE_EXTENSIONS = ".jpg, .jpeg, .png, .webp, .heic, .heif, .gif, .bmp, .svg";
export const VIDEO_EXTENSIONS = ".mp4, .mpeg, .avi, .mov, .webm, .mkv, .3gp";
export const DOCUMENT_EXTENSIONS = ".pdf, .doc, .docx";

// ── Format validation ──

export type FileCategory = "image" | "video" | "document" | "any";

export function validateFileFormat(
    file: File,
    category: FileCategory
): { valid: boolean; message: string } {
    const type = file.type.toLowerCase();
    const ext = file.name.split(".").pop()?.toLowerCase() || "";

    // Also check by extension as a fallback (some browsers don't set MIME for HEIC)
    const extMap: Record<string, string[]> = {
        image: ["jpg", "jpeg", "png", "webp", "heic", "heif", "gif", "bmp", "svg"],
        video: ["mp4", "mpeg", "mpg", "avi", "mov", "webm", "mkv", "3gp", "m4v"],
        document: ["pdf", "doc", "docx"],
    };

    if (category === "image") {
        if (SUPPORTED_IMAGES.includes(type) || extMap.image.includes(ext)) {
            return { valid: true, message: "" };
        }
        return {
            valid: false,
            message: `Unsupported image format "${ext}". Supported formats: ${IMAGE_EXTENSIONS}`,
        };
    }

    if (category === "video") {
        if (SUPPORTED_VIDEOS.includes(type) || extMap.video.includes(ext)) {
            return { valid: true, message: "" };
        }
        return {
            valid: false,
            message: `Unsupported video format "${ext}". Supported formats: ${VIDEO_EXTENSIONS}`,
        };
    }

    if (category === "document") {
        if (SUPPORTED_DOCUMENTS.includes(type) || extMap.document.includes(ext)) {
            return { valid: true, message: "" };
        }
        return {
            valid: false,
            message: `Unsupported document format "${ext}". Supported formats: ${DOCUMENT_EXTENSIONS}`,
        };
    }

    // "any" — accept all above
    const allTypes = [...SUPPORTED_IMAGES, ...SUPPORTED_VIDEOS, ...SUPPORTED_DOCUMENTS];
    const allExts = [...extMap.image, ...extMap.video, ...extMap.document];
    if (allTypes.includes(type) || allExts.includes(ext)) {
        return { valid: true, message: "" };
    }
    return {
        valid: false,
        message: `Unsupported file format "${ext}". Supported: ${IMAGE_EXTENSIONS}, ${VIDEO_EXTENSIONS}, ${DOCUMENT_EXTENSIONS}`,
    };
}

// ── Image compression ──

const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
const MAX_DIMENSION = 1920; // max width or height in px
const COMPRESSION_QUALITY = 0.8;

/**
 * Compresses an image file if it exceeds MAX_IMAGE_SIZE.
 * Returns the original file if it's small enough or not a compressible image.
 * HEIC files are passed through as-is (browser can't decode them in Canvas).
 */
export async function compressImage(file: File): Promise<File> {
    // Skip non-image files
    if (!file.type.startsWith("image/")) return file;

    // Skip HEIC/HEIF (Canvas can't decode these)
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (["heic", "heif"].includes(ext)) return file;

    // Skip SVG (vector, no need to compress)
    if (file.type === "image/svg+xml") return file;

    // Skip small images
    if (file.size <= MAX_IMAGE_SIZE) return file;

    return new Promise((resolve) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);

            let { width, height } = img;

            // Scale down if too large
            if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
                const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
                width = Math.round(width * ratio);
                height = Math.round(height * ratio);
            }

            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");
            if (!ctx) {
                resolve(file);
                return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (!blob || blob.size >= file.size) {
                        // Compression didn't help, return original
                        resolve(file);
                        return;
                    }

                    const compressedFile = new File([blob], file.name, {
                        type: "image/jpeg",
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                "image/jpeg",
                COMPRESSION_QUALITY
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(url);
            resolve(file); // Can't process, return original
        };

        img.src = url;
    });
}

/**
 * Checks if a file is a video based on type or extension.
 */
export function isVideoFile(file: File): boolean {
    if (file.type.startsWith("video/")) return true;
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    return ["mp4", "mpeg", "mpg", "avi", "mov", "webm", "mkv", "3gp", "m4v"].includes(ext);
}
