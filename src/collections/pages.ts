import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { adminOrPublishedStatus, adminOnly } from "@/access";
import { revalidatePage, revalidateDeletePage } from "@/hooks/revalidatePage";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
  HeroBlock,
  ContentBlock,
  ImpactStatsBlock,
  FocusAreasBlock,
  MissionVisionBlock,
  ProjectsBlock,
  TestimonialsBlock,
  ProcessBlock,
  CTABlock,
  FAQBlock,
  NewsBlock,
  ContactBlock,
  ContactPageBlock,
  MediaBlock,
  FormBlock,
  TeamBlock,
  PartnersBlock,
  ValuesBlock,
  DonateTiersBlock,
  StoryBlock,
  TransparencyBlock,
  VolunteerBlock,
  CorporatePartnershipBlock,
  PillarsBlock,
} from "@/blocks";

export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "slug", "publishedOn", "updatedAt", "_status"],
    useAsTitle: "title",
    preview: (doc) => {
      const slug = doc?.slug === "home" ? "" : (doc?.slug as string) || "";
      return `${process.env.NEXT_PUBLIC_SERVER_URL || "https://arvishhafoundation.org"}/${slug}`;
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "Internal page title used for identification and default page headings.",
      },
    },
    {
      name: "publishedOn",
      type: "date",
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
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "layout",
              type: "blocks",
              label: "Page Layout & Content Blocks",
              blocks: [
                HeroBlock,
                ContentBlock,
                ImpactStatsBlock,
                FocusAreasBlock,
                MissionVisionBlock,
                ProjectsBlock,
                TestimonialsBlock,
                ProcessBlock,
                CTABlock,
                FAQBlock,
                NewsBlock,
                ContactBlock,
                ContactPageBlock,
                MediaBlock,
                FormBlock,
                TeamBlock,
                PartnersBlock,
                ValuesBlock,
                DonateTiersBlock,
                StoryBlock,
                TransparencyBlock,
                VolunteerBlock,
                CorporatePartnershipBlock,
                PillarsBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
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
    afterChange: [revalidatePage],
    afterDelete: [revalidateDeletePage],
  },
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 20,
  },
};