import type { Payload } from "payload";
import { projectsData } from "@/data/page-projects";
import { homeData } from "@/data/page-home";

function createLexicalContent(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
}

export const staticProjectPosts = [
  {
    title: "Project Shiksha: Community Learning Centers",
    slug: "project-shiksha",
    postType: "projects" as const,
    categoryCustom: "Education",
    author: "Arvishha Foundation",
    publishedOn: "2024-01-15T00:00:00.000Z",
    excerpt:
      "Grassroots remedial education centers delivering daily literacy, numeracy, and life skills coaching to children from marginalized households.",
    shortDescription:
      "Grassroots remedial education centers delivering daily literacy, numeracy, and life skills coaching to children from marginalized households.",
    fullDescription:
      "Project Shiksha addresses high dropout rates and foundational learning deficits among first-generation schoolgoers. Operating daily after school hours, our trained local educators provide individual attention, interactive learning kits, and school curriculum reinforcement. Over 90% of enrolled students have improved basic reading and math competencies within six months.",
    location: "Peri-urban clusters & rural settlements",
    year: "2024–Present",
    status: "Active" as const,
    beneficiaries: "350+ Children",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    href: "/projects/project-shiksha",
    keyOutcomes: [
      { outcome: "Over 90% of enrolled students improved basic reading and math competencies within six months" },
      { outcome: "Daily after-school remedial learning and digital literacy coaching" },
      { outcome: "Over 350 children supported across marginalized household clusters" },
    ],
    content: createLexicalContent([
      "Project Shiksha addresses high dropout rates and foundational learning deficits among first-generation schoolgoers. Operating daily after school hours, our trained local educators provide individual attention, interactive learning kits, and school curriculum reinforcement.",
      "Over 90% of enrolled students have improved basic reading and math competencies within six months. Our centers also emphasize digital literacy, introducing children to educational technology and safe internet practices.",
      "By partnering closely with parents and local government schools, Project Shiksha creates an enduring support ecosystem where every child is encouraged to stay in school and achieve their full potential.",
    ]),
    _status: "published" as const,
  },
  {
    title: "Project Swavalamban: Women Artisan Collective",
    slug: "project-swavalamban",
    postType: "projects" as const,
    categoryCustom: "Empowerment",
    author: "Arvishha Foundation",
    publishedOn: "2025-02-10T00:00:00.000Z",
    excerpt:
      "Skill enhancement and economic market linkages enabling women home-makers to establish dignified micro-enterprises.",
    shortDescription:
      "Skill enhancement and economic market linkages enabling women home-makers to establish dignified micro-enterprises.",
    fullDescription:
      "Project Swavalamban organizes women into small self-help artisan clusters. We provide vocational training in eco-friendly textiles, jute accessories, and food packaging, coupled with essential financial literacy, bank account openings, and direct sales channel partnerships. Today, participating women contribute significantly to household income and education expenses.",
    location: "Haridwar & Delhi NCR",
    year: "2025–Present",
    status: "Active" as const,
    beneficiaries: "120+ Women Artisans",
    imageUrl:
      "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80",
    href: "/projects/project-swavalamban",
    keyOutcomes: [
      { outcome: "Over 120 women trained in vocational crafts and dignified micro-enterprises" },
      { outcome: "Direct market and exhibition linkages with transparent digital revenue flow" },
      { outcome: "100% of participating artisans onboarded onto personal bank accounts" },
    ],
    content: createLexicalContent([
      "Project Swavalamban organizes women into small self-help artisan clusters. We provide vocational training in eco-friendly textiles, jute accessories, and food packaging, coupled with essential financial literacy, bank account openings, and direct sales channel partnerships.",
      "Today, participating women contribute significantly to household income and education expenses. Through structured mentorship, they learn pricing, inventory management, and digital UPI payments.",
      "Our goal is to expand the artisan network to 500+ women, building community-owned cooperatives that guarantee sustained income, dignity, and independence.",
    ]),
    _status: "published" as const,
  },
  {
    title: "Arogya Chetna: Preventive Health & Hygiene Camps",
    slug: "project-arogya",
    postType: "projects" as const,
    categoryCustom: "Healthcare",
    author: "Arvishha Foundation",
    publishedOn: "2025-06-05T00:00:00.000Z",
    excerpt:
      "Mobile medical checkups, anemia detection, diagnostic screenings, and menstrual health distribution across remote hamlets.",
    shortDescription:
      "Mobile medical checkups, anemia detection, diagnostic screenings, and menstrual health distribution across remote hamlets.",
    fullDescription:
      "Many remote families lack timely access to medical consultation, allowing treatable ailments to become life-threatening. Arogya Chetna partners with volunteer doctors and diagnostic technicians to bring healthcare directly to village doorsteps. We also organize dedicated adolescent girls' workshops on menstrual hygiene and distribute eco-friendly sanitary kits.",
    location: "Rural Hamlets",
    year: "2025–2026",
    status: "Ongoing" as const,
    beneficiaries: "800+ Families",
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    href: "/projects/project-arogya",
    keyOutcomes: [
      { outcome: "800+ families screened for chronic, nutritional, and preventable illnesses" },
      { outcome: "Free distribution of vital supplements, diagnostic tests, and adolescent hygiene kits" },
      { outcome: "Regular follow-up visits and tele-consultation support with partner clinics" },
    ],
    content: createLexicalContent([
      "Many remote families lack timely access to medical consultation, allowing treatable ailments to become life-threatening. Arogya Chetna partners with volunteer doctors and diagnostic technicians to bring healthcare directly to village doorsteps.",
      "We also organize dedicated adolescent girls' workshops on menstrual hygiene and distribute eco-friendly sanitary kits, breaking long-standing taboos through open education.",
      "Regular health camps, anemia screening, and tele-health follow-ups ensure that rural communities receive continuous preventive care and life-saving health education.",
    ]),
    _status: "published" as const,
  },
  {
    title: "Project Prakriti: Green Schools & Clean Neighborhoods",
    slug: "project-prakriti",
    postType: "projects" as const,
    categoryCustom: "Environment",
    author: "Arvishha Foundation",
    publishedOn: "2026-01-20T00:00:00.000Z",
    excerpt:
      "Afforestation drives, organic waste composting, and clean drinking water awareness in village schools and common spaces.",
    shortDescription:
      "Afforestation drives, organic waste composting, and clean drinking water awareness in village schools and common spaces.",
    fullDescription:
      "Environmental stewardship starts with community ownership. Project Prakriti engages school students and youth clubs in native tree plantations, rainwater conservation awareness, and zero-plastic campaigns. We also install bio-compost pits in community centers to demonstrate safe organic waste management.",
    location: "Semi-Rural Blocks",
    year: "2026",
    status: "Active" as const,
    beneficiaries: "15 Village Schools",
    imageUrl:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
    href: "/projects/project-prakriti",
    keyOutcomes: [
      { outcome: "Native tree plantations and green corridors established in 15 village schools" },
      { outcome: "Zero-plastic drives and bio-compost demonstration pits in community hubs" },
      { outcome: "Clean water safety testing and student eco-club leadership training" },
    ],
    content: createLexicalContent([
      "Environmental stewardship starts with community ownership. Project Prakriti engages school students and youth clubs in native tree plantations, rainwater conservation awareness, and zero-plastic campaigns.",
      "We also install bio-compost pits in community centers to demonstrate safe organic waste management and sustainable agricultural practices.",
      "Through green eco-clubs, children learn hands-on ecological care, ensuring that conservation values become an integral part of community life.",
    ]),
    _status: "published" as const,
  },
];

export const staticNewsPosts = [
  {
    title: "Opening New Community Learning Centers in Underserved Blocks",
    slug: "opening-new-community-learning-center",
    postType: "news" as const,
    categoryCustom: "Education",
    author: "Arvishha Field Team",
    readTime: "4 min read",
    publishedOn: "2026-10-01T00:00:00.000Z",
    excerpt:
      "How community-led learning spaces are bridging foundational numeracy and literacy gaps for first-generation schoolgoers.",
    imageUrl:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    href: "/news/opening-new-community-learning-center",
    content: createLexicalContent([
      "How community-led learning spaces are bridging foundational numeracy and literacy gaps for first-generation schoolgoers.",
      "At Arvishha Foundation, our field programs are built on regular, on-the-ground engagement with rural and urban communities. Through dedicated dialogue sessions, local partnerships, and continuous monitoring, our teams strive to ensure every program delivers meaningful and sustainable outcomes.",
      "Education remains at the core of our interventions. When community members are equipped with knowledge, skills, and equal opportunity, entire generations thrive.",
      "We invite supporters, educators, and volunteers to partner with us as we expand these essential initiatives to more underserved areas across the region.",
    ]),
    _status: "published" as const,
  },
  {
    title: "Empowering Rural Women Through Digital Financial Literacy",
    slug: "women-empowerment-through-digital-financial-skills",
    postType: "news" as const,
    categoryCustom: "Women Empowerment",
    author: "Programs Coordinator",
    readTime: "5 min read",
    publishedOn: "2026-09-15T00:00:00.000Z",
    excerpt:
      "Breaking financial isolation: How smartphone banking workshops helped 40 women artisans gain autonomy over their earnings.",
    imageUrl:
      "https://images.unsplash.com/photo-1708593337380-6f97a307696f?auto=format&fit=crop&w=800&q=80",
    href: "/news/women-empowerment-through-digital-financial-skills",
    content: createLexicalContent([
      "Breaking financial isolation: How smartphone banking workshops helped 40 women artisans gain autonomy over their earnings.",
      "Financial inclusion is a cornerstone of women's empowerment. By teaching artisans how to use digital banking, track savings, and manage household budgets, we empower them to take control of their economic futures.",
      "The initiative has witnessed remarkable enthusiasm, with participants now confidently executing payments and accessing government welfare schemes independently.",
    ]),
    _status: "published" as const,
  },
  {
    title: "Bringing Preventive Healthcare & Anemia Care to Remote Hamlets",
    slug: "preventive-healthcare-reaches-remote-hamlets",
    postType: "news" as const,
    categoryCustom: "Healthcare",
    author: "Health Outreach Team",
    readTime: "3 min read",
    publishedOn: "2026-08-20T00:00:00.000Z",
    excerpt:
      "Over 300 mothers and adolescent girls received vital health screenings and nutritional guidance at our recent medical camp.",
    imageUrl:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    href: "/news/preventive-healthcare-reaches-remote-hamlets",
    content: createLexicalContent([
      "Over 300 mothers and adolescent girls received vital health screenings and nutritional guidance at our recent medical camp.",
      "Preventive healthcare access transforms rural livelihoods by preventing manageable health issues from escalating into severe burdens. Our mobile health team provided pediatric checkups, hemoglobin testing, and nutritional education.",
      "We extend our heartfelt gratitude to the medical volunteers and community leaders whose tireless dedication made this camp a resounding success.",
    ]),
    _status: "published" as const,
  },
];

export async function seedPosts(payload: Payload) {
  const allPostsToSeed = [...staticProjectPosts, ...staticNewsPosts];
  const results = {
    created: 0,
    updated: 0,
    errors: [] as string[],
    posts: [] as { slug: string; postType: string; action: string }[],
  };

  // 1. Clean up any invalid/draft docs without title/slug
  try {
    const draftsWithoutSlug = await payload.find({
      collection: "posts",
      where: {
        or: [
          { slug: { exists: false } },
          { title: { exists: false } },
        ],
      },
      overrideAccess: true,
      draft: false,
      limit: 50,
    });

    for (const draftDoc of draftsWithoutSlug.docs) {
      await payload.delete({
        collection: "posts",
        id: draftDoc.id,
        overrideAccess: true,
      });
    }
  } catch (err) {
    console.warn("[seedPosts] Cleanup warning:", err);
  }

  // 2. Upsert each project and news post
  for (const postData of allPostsToSeed) {
    try {
      const existing = await payload.find({
        collection: "posts",
        where: {
          or: [
            { slug: { equals: postData.slug } },
            { title: { equals: postData.title } },
          ],
        },
        overrideAccess: true,
        draft: false,
        limit: 1,
      });

      if (existing.docs.length > 0) {
        const docId = existing.docs[0].id;
        await payload.update({
          collection: "posts",
          id: docId,
          data: {
            ...postData,
            generateSlug: false,
            _status: "published",
          } as any,
          overrideAccess: true,
          draft: false,
        });
        results.updated++;
        results.posts.push({ slug: postData.slug, postType: postData.postType, action: "updated" });
      } else {
        await payload.create({
          collection: "posts",
          data: {
            ...postData,
            generateSlug: false,
            _status: "published",
          } as any,
          overrideAccess: true,
          draft: false,
        });
        results.created++;
        results.posts.push({ slug: postData.slug, postType: postData.postType, action: "created" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      results.errors.push(`Error on ${postData.slug}: ${msg}`);
      console.error(`[seedPosts] Error upserting post ${postData.slug}:`, err);
    }
  }

  return {
    success: results.errors.length === 0,
    ...results,
    total: results.created + results.updated,
  };
}
