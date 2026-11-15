import YukinaConfig from "../../yukina.config";
import CryptoJS from "crypto-js";

/**
 * Turns text into a readable URL segment: "Multi-Agent Systems" -> "multi-agent-systems".
 */
export function Slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Converts a tag or category name to its URL segment, based on the configured slug mode.
 *
 * @param slug - The tag or category name.
 * @returns An 8-character hash in "HASH" mode, otherwise a readable slug.
 */
export function IdToSlug(slug: string): string {
  switch (YukinaConfig.slugMode) {
    case "HASH": {
      const hash = CryptoJS.SHA256(slug);
      const hasedSlug = hash.toString(CryptoJS.enc.Hex).slice(0, 8);
      return hasedSlug;
    }
    case "RAW":
    default:
      return Slugify(slug);
  }
}

/**
 * Converts a post's collection id to its URL segment.
 *
 * In "RAW" mode the folder and date prefix of the file name are dropped:
 * "projects/2020-04-25-connect_four_ai_haskell" -> "connect-four-ai-haskell".
 * To change a post's URL, rename its file (and add a redirect from the old URL).
 */
export function PostIdToSlug(id: string): string {
  if (YukinaConfig.slugMode === "HASH") return IdToSlug(id);
  const fileName = id.split("/").pop() ?? id;
  return Slugify(fileName.replace(/^\d{4}-\d{2}-\d{2}-/, ""));
}

/**
 * Computes an index from a given slug ID string using a custom hash algorithm.
 *
 * Each character's ASCII code is multiplied by 31 raised to a decreasing power, and the sum is then reduced
 * by the length of the list. The returned index is guaranteed to be in the range [0, listLength - 1].
 *
 * @param id - The slug ID string to hash.
 * @param listLength - The length of the list for which the index is computed.
 * @returns A zero-based index within the list.
 */
export function GetIndexFromSlugID(id: string, listLength: number): number {
  // Convert the string to a number
  let hashValue = 0;
  for (let i = 0; i < id.length; i++) {
    hashValue += id.charCodeAt(i) * 31 ** (id.length - 1 - i);
  }

  // Modulo the list length to get the index
  const index = hashValue % listLength;
  return index;
}
