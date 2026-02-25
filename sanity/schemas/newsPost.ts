// Sanity Studio schema – place this file in your Sanity Studio project
// e.g. sanity-studio/schemas/newsPost.ts
//
// Then register it in sanity.config.ts:
//   import { newsPost } from "./schemas/newsPost";
//   export default defineConfig({ ..., schema: { types: [newsPost] } });

import { defineType, defineField } from "sanity";

export const newsPost = defineType({
  name: "newsPost",
  title: "Nyhetssak",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Tittel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      title: "Ingress / sammendrag",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Brødtekst",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-tekst",
              type: "string",
            }),
          ],
        },
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Forsidebilde",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "gallery",
      title: "Bildegalleri",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-tekst",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Publiseringsdato",
      type: "datetime",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "isPublished",
      title: "Publisert",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "seoTitle",
      title: "SEO-tittel (valgfri)",
      type: "string",
      description: "Faller tilbake til vanlig tittel hvis tom.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO-beskrivelse (valgfri)",
      type: "text",
      rows: 2,
      description: "Faller tilbake til ingress hvis tom.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
      media: "coverImage",
    },
  },
});
