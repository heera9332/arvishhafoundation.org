/**
 * Seed script for Posts (Projects & News)
 * Can be run via: node --env-file=.env.local scripts/seed-posts.mjs
 */

async function runSeed() {
  const port = process.env.PORT || 3000;
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || `http://localhost:${port}`;

  console.log(`[seed:posts] Attempting to seed posts via API: ${serverUrl}/api/seed-posts...`);
  try {
    const res = await fetch(`${serverUrl}/api/seed-posts`);
    if (res.ok) {
      const data = await res.json();
      console.log(`[seed:posts] Successfully seeded via Payload API:`, data);
      return;
    }
  } catch {
    console.log(`[seed:posts] Server not reachable at ${serverUrl}, falling back to direct database seed...`);
  }

  // Direct MongoDB fallback
  const { MongoClient } = await import(
    "./node_modules/.pnpm/mongodb@6.20.0/node_modules/mongodb/lib/index.js"
  );
  const client = new MongoClient(process.env.DATABASE_URL);
  await client.connect();
  const db = client.db();

  console.log("[seed:posts] Connected to MongoDB database.");

  const postsColl = db.collection("posts");
  const versionsColl = db.collection("_posts_versions");

  const projectPosts = [
    {
      title: "Project Shiksha: Community Learning Centers",
      slug: "project-shiksha",
      postType: "projects",
      categoryCustom: "Education",
      author: "Arvishha Foundation",
      publishedOn: new Date("2024-01-15T00:00:00.000Z"),
      excerpt:
        "Grassroots remedial education centers delivering daily literacy, numeracy, and life skills coaching to children from marginalized households.",
      shortDescription:
        "Grassroots remedial education centers delivering daily literacy, numeracy, and life skills coaching to children from marginalized households.",
      fullDescription:
        "Project Shiksha addresses high dropout rates and foundational learning deficits among first-generation schoolgoers. Operating daily after school hours, our trained local educators provide individual attention, interactive learning kits, and school curriculum reinforcement. Over 90% of enrolled students have improved basic reading and math competencies within six months.",
      location: "Peri-urban clusters & rural settlements",
      year: "2024–Present",
      status: "Active",
      beneficiaries: "350+ Children",
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      href: "/projects/project-shiksha",
      keyOutcomes: [
        { outcome: "Over 90% of enrolled students improved basic reading and math competencies within six months" },
        { outcome: "Daily after-school remedial learning and digital literacy coaching" },
        { outcome: "Over 350 children supported across marginalized household clusters" },
      ],
      generateSlug: false,
      _status: "published",
    },
    {
      title: "Project Swavalamban: Women Artisan Collective",
      slug: "project-swavalamban",
      postType: "projects",
      categoryCustom: "Empowerment",
      author: "Arvishha Foundation",
      publishedOn: new Date("2025-02-10T00:00:00.000Z"),
      excerpt:
        "Skill enhancement and economic market linkages enabling women home-makers to establish dignified micro-enterprises.",
      shortDescription:
        "Skill enhancement and economic market linkages enabling women home-makers to establish dignified micro-enterprises.",
      fullDescription:
        "Project Swavalamban organizes women into small self-help artisan clusters. We provide vocational training in eco-friendly textiles, jute accessories, and food packaging, coupled with essential financial literacy, bank account openings, and direct sales channel partnerships. Today, participating women contribute significantly to household income and education expenses.",
      location: "Haridwar & Delhi NCR",
      year: "2025–Present",
      status: "Active",
      beneficiaries: "120+ Women Artisans",
      imageUrl:
        "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80",
      href: "/projects/project-swavalamban",
      keyOutcomes: [
        { outcome: "Over 120 women trained in vocational crafts and dignified micro-enterprises" },
        { outcome: "Direct market and exhibition linkages with transparent digital revenue flow" },
        { outcome: "100% of participating artisans onboarded onto personal bank accounts" },
      ],
      generateSlug: false,
      _status: "published",
    },
    {
      title: "Arogya Chetna: Preventive Health & Hygiene Camps",
      slug: "project-arogya",
      postType: "projects",
      categoryCustom: "Healthcare",
      author: "Arvishha Foundation",
      publishedOn: new Date("2025-06-05T00:00:00.000Z"),
      excerpt:
        "Mobile medical checkups, anemia detection, diagnostic screenings, and menstrual health distribution across remote hamlets.",
      shortDescription:
        "Mobile medical checkups, anemia detection, diagnostic screenings, and menstrual health distribution across remote hamlets.",
      fullDescription:
        "Many remote families lack timely access to medical consultation, allowing treatable ailments to become life-threatening. Arogya Chetna partners with volunteer doctors and diagnostic technicians to bring healthcare directly to village doorsteps. We also organize dedicated adolescent girls' workshops on menstrual hygiene and distribute eco-friendly sanitary kits.",
      location: "Rural Hamlets",
      year: "2025–2026",
      status: "Ongoing",
      beneficiaries: "800+ Families",
      imageUrl:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      href: "/projects/project-arogya",
      keyOutcomes: [
        { outcome: "800+ families screened for chronic, nutritional, and preventable illnesses" },
        { outcome: "Free distribution of vital supplements, diagnostic tests, and adolescent hygiene kits" },
        { outcome: "Regular follow-up visits and tele-consultation support with partner clinics" },
      ],
      generateSlug: false,
      _status: "published",
    },
    {
      title: "Project Prakriti: Green Schools & Clean Neighborhoods",
      slug: "project-prakriti",
      postType: "projects",
      categoryCustom: "Environment",
      author: "Arvishha Foundation",
      publishedOn: new Date("2026-01-20T00:00:00.000Z"),
      excerpt:
        "Afforestation drives, organic waste composting, and clean drinking water awareness in village schools and common spaces.",
      shortDescription:
        "Afforestation drives, organic waste composting, and clean drinking water awareness in village schools and common spaces.",
      fullDescription:
        "Environmental stewardship starts with community ownership. Project Prakriti engages school students and youth clubs in native tree plantations, rainwater conservation awareness, and zero-plastic campaigns. We also install bio-compost pits in community centers to demonstrate safe organic waste management.",
      location: "Semi-Rural Blocks",
      year: "2026",
      status: "Active",
      beneficiaries: "15 Village Schools",
      imageUrl:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      href: "/projects/project-prakriti",
      keyOutcomes: [
        { outcome: "Native tree plantations and green corridors established in 15 village schools" },
        { outcome: "Zero-plastic drives and bio-compost demonstration pits in community hubs" },
        { outcome: "Clean water safety testing and student eco-club leadership training" },
      ],
      generateSlug: false,
      _status: "published",
    },
  ];

  const newsPosts = [
    {
      title: "Opening New Community Learning Centers in Underserved Blocks",
      slug: "opening-new-community-learning-center",
      postType: "news",
      categoryCustom: "Education",
      author: "Arvishha Field Team",
      readTime: "4 min read",
      publishedOn: new Date("2026-10-01T00:00:00.000Z"),
      excerpt:
        "How community-led learning spaces are bridging foundational numeracy and literacy gaps for first-generation schoolgoers.",
      imageUrl:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      href: "/news/opening-new-community-learning-center",
      generateSlug: false,
      _status: "published",
    },
    {
      title: "Empowering Rural Women Through Digital Financial Literacy",
      slug: "women-empowerment-through-digital-financial-skills",
      postType: "news",
      categoryCustom: "Women Empowerment",
      author: "Programs Coordinator",
      readTime: "5 min read",
      publishedOn: new Date("2026-09-15T00:00:00.000Z"),
      excerpt:
        "Breaking financial isolation: How smartphone banking workshops helped 40 women artisans gain autonomy over their earnings.",
      imageUrl:
        "https://images.unsplash.com/photo-1708593337380-6f97a307696f?auto=format&fit=crop&w=800&q=80",
      href: "/news/women-empowerment-through-digital-financial-skills",
      generateSlug: false,
      _status: "published",
    },
    {
      title: "Bringing Preventive Healthcare & Anemia Care to Remote Hamlets",
      slug: "preventive-healthcare-reaches-remote-hamlets",
      postType: "news",
      categoryCustom: "Healthcare",
      author: "Health Outreach Team",
      readTime: "3 min read",
      publishedOn: new Date("2026-08-20T00:00:00.000Z"),
      excerpt:
        "Over 300 mothers and adolescent girls received vital health screenings and nutritional guidance at our recent medical camp.",
      imageUrl:
        "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
      href: "/news/preventive-healthcare-reaches-remote-hamlets",
      generateSlug: false,
      _status: "published",
    },
  ];

  const allPosts = [...projectPosts, ...newsPosts];

  for (const post of allPosts) {
    const now = new Date();
    const updateResult = await postsColl.findOneAndUpdate(
      { slug: post.slug },
      {
        $set: {
          ...post,
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    const doc = updateResult;
    if (doc) {
      await versionsColl.updateMany({ parent: doc._id }, { $set: { latest: false } });
      await versionsColl.insertOne({
        parent: doc._id,
        version: {
          ...doc,
        },
        latest: true,
        autosave: false,
        createdAt: now,
        updatedAt: now,
        __v: 0,
      });
      console.log(`[seed:posts] Seeded post and version: ${post.slug} (${post.postType})`);
    }
  }

  console.log(`[seed:posts] Successfully seeded ${allPosts.length} posts!`);
  await client.close();
}

runSeed().catch((err) => {
  console.error("[seed:posts] Failed to seed posts:", err);
  process.exit(1);
});
