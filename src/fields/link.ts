import type { Field } from "payload";

export interface LinkFieldOptions {
  name?: string;
  label?: string;
  disableLabel?: boolean;
  required?: boolean;
  defaultValue?: string;
}

/**
 * Reusable Payload CMS link field configuration supporting:
 * - Custom / internal application paths (/about, /projects)
 * - External URLs (https://..., mailto:..., tel:...)
 * - Opening in a new tab
 * - Optional link label
 */
export function createLinkField(options: LinkFieldOptions = {}): Field {
  const {
    name = "link",
    label = "Link Destination",
    disableLabel = true,
    required = false,
    defaultValue = "/",
  } = options;

  return {
    name,
    type: "group",
    label,
    fields: [
      ...(!disableLabel
        ? [
            {
              name: "label",
              type: "text" as const,
              label: "Link Text / Label",
              required,
            },
          ]
        : []),
      {
        type: "row",
        fields: [
          {
            name: "type",
            type: "select" as const,
            label: "Link Type",
            defaultValue: "custom",
            options: [
              { label: "Internal / Custom Path", value: "custom" },
              { label: "External URL", value: "external" },
            ],
            admin: {
              width: "50%",
            },
          },
          {
            name: "newTab",
            type: "checkbox" as const,
            label: "Open in new tab",
            defaultValue: false,
            admin: {
              width: "50%",
              style: {
                alignSelf: "flex-end",
              },
            },
          },
        ],
      },
      {
        name: "url",
        type: "text",
        label: "URL / Path",
        required: true,
        defaultValue,
        admin: {
          placeholder: "/about or https://example.com",
        },
      },
    ],
  };
}
