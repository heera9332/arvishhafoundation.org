import type { ProjectItem } from "@/types/site";

export const projectsData = {
  hero: {
    eyebrow: "Our Projects",
    heading: "Action on the Ground: Programs Making Real Impact",
    description:
      "Every project undertaken by Arvishha Foundation is built on partnerships with communities, rigorous local planning, and measurable outcomes.",
  },
  projects: [
    {
      id: "project-shiksha",
      title: "Project Shiksha: Community Learning Centers",
      slug: "project-shiksha",
      category: "Education",
      shortDescription:
        "Grassroots remedial education centers delivering daily literacy, numeracy, and life skills coaching to children from marginalized households.",
      fullDescription:
        "Project Shiksha addresses high dropout rates and foundational learning deficits among first-generation schoolgoers. Operating daily after school hours, our trained local educators provide individual attention, interactive learning kits, and school curriculum reinforcement. Over 90% of enrolled students have improved basic reading and math competencies within six months.",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      location: "Peri-urban clusters & rural settlements",
      year: "2024–Present",
      status: "Active",
      beneficiaries: "350+ Children",
      href: "/projects/project-shiksha",
    },
    {
      id: "project-swavalamban",
      title: "Project Swavalamban: Women Artisan Collective",
      slug: "project-swavalamban",
      category: "Empowerment",
      shortDescription:
        "Skill enhancement and economic market linkages enabling women home-makers to establish dignified micro-enterprises.",
      fullDescription:
        "Project Swavalamban organizes women into small self-help artisan clusters. We provide vocational training in eco-friendly textiles, jute accessories, and food packaging, coupled with essential financial literacy, bank account openings, and direct sales channel partnerships. Today, participating women contribute significantly to household income and education expenses.",
      image:
        "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=800&q=80",
      location: "Haridwar & Delhi NCR",
      year: "2025–Present",
      status: "Active",
      beneficiaries: "120+ Women Artisans",
      href: "/projects/project-swavalamban",
    },
    {
      id: "project-arogya",
      title: "Arogya Chetna: Preventive Health & Hygiene Camps",
      slug: "project-arogya",
      category: "Healthcare",
      shortDescription:
        "Mobile medical checkups, anemia detection, diagnostic screenings, and menstrual health distribution across remote hamlets.",
      fullDescription:
        "Many remote families lack timely access to medical consultation, allowing treatable ailments to become life-threatening. Arogya Chetna partners with volunteer doctors and diagnostic technicians to bring healthcare directly to village doorsteps. We also organize dedicated adolescent girls' workshops on menstrual hygiene and distribute eco-friendly sanitary kits.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
      location: "Rural Hamlets",
      year: "2025–2026",
      status: "Ongoing",
      beneficiaries: "800+ Families",
      href: "/projects/project-arogya",
    },
    {
      id: "project-prakriti",
      title: "Project Prakriti: Green Schools & Clean Neighborhoods",
      slug: "project-prakriti",
      category: "Environment",
      shortDescription:
        "Afforestation drives, organic waste composting, and clean drinking water awareness in village schools and common spaces.",
      fullDescription:
        "Environmental stewardship starts with community ownership. Project Prakriti engages school students and youth clubs in native tree plantations, rainwater conservation awareness, and zero-plastic campaigns. We also install bio-compost pits in community centers to demonstrate safe organic waste management.",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
      location: "Semi-Rural Blocks",
      year: "2026",
      status: "Active",
      beneficiaries: "15 Village Schools",
      href: "/projects/project-prakriti",
    },
  ] as ProjectItem[],
};
