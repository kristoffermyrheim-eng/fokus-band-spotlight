import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "";
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(SANITY_PROJECT_ID);

// Only create the client when projectId is available
export const sanityClient: SanityClient | null = sanityConfigured
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  if (!sanityClient) throw new Error("Sanity is not configured");
  return imageUrlBuilder(sanityClient).image(source);
}
