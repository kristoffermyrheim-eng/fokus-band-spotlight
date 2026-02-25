import type { PortableTextBlock } from "@portabletext/react";

export interface SanityNewsPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  body: PortableTextBlock[];
  coverImage: SanityImageRef;
  gallery?: SanityImageRef[];
  publishedAt: string;
  isPublished: boolean;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface SanityImageRef {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
}

// Projected list item (lighter)
export interface NewsListItem {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  publishedAt: string;
  tags?: string[];
  coverImage: SanityImageRef;
}
