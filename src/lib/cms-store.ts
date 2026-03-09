/**
 * Redis-backed CRUD store for CMS content sections.
 *
 * Each section is stored as a JSON array under the key `cms:{section}`.
 * Items include internal fields (_cloudinaryId, _cloudinaryResourceType)
 * that are used for Cloudinary deletion and are stripped by the public
 * content layer (src/lib/content.ts) before being served to visitors.
 */
import { getRedis } from "./redis";

export type CmsSection = "gallery" | "news" | "announcements" | "documents" | "careers";

function redisKey(section: CmsSection) {
    return `cms:${section}`;
}

export async function getItems(section: CmsSection): Promise<Record<string, unknown>[]> {
    const redis = getRedis();
    if (!redis) return [];
    try {
        const raw = await redis.get<string | Record<string, unknown>[]>(redisKey(section));
        if (!raw) return [];
        // Upstash may auto-parse JSON or return a string — handle both
        const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export async function addItem(section: CmsSection, item: Record<string, unknown>): Promise<void> {
    const redis = getRedis();
    if (!redis) throw new Error("Redis not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to your environment.");
    const items = await getItems(section);
    items.push(item);
    await redis.set(redisKey(section), JSON.stringify(items));
}

/**
 * Delete an item by its `id` field.
 * Returns the deleted item (including _cloudinaryId) so the caller can
 * clean up Cloudinary, or null if not found.
 */
export async function deleteItem(
    section: CmsSection,
    id: string,
): Promise<Record<string, unknown> | null> {
    const redis = getRedis();
    if (!redis) return null;
    const items = await getItems(section);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;
    const [deleted] = items.splice(index, 1);
    await redis.set(redisKey(section), JSON.stringify(items));
    return deleted;
}
