import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { adminOrPublishedStatus, adminOnly } from "@/access";
import { revalidatePost, revalidateDeletePost } from "@/hooks/revalidatePost";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: "Content",
    useAsTitle: "title",
    defaultColumns: ["title", "postType", "category", "publishedOn", "_status"],
    preview: (doc) => {
      const postType = doc?.postType === "projects" ? "projects" : "news";
      const slug = (doc?.slug as string) || "";
      return `${process.env.NEXT_PUBLIC_SERVER_URL || "https://arvishhafoundation.org"}/${postType}/${slug}`;
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Title",
      required: true,
      admin: {
        description: "Title of the news story or project initiative.",
      },
    },
    {
      name: "postType",
      type: "select",
      label: "Post Type",
      required: true,
      defaultValue: "news",
      options: [
        { label: "News & Community Stories", value: "news" },
        { label: "Projects & Ground Initiatives", value: "projects" },
      ],
      admin: {
        position: "sidebar",
        description: "Select whether this entry is a News Story or a Field Project. Default is News.",
      },
    },
    {
      name: "publishedOn",
      type: "date",
      label: "Published On",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
        description: "Scheduled or actual publication date and time.",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "author",
      type: "text",
      label: "Author / Organization",
      defaultValue: "Arvishha Foundation",
      admin: {
        position: "sidebar",
        description: "Author, team, or coordinator attribution.",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      label: "Primary Category",
      admin: {
        position: "sidebar",
        description: "Thematic taxonomy category (Education, Healthcare, Empowerment, etc.).",
      },
    },
    {
      name: "categoryCustom",
      type: "text",
      label: "Category Label (Override / Fallback)",
      admin: {
        position: "sidebar",
        placeholder: "e.g., Education, Women Empowerment, Healthcare",
        description: "Custom label if you prefer not linking to a relational category document.",
      },
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
      label: "Tags",
      admin: {
        position: "sidebar",
        description: "Associated taxonomy tags for filtering and badges.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "excerpt",
              type: "textarea",
              label: "Excerpt / Short Summary",
              required: true,
              admin: {
                description:
                  "Summary shown on cards, archive listings, and search results. Serves as shortDescription for projects and excerpt for news.",
                placeholder: "Brief, engaging summary of the story or project goals...",
              },
            },
            {
              name: "content",
              type: "richText",
              label: "Story Body / Detailed Article",
              admin: {
                description: "Full rich-text story narrative, project background, or ground report.",
              },
            },
            {
              type: "row",
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  label: "Featured / Cover Image",
                  admin: { width: "50%" },
                },
                {
                  name: "imageUrl",
                  type: "text",
                  label: "Fallback / External Image URL",
                  admin: {
                    width: "50%",
                    placeholder: "https://images.unsplash.com/...",
                    description: "Direct URL fallback if media document is not uploaded.",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Project Details",
          admin: {
            condition: (data) => data?.postType === "projects",
          },
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "status",
                  type: "select",
                  label: "Project Status",
                  defaultValue: "Active",
                  options: [
                    { label: "Active", value: "Active" },
                    { label: "Ongoing", value: "Ongoing" },
                    { label: "Completed", value: "Completed" },
                  ],
                  admin: { width: "50%" },
                  validate: (val: unknown, { data }: { data?: Record<string, unknown> }) => {
                    if (data?.postType === "projects" && !val) {
                      return "Project status is required for projects.";
                    }
                    return true;
                  },
                },
                {
                  name: "year",
                  type: "text",
                  label: "Timeline / Year",
                  admin: {
                    width: "50%",
                    placeholder: "e.g., 2024–Present or 2025–2026",
                  },
                  validate: (val: unknown, { data }: { data?: Record<string, unknown> }) => {
                    if (
                      data?.postType === "projects" &&
                      (!val || typeof val !== "string" || !val.trim())
                    ) {
                      return "Timeline / Year is required for projects.";
                    }
                    return true;
                  },
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "location",
                  type: "text",
                  label: "Project Location",
                  admin: {
                    width: "50%",
                    placeholder: "e.g., Peri-urban clusters & rural settlements",
                  },
                  validate: (val: unknown, { data }: { data?: Record<string, unknown> }) => {
                    if (
                      data?.postType === "projects" &&
                      (!val || typeof val !== "string" || !val.trim())
                    ) {
                      return "Location is required for projects.";
                    }
                    return true;
                  },
                },
                {
                  name: "beneficiaries",
                  type: "text",
                  label: "Beneficiaries",
                  admin: {
                    width: "50%",
                    placeholder: "e.g., 350+ Children, 120+ Women Artisans",
                  },
                  validate: (val: unknown, { data }: { data?: Record<string, unknown> }) => {
                    if (
                      data?.postType === "projects" &&
                      (!val || typeof val !== "string" || !val.trim())
                    ) {
                      return "Beneficiaries information is required for projects.";
                    }
                    return true;
                  },
                },
              ],
            },
            {
              name: "shortDescription",
              type: "textarea",
              label: "Short Description (Override)",
              admin: {
                description:
                  "Optional override for the card short description. If left blank, the main Excerpt is automatically used.",
              },
            },
            {
              name: "fullDescription",
              type: "textarea",
              label: "Full Plaintext Description",
              admin: {
                description:
                  "Comprehensive plaintext project narrative, matching the fullDescription field used on the projects page.",
              },
            },
            {
              name: "keyOutcomes",
              type: "array",
              label: "Key Outcomes / Deliverables",
              admin: {
                description: "Key milestones or measurable impact points achieved by this project.",
              },
              fields: [
                {
                  name: "outcome",
                  type: "text",
                  label: "Outcome Point",
                  required: true,
                },
              ],
            },
            {
              name: "href",
              type: "text",
              label: "Custom Project Page URL",
              admin: {
                placeholder: "e.g. /projects/project-shiksha (auto-computed from slug if empty)",
              },
            },
          ],
        },
        {
          label: "News Details",
          admin: {
            condition: (data) => data?.postType === "news",
          },
          fields: [
            {
              name: "readTime",
              type: "text",
              label: "Read Time",
              admin: {
                placeholder: "e.g., 4 min read",
                description: "Estimated reading time shown on story cards and headers.",
              },
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    slugField(),
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data) {
          // Synchronize excerpt & shortDescription for projects
          if (data.postType === "projects") {
            if (!data.shortDescription && data.excerpt) {
              data.shortDescription = data.excerpt;
            }
            if (!data.excerpt && data.shortDescription) {
              data.excerpt = data.shortDescription;
            }
          }
          // Compute default href if left empty
          if (!data.href && data.slug) {
            data.href =
              data.postType === "projects"
                ? `/projects/${data.slug}`
                : `/news/${data.slug}`;
          }
        }
        return data;
      },
    ],
    afterChange: [revalidatePost],
    afterDelete: [revalidateDeletePost],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 20,
  },
  timestamps: true,
};

export default Posts;
