import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// These are public/publishable values – safe to include in client code.
// Replace with your actual Sanity project ID and dataset after setup.
const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || "";
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanityConfigured = Boolean(SANITY_PROJECT_ID);

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: "2024-01-01",
  useCdn: true, // fast edge-cached reads
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
