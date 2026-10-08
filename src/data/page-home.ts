import type {
  FocusAreaItem,
  StatItem,
  TabContent,
  ProjectItem,
  TestimonialItem,
  ApproachStepItem,
  FAQItem,
  ArticleItem,
  ContactInfo,
} from "@/types/site";
import { CONTACT_DETAILS, CONTACT_PERSON, SOCIAL_LINKS } from "@/constants";

export const homeData = {
  hero: {
    eyebrow: "Development. Dignity. Social Change.",
    heading: "Arvishha Foundation",
    subheading:
      "Building stronger communities through education, empowerment, rights awareness, health, and sustainable development.",
    description:
      "At Arvishha Foundation, we believe meaningful change begins when people have the knowledge, opportunities, support, and confidence to shape a better future. We work with communities to create opportunities for children, young people, women, and families while promoting social justice, civic participation, healthy living, and environmental responsibility.",
    primaryCta: {
      label: "Explore Our Work",
      href: "/what-we-do",
    },
    secondaryCta: {
      label: "Get Involved",
      href: "/get-involved",
    },
    proofBadge: {
      count: "500+",
      text: "community members reached & empowered across grassroots initiatives",
    },
    image: {
      src: "https://media.arvishhafoundation.org/wp-content/uploads/2026/01/hero-community.jpg",
      fallback:
        "https://images.unsplash.com/photo-1604087267213-40e35f1719a3?auto=format&fit=crop&w=1200&q=80",
      alt: "Community members collaborating at Arvishha Foundation initiative",
    },
    features: [
      {
        id: "feat-1",
        title: "Education & Youth Empowerment",
        description:
          "Creating opportunities for young minds to learn, grow, and build an independent, brighter future.",
        icon: "GraduationCap",
      },
      {
        id: "feat-2",
        title: "Women & Community Empowerment",
        description:
          "Empowering women and grassroots communities with awareness, skill training, and livelihood avenues.",
        icon: "TrendingUp",
      },
      {
        id: "feat-3",
        title: "Health, Rights & Sustainable Living",
        description:
          "Promoting preventive healthcare, equal legal awareness, and clean, green community habitats.",
        icon: "HeartPulse",
      },
    ],
  },

  impactStats: {
    eyebrow: "Our Collective Footprint",
    heading: "Measurable Impact Where It Matters Most",
    description:
      "Every statistic represents a child returning to school, a woman securing financial independence, or a village gaining awareness on basic rights.",
    stats: [
      {
        id: "stat-1",
        value: "500+",
        label: "Community Members Reached",
        sublabel: "Across rural & peri-urban clusters",
        icon: "Users",
      },
      {
        id: "stat-2",
        value: "25+",
        label: "Community Initiatives",
        sublabel: "Active grassroots workshops & campaigns",
        icon: "HandHeart",
      },
      {
        id: "stat-3",
        value: "10+",
        label: "Active Programs",
        sublabel: "Sustained educational & vocational cohorts",
        icon: "BookOpen",
      },
      {
        id: "stat-4",
        value: "5+",
        label: "Focus Areas",
        sublabel: "Education, health, rights, women, environment",
        icon: "Target",
      },
    ] as StatItem[],
  },

  focusAreas: {
    eyebrow: "Our Focus Areas",
    heading: "Building Stronger Communities Through Meaningful Social Action",
    subheading:
      "Targeted, community-first interventions designed to solve deep-rooted inequalities and create sustainable, multi-generational change.",
    viewAllCta: {
      label: "See What We Do",
      href: "/what-we-do",
    },
    items: [
      {
        id: "fa-1",
        title: "Education & Youth Development",
        slug: "education-youth",
        description:
          "Education can open doors that once seemed impossible. We provide foundational learning support, digital literacy, and youth mentoring.",
        iconName: "GraduationCap",
        image:
          "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
        href: "/what-we-do#education",
        keyOutcomes: [
          "Remedial learning support for underprivileged students",
          "Digital skills & career guidance workshops",
          "Scholarship guidance and school retention drives",
        ],
      },
      {
        id: "fa-2",
        title: "Women Empowerment",
        slug: "women-empowerment",
        description:
          "When women have access to opportunities, knowledge, resources, and solidarity, entire families and neighborhoods prosper.",
        iconName: "Sparkles",
        image:
          "https://images.unsplash.com/photo-1708593337380-6f97a307696f?auto=format&fit=crop&w=800&q=80",
        href: "/what-we-do#women",
        keyOutcomes: [
          "Micro-enterprise & vocational handicraft training",
          "Financial literacy and bank linkage support",
          "Self-help group leadership facilitation",
        ],
      },
      {
        id: "fa-3",
        title: "Child Welfare & Rights",
        slug: "child-welfare",
        description:
          "Every child deserves safety, dignity, education, nutrition, and an environment free from exploitation and neglect.",
        iconName: "ShieldCheck",
        image:
          "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
        href: "/what-we-do#child-welfare",
        keyOutcomes: [
          "Child rights awareness sessions in local schools",
          "Nutrition support drives for growing children",
          "Safe space recreational and creative clubs",
        ],
      },
      {
        id: "fa-4",
        title: "Healthcare & Wellbeing",
        slug: "healthcare-wellbeing",
        description:
          "Ensuring preventive healthcare awareness, menstrual health education, and medical checkup camps reach underserved families.",
        iconName: "HeartPulse",
        image:
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        href: "/what-we-do#healthcare",
        keyOutcomes: [
          "Free health diagnostics and eye-checkup camps",
          "Menstrual hygiene awareness & eco-friendly kits",
          "Mental health & wellness listening circles",
        ],
      },
      {
        id: "fa-5",
        title: "Rural Development",
        slug: "rural-development",
        description:
          "Development should reach every community. We work directly with rural hamlets to improve infrastructure awareness and public access.",
        iconName: "Building2",
        image:
          "https://images.unsplash.com/photo-1633410195091-bd66114cef5f?auto=format&fit=crop&w=800&q=80",
        href: "/what-we-do#rural",
        keyOutcomes: [
          "Government scheme entitlement camps",
          "Village sanitation and drinking water advocacy",
          "Rural youth livelihood skill readiness",
        ],
      },
      {
        id: "fa-6",
        title: "Environmental Sustainability",
        slug: "environmental-sustainability",
        description:
          "Fostering ecological balance through community tree plantations, waste management education, and water conservation practices.",
        iconName: "Leaf",
        image:
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
        href: "/what-we-do#environment",
        keyOutcomes: [
          "Community sapling plantation drives",
          "Clean neighborhood and zero-single-use-plastic drives",
          "Rainwater harvesting awareness sessions",
        ],
      },
    ] as FocusAreaItem[],
  },

  missionApproach: {
    leftVisual: {
      image:
        "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=80",
      alt: "Community members in a workshop session",
      badge: "Creating Change Where It Matters Most",
      subtext:
        "Every community has its own challenges, strengths, and dreams. Our work focuses on understanding these realities and supporting practical solutions that can create lasting social change.",
      bulletPoints: [
        "From helping children access better education to empowering women.",
        "Supporting rural communities, promoting health, and protecting the environment.",
        "Spreading awareness about fundamental rights and civic responsibilities.",
      ],
    },
    eyebrow: "Our Approach Is Simple",
    heading: "Listen. Support. Empower. Create Lasting Change.",
    description:
      "We listen to communities, support their needs, empower people with opportunities, and create lasting change through meaningful action and collective effort.",
    tabs: [
      {
        id: "vision",
        title: "Vision",
        heading: "An Inclusive Society Founded on Equal Human Dignity",
        description:
          "To build an inclusive and empowered society where every individual has access to education, opportunities, dignity, equal rights, healthy living, and the confidence to contribute positively to their community.",
        points: [
          "Equal access to quality education regardless of economic background",
          "Universal dignity, self-reliance, and gender equality",
          "Grassroots leadership rooted in empathy and constitutional values",
        ],
      },
      {
        id: "mission",
        title: "Mission",
        heading: "Grassroots Action Driven by Community Need",
        description:
          "To work alongside vulnerable communities through education, grassroots advocacy, healthcare support, and sustainable livelihoods, fostering long-term resilience and self-reliance.",
        points: [
          "Listen directly to community voices before formulating programs",
          "Deliver transparent, accountable, and measurable grassroots projects",
          "Collaborate with civil society, educators, and volunteers",
        ],
      },
      {
        id: "goals",
        title: "Goals",
        heading: "Concrete Milestones for 2026–2030",
        description:
          "Drive measurable social change across education, healthcare, and livelihood sectors; expand community learning centers; foster youth leadership; and build sustainable support networks.",
        points: [
          "Establish 15 community learning & literacy hubs",
          "Train 2,000+ women in micro-entrepreneurship and digital tools",
          "Conduct 100+ health diagnostics & awareness camps across remote hamlets",
        ],
      },
    ] as TabContent[],
  },

  impactDark: {
    eyebrow: "Measurable Impact & Transparency",
    heading: "Empowering People. Strengthening Communities.",
    description:
      "We believe social change should be tangible, accountable, and grounded in the real lived experience of families. Here is how our work translates into lasting results.",
    stats: [
      {
        id: "stat-a",
        value: "92%",
        label: "School Retention Rate",
        sublabel: "Among students mentored in our remedial hubs",
      },
      {
        id: "stat-b",
        value: "10+",
        label: "Women Micro-Learners",
        sublabel: "Equipped with financial & livelihood skills",
      },
      {
        id: "stat-c",
        value: "10+",
        label: "Health Checkups Facilitated",
        sublabel: "Through regular community health camps",
      },
      {
        id: "stat-d",
        value: "100%",
        label: "Grassroots Centered",
        sublabel: "Programs co-designed with community representatives",
      },
    ],
    features: [
      {
        title: "Grassroots-First Implementation",
        description:
          "We never impose solutions from outside. Every program begins with community dialogue and local leadership.",
      },
      {
        title: "Rigorous Financial Accountability",
        description:
          "Every contribution is tracked and deployed directly into community initiatives with clear annual auditing.",
      },
      {
        title: "Long-Term Sustainability",
        description:
          "We design programs that equip local youth and women to sustain initiatives independently over time.",
      },
    ],
  },

  projects: {
    eyebrow: "Our Projects & Initiatives",
    heading: "Transforming Lives Through Dedicated Programs",
    subheading:
      "Explore ongoing and recent initiatives carried out across communities in education, healthcare, and livelihood development.",
    items: [
      {
        id: "proj-1",
        title: "Project Shiksha: Community Learning Centers",
        slug: "project-shiksha-learning-centers",
        category: "Education",
        shortDescription:
          "After-school learning support, digital literacy classes, and textbook distribution for children in underserved settlements.",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        location: "Delhi NCR & Rural Haridwar",
        year: "2024–Present",
        status: "Active",
        beneficiaries: "350+ Students",
        href: "/projects#project-shiksha",
      },
      {
        id: "proj-2",
        title: "Swavalamban: Women Livelihood Cohort",
        slug: "swavalamban-women-livelihood",
        category: "Empowerment",
        shortDescription:
          "Vocational skill training, digital payment onboarding, and micro-business incubation for women artisans.",
        image:
          "https://images.unsplash.com/photo-1708593337380-6f97a307696f?auto=format&fit=crop&w=800&q=80",
        location: "Community Centers",
        year: "2025–Present",
        status: "Active",
        beneficiaries: "120+ Women",
        href: "/projects#project-swavalamban",
      },
      {
        id: "proj-3",
        title: "Arogya Chetna: Preventive Health & Hygiene Camps",
        slug: "arogya-chetna-health-camps",
        category: "Healthcare",
        shortDescription:
          "Comprehensive health screenings, anemia detection, menstrual hygiene awareness, and medicine distribution.",
        image:
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        location: "Rural Hamlets",
        year: "2025–2026",
        status: "Ongoing",
        beneficiaries: "800+ Families",
        href: "/projects#project-arogya",
      },
      {
        id: "proj-4",
        title: "Prakriti: Green Schools & Clean Hamlets",
        slug: "prakriti-green-communities",
        category: "Environment",
        shortDescription:
          "Community tree plantations, organic waste composting, and safe drinking water testing kits for rural schools.",
        image:
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
        location: "Semi-Rural Blocks",
        year: "2026",
        status: "Active",
        beneficiaries: "15 Villages",
        href: "/projects#project-prakriti",
      },
    ] as ProjectItem[],
  },

  testimonials: {
    eyebrow: "Voices From Our Community",
    heading: "Stories of Hope, Dignity & Transformation",
    subheading:
      "Hear from the people whose determination and partnership give life to our mission every single day.",
    items: [
      {
        id: "test-1",
        name: "Sunita Devi",
        role: "Self-Help Group Leader & Artisan",
        location: "Rural Cluster",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
        quote:
          "Before the foundation came to our village, our handicraft work had no market access. Today, 18 women in our group manage our own bank accounts, earn an independent income, and support our daughters' schooling.",
        initiative: "Women Empowerment Program",
      },
      {
        id: "test-2",
        name: "Ramesh Kumar",
        role: "Youth Volunteer & College Student",
        location: "Community Center",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        quote:
          "Volunteering with Project Shiksha changed the way I see my own neighborhood. Teaching children who couldn't read basic words and watching them read their first storybook is the greatest feeling.",
        initiative: "Project Shiksha",
      },
      {
        id: "test-3",
        name: "Pooja Sharma",
        role: "Mother of 2 Schoolgoers",
        location: "Peri-Urban Settlement",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        quote:
          "The free medical checkup camp detected severe anemia in my 9-year-old daughter. The foundation provided iron supplements, dietary counseling, and regular follow-ups. Her energy and grades have completely recovered.",
        initiative: "Arogya Chetna Camp",
      },
    ] as TestimonialItem[],
  },

  approach: {
    eyebrow: "How We Work",
    heading: "Our Approach: 4 Steps to Sustainable Change",
    subheading:
      "We follow a disciplined, people-first methodology that ensures every program creates real, lasting results without creating dependency.",
    steps: [
      {
        step: "01",
        title: "Understand",
        description:
          "We spend time inside communities, holding open dialogue sessions to listen to local priorities, cultural contexts, and real bottlenecks.",
        iconName: "Ear",
      },
      {
        step: "02",
        title: "Plan",
        description:
          "Together with village elders, youth groups, and women's circles, we co-design targeted interventions with clear metrics and milestones.",
        iconName: "FileSpreadsheet",
      },
      {
        step: "03",
        title: "Implement",
        description:
          "Our ground coordinators, volunteers, and local champions roll out the activities with transparent resource allocation and daily support.",
        iconName: "Hammer",
      },
      {
        step: "04",
        title: "Measure",
        description:
          "We track measurable outcomes—literacy gains, health screenings, livelihood income—and iterate to build long-term self-sufficiency.",
        iconName: "BarChart3",
      },
    ] as ApproachStepItem[],
  },

  cta: {
    heading: "Together, We Can Create Lasting Change.",
    subheading:
      "Whether through financial support, sharing your skills as a volunteer, or partnering your organization with our grassroots initiatives, your involvement makes a tangible difference.",
    primaryCta: {
      label: "Support Our Work",
      href: "/donate",
    },
    secondaryCta: {
      label: "Become a Volunteer",
      href: "/get-involved#volunteer",
    },
  },

  faq: {
    eyebrow: "Frequently Asked Questions",
    heading: "Everything You Need To Know About Arvishha Foundation",
    subheading:
      "Clear answers regarding our mission, funding utilization, volunteer opportunities, and governance.",
    items: [
      {
        id: "faq-1",
        question: "What is the mission of Arvishha Foundation?",
        answer:
          "Arvishha Foundation is a non-governmental organization committed to human development, dignity, and sustainable social change. We work primarily in education, women empowerment, child welfare, preventive healthcare, rights awareness, and environmental protection.",
      },
      {
        id: "faq-2",
        question: "How are donor contributions utilized?",
        answer:
          "Every donation is allocated directly toward grassroots program execution—including educational materials, teachers' honorariums, healthcare camps, vocational equipment, and community workshops. We maintain transparent financial audits and publish periodic project reports.",
      },
      {
        id: "faq-3",
        question: "How can I volunteer with Arvishha Foundation?",
        answer:
          "We welcome volunteers from all backgrounds! Whether you can teach children on weekends, help organize medical checkups, contribute digital/creative skills, or assist in field logistics, you can sign up via our Get Involved page or contact form.",
      },
      {
        id: "faq-4",
        question: "Is Arvishha Foundation registered as a recognized non-profit?",
        answer:
          "Yes, Arvishha Foundation is registered under applicable non-profit laws. We comply with statutory reporting, annual disclosures, and ethical governance standards.",
      },
      {
        id: "faq-5",
        question: "Can corporations or institutions partner with Arvishha Foundation for CSR?",
        answer:
          "Absolutely. We collaborate with CSR teams, academic institutions, and citizen forums to implement high-impact, compliant social initiatives with full monitoring and documentation.",
      },
    ] as FAQItem[],
  },

  news: {
    eyebrow: "Latest Updates & Stories",
    heading: "Articles That Inspire Action & Innovation",
    subheading:
      "Read our latest field reports, community achievements, and perspectives on grassroots social change.",
    viewAllCta: {
      label: "View All Articles",
      href: "/news",
    },
    staticArticles: [
      {
        id: "art-1",
        slug: "opening-new-community-learning-center",
        title: "Opening New Community Learning Centers in Underserved Blocks",
        excerpt:
          "How community-led learning spaces are bridging foundational numeracy and literacy gaps for first-generation schoolgoers.",
        image:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
        date: "October 2026",
        category: "Education",
        author: "Arvishha Field Team",
        readTime: "4 min read",
      },
      {
        id: "art-2",
        slug: "women-empowerment-through-digital-financial-skills",
        title: "Empowering Rural Women Through Digital Financial Literacy",
        excerpt:
          "Breaking financial isolation: How smartphone banking workshops helped 40 women artisans gain autonomy over their earnings.",
        image:
          "https://images.unsplash.com/photo-1708593337380-6f97a307696f?auto=format&fit=crop&w=800&q=80",
        date: "September 2026",
        category: "Women Empowerment",
        author: "Programs Coordinator",
        readTime: "5 min read",
      },
      {
        id: "art-3",
        slug: "preventive-healthcare-reaches-remote-hamlets",
        title: "Bringing Preventive Healthcare & Anemia Care to Remote Hamlets",
        excerpt:
          "Over 300 mothers and adolescent girls received vital health screenings and nutritional guidance at our recent medical camp.",
        image:
          "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
        date: "August 2026",
        category: "Healthcare",
        author: "Health Outreach Team",
        readTime: "3 min read",
      },
    ] as ArticleItem[],
  },

  contact: {
    eyebrow: "Get In Touch",
    heading: "Start The Dialogue. We're Listening.",
    subheading:
      "Have questions, ideas for collaboration, or want to support our community programs? Reach out to us directly.",
    info: {
      name: CONTACT_PERSON.name,
      firstName: CONTACT_PERSON.firstName,
      lastName: CONTACT_PERSON.lastName,
      phone: CONTACT_DETAILS.phone,
      phoneAlt: CONTACT_DETAILS.phoneAlt,
      email: CONTACT_DETAILS.email,
      emailAlt: CONTACT_DETAILS.emailAlt,
      socialLinks: [...SOCIAL_LINKS],
    } as ContactInfo,
  },
};
