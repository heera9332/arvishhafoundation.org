import type { ContactInfo, FAQItem } from "@/types/site";
import { CONTACT_DETAILS, CONTACT_PERSON, SOCIAL_LINKS } from "@/constants";

export const contactData = {
  hero: {
    eyebrow: "Contact Us",
    heading: "Start The Dialogue. We're Listening.",
    description:
      "Have inquiries about our programs, wish to explore partnership avenues, or want to visit a project site? Reach out to our team today.",
  },
  info: {
    name: CONTACT_PERSON.name,
    firstName: CONTACT_PERSON.firstName,
    lastName: CONTACT_PERSON.lastName,
    phone: CONTACT_DETAILS.phone,
    phoneAlt: CONTACT_DETAILS.phoneAlt,
    email: CONTACT_DETAILS.email,
    emailAlt: CONTACT_DETAILS.emailAlt,
    socialLinks: [...SOCIAL_LINKS],
    registrationNumber: "NGO-REG-2024-9842",
    darpanId: "DL/2024/039821",
    taxExemption: "Eligible under applicable Non-Profit Tax Codes",
  } as ContactInfo,
  faq: [
    {
      id: "cf-1",
      question: "Where are Arvishha Foundation's active field programs located?",
      answer:
        "We operate field initiatives across peri-urban settlements and rural clusters, focusing on areas with significant gaps in educational and healthcare access.",
    },
    {
      id: "cf-2",
      question: "Can I visit a project site before deciding to donate or volunteer?",
      answer:
        "Yes, we organize planned community visits for prospective partners and volunteers. Please submit the contact form with your preferred dates.",
    },
    {
      id: "cf-3",
      question: "How quickly does the team respond to queries?",
      answer:
        "Our core coordination team responds within 24 to 48 business hours to all emails and website inquiries.",
    },
  ] as FAQItem[],
};
