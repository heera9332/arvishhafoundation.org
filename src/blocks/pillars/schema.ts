import type { Block } from "payload";

export const PillarsBlock: Block = {
  slug: "pillars",
  interfaceName: "PillarsBlock",
  labels: {
    singular: "Intervention Pillars Section (What We Do)",
    plural: "Intervention Pillars Sections (What We Do)",
  },
  fields: [
    {
      name: "items",
      type: "array",
      label: "Intervention Pillars",
      defaultValue: [
        {
          id: "education",
          title: "Education & Youth Development",
          heading: "Igniting Curiosity, Expanding Capabilities",
          description:
            "We believe education is the most powerful catalyst for breaking cycles of poverty. Our educational interventions focus on holistic student success, foundational literacy, and digital preparedness.",
          imageUrl:
            "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
          initiatives: [
            {
              title: "Community Learning Centers (CLC)",
              desc: "After-school centers offering remedial tutoring, homework support, and reading circles for children in under-resourced schools.",
            },
            {
              title: "Digital Literacy & STEM Exposure",
              desc: "Interactive computer labs and practical science experiment kits introducing modern technologies to rural youth.",
            },
          ],
        },
        {
          id: "women",
          title: "Women Empowerment & Livelihoods",
          heading: "Fostering Financial Autonomy & Grassroots Leadership",
          description:
            "When women earn and lead, households experience better nutrition, higher school attendance for children, and improved community health. We invest directly in women's collective power.",
          imageUrl:
            "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80",
          initiatives: [
            {
              title: "Micro-Enterprise Skill Labs",
              desc: "Hands-on vocational courses in tailoring, organic food processing, handicrafts, and sustainable packaging.",
            },
            {
              title: "Financial Literacy & Bank Linkage",
              desc: "Training on mobile banking, digital payments, government entitlement savings, and micro-credit management.",
            },
          ],
        },
        {
          id: "healthcare",
          title: "Healthcare & Community Wellbeing",
          heading: "Accessible, Compassionate Preventive Healthcare",
          description:
            "Health crises are one of the leading causes of financial ruin in vulnerable families. We prioritize preventive health checkups, maternal wellbeing, and sanitation awareness.",
          imageUrl:
            "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
          initiatives: [
            {
              title: "Rural Health & Diagnostic Camps",
              desc: "Periodic multi-specialty camps offering free primary checkups, eye tests, diagnostic screenings, and essential medicines.",
            },
            {
              title: "Menstrual Health & Dignity",
              desc: "Breaking taboos, distributing biodegradable sanitary kits, and running adolescent reproductive health workshops.",
            },
          ],
        },
        {
          id: "rural",
          title: "Rural Development & Civic Rights",
          heading:
            "Connecting Communities to Rights, Entitlements & Public Resources",
          description:
            "Marginalized families often miss out on crucial public welfare schemes due to documentation barriers or lack of awareness. We bridge this information deficit.",
          imageUrl:
            "https://images.unsplash.com/photo-1516738901171-8eb4fc13bd20?auto=format&fit=crop&w=800&q=80",
          initiatives: [
            {
              title: "Entitlement & Citizen Help Desks",
              desc: "Assisting citizens in obtaining ration cards, health cards, pension enrollments, and birth certificates.",
            },
            {
              title: "Clean Drinking Water & Village Sanitation",
              desc: "Community awareness drives promoting waste segregation, clean water storage, and drainage upkeep.",
            },
          ],
        },
      ],
      fields: [
        {
          name: "id",
          type: "text",
          label: "Pillar Anchor ID (e.g. education, women, healthcare, rural)",
        },
        {
          name: "title",
          type: "text",
          label: "Pillar Tag / Eyebrow (e.g. Education & Youth Development)",
          required: true,
        },
        {
          name: "heading",
          type: "text",
          label: "Pillar Heading",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          label: "Pillar Description",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          label: "Pillar Image (Media)",
        },
        {
          name: "imageUrl",
          type: "text",
          label: "Fallback Image URL",
        },
        {
          name: "initiatives",
          type: "array",
          label: "Key Initiatives",
          fields: [
            {
              name: "title",
              type: "text",
              label: "Initiative Title",
              required: true,
            },
            {
              name: "desc",
              type: "textarea",
              label: "Initiative Description",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "showCta",
      type: "checkbox",
      label: "Show Bottom CTA Banner",
      defaultValue: true,
    },
    {
      name: "ctaHeading",
      type: "text",
      label: "CTA Heading",
      defaultValue: "Help Us Expand These Programs To More Communities",
    },
    {
      name: "ctaDescription",
      type: "textarea",
      label: "CTA Description",
      defaultValue:
        "Every donation and volunteer hour directly strengthens our classrooms, medical checkup camps, and livelihood training programs.",
    },
    {
      name: "primaryCtaText",
      type: "text",
      label: "Primary CTA Button Text",
      defaultValue: "Donate Today",
    },
    {
      name: "primaryCtaLink",
      type: "text",
      label: "Primary CTA Link",
      defaultValue: "/donate",
    },
    {
      name: "secondaryCtaText",
      type: "text",
      label: "Secondary CTA Button Text",
      defaultValue: "Volunteer With Us",
    },
    {
      name: "secondaryCtaLink",
      type: "text",
      label: "Secondary CTA Link",
      defaultValue: "/get-involved",
    },
  ],
};

export default PillarsBlock;
