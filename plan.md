# arvishhafoundation.org

You are a senior frontend engineer and UI/UX designer.

Build a modern, production-ready NGO website for:

https://arvishhafoundation.org/

The website is for Arvishha Foundation, an NGO focused on education, youth development, women empowerment, healthcare, rights awareness, community development, and sustainable social change.

## TECH STACK

- Next.js 16
- App Router
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
- Lucide React icons
- Server Components by default
- Client Components only when interactivity is required
- No unnecessary third-party UI libraries

IMPORTANT ARCHITECTURE

This is NOT a headless WordPress website.

Next.js is the primary frontend application.

WordPress is only used as an external service for:

1. Media/images
2. Form submissions
3. Optional WordPress REST API content where explicitly required

WordPress installation:
https://media.arvishhafoundation.org/

Images should be loaded directly from:

https://media.arvishhafoundation.org/wp-content/uploads/...

Do NOT download/copy WordPress images into the Next.js project.

Configure next/image remotePatterns correctly for:
media.arvishhafoundation.org

Forms should submit to WordPress through REST API endpoints.

For example:

POST https://media.arvishhafoundation.org/wp-json/...

Create a clean API abstraction so WordPress URLs/endpoints are not scattered throughout components.

Use environment variables where appropriate:

NEXT_PUBLIC_WORDPRESS_URL=https://media.arvishhafoundation.org

WORDPRESS_API_URL=...

Do not expose WordPress secrets or private API credentials to the browser.

CONTENT ARCHITECTURE

Most website content is STATIC and should NOT be stored in WordPress.

Static page data must live inside:

src/data/

For example:

src/data/page-home.ts
src/data/page-about.ts
src/data/page-our-work.ts
src/data/page-contact.ts
src/data/page-donate.ts

The homepage should have:

src/data/page-home.ts

This file should contain structured TypeScript data for sections such as:

- hero
- introduction
- focus areas
- mission
- vision
- goals
- statistics
- projects
- testimonials
- process/approach
- FAQ
- CTA
- contact
- footer

Do NOT hardcode large amounts of content directly inside JSX.

Use reusable components that receive data through props.

Example:

<HomeHero data={homeData.hero} />

<FocusAreas data={homeData.focusAreas} />

<ImpactSection data={homeData.impact} />

<Testimonials data={homeData.testimonials} />

This should make the website easy to maintain without modifying component logic.

COMPONENT ARCHITECTURE

Create reusable components such as:

```sh
src/components/
├── layout/
│ ├── Header.tsx
│ ├── Footer.tsx
│ ├── MobileNav.tsx
│ └── Container.tsx
│ ├── Hero.tsx
│ ├── FocusAreas.tsx
│ ├── MissionSection.tsx
│ ├── ImpactStats.tsx
│ ├── Testimonials.tsx
│ ├── Projects.tsx
│ ├── ProcessSection.tsx
│ ├── FAQ.tsx
│ ├── Articles.tsx
│ └── ContactCTA.tsx
│
├── common/
│ ├── SectionHeading.tsx
│ ├── SectionLabel.tsx
│ ├── ImageCard.tsx
│ ├── CTAButton.tsx
│ └── PageHero.tsx
│
├── forms/
│ ├── ContactForm.tsx
│ ├── VolunteerForm.tsx
│ └── NewsletterForm.tsx
│
└── ui/
└── shadcn components
```

Use shadcn components wherever they make sense.

DESIGN DIRECTION

Use the uploaded website screenshot/reference as the visual starting point.

Maintain the overall Arvishha Foundation identity:

- Primary color: deep/dark green
- Secondary accent: warm yellow/gold
- White/off-white backgrounds
- Soft light-gray sections
- Rounded cards
- Modern NGO aesthetic
- Clean typography
- Strong whitespace
- Professional but compassionate visual language
- Authentic, human-centered photography
- Subtle decorative background elements
- Avoid excessive gradients
- Avoid overly flashy animations

The existing design contains a large hero section with:

"Development. Dignity. Social Change."

and:

"Arvishha Foundation"

Build a significantly polished version of this visual direction.

Do not simply copy the screenshot pixel-for-pixel.

Improve the layout, spacing, typography, responsiveness, accessibility and overall UX while preserving the brand concept.

HOMEPAGE STRUCTURE

Create the homepage approximately in this order:

1. Sticky/clean responsive header

Logo:
Arvishha Foundation

Navigation:

Home
Who We Are
What We Do
Projects
News & Stories
Get Involved
Contact

Primary CTA:

Donate / Support Us

Mobile navigation should use shadcn Sheet.

---

2. HERO

Large modern NGO hero.

Eyebrow:

Development. Dignity. Social Change.

Heading:

Arvishha Foundation

Supporting statement explaining the organization's mission.

Primary CTA:

Explore Our Work

Secondary CTA:

Get Involved

Use a large authentic image from the WordPress media domain.

Hero should have a premium editorial layout rather than a generic SaaS hero.

Include subtle decorative elements in the background.

---

3. IMPACT / TRUST SECTION

Show a small impact statement and statistics.

Examples:

500+
Community Members Reached

25+
Community Initiatives

10+
Active Programs

5+
Focus Areas

Keep these values inside page-home.ts so they can easily be changed.

---

4. FOCUS AREAS

Heading:

Building Stronger Communities Through Meaningful Social Action

Create reusable cards for:

Education & Youth Development
Women Empowerment
Child Welfare & Rights
Healthcare & Wellbeing
Rural Development
Environmental Sustainability

Each card should contain:

- icon
- title
- short description
- image
- link

Cards should be responsive and visually polished.

---

5. ABOUT / MISSION SECTION

Create a two-column section.

Left:
Large image/video-style visual.

Right:

Our Approach Is Simple

Listen. Support. Empower.

Create Lasting Change.

Include tabs or segmented controls for:

Vision
Mission
Goals

Use shadcn Tabs if appropriate.

---

6. IMPACT SECTION

Create a visually strong dark-green section.

Explain how Arvishha Foundation creates measurable social impact.

Include statistics and supporting information.

Use yellow/gold accents sparingly.

---

7. PROGRAMS / PROJECTS

Create project cards.

Each card should support:

- image
- category
- title
- short description
- location
- date/status
- CTA

Use data from:

src/data/page-home.ts

Do not hardcode project information inside components.

---

8. STORIES / TESTIMONIALS

Create a testimonial/story section.

Use:

- profile image
- name
- role/community
- testimonial

Make it feel authentic to an NGO rather than like a corporate SaaS testimonial section.

---

9. HOW WE WORK

Heading:

Our Approach

Create 4 steps:

01 — Understand
02 — Plan
03 — Implement
04 — Measure

Each step should be represented by a reusable component.

---

10. CTA

Create a strong full-width CTA section.

Example:

"Together, We Can Create Lasting Change."

Buttons:

Support Our Work
Become a Volunteer

Use an image/background from the WordPress media server.

---

11. FAQ

Use shadcn Accordion.

Questions and answers should come from:

src/data/page-home.ts

Do not hardcode FAQ data inside the component.

---

12. NEWS / STORIES

Show latest articles/stories.

If articles are static for now, keep them in page-home.ts.

If WordPress REST API is later enabled for posts, create a separate API layer so the component can switch from static data to API data without rewriting the UI.

---

13. CONTACT SECTION

Create a premium contact section.

Include:

Get In Touch

Start The Dialogue.
We're Listening.

Display:

Phone
Email
Address
Social links

Include a contact form.

Fields:

Name
Email
Phone
Subject
Message

Submit the form through WordPress REST API.

Show proper:

- loading state
- validation
- success state
- error state

Use React Hook Form + Zod if appropriate.

Do not directly submit the form to WordPress from arbitrary components.

Create:

src/lib/wordpress.ts

and/or:

src/lib/api.ts

for API communication.

---

14. FOOTER

Create a large professional NGO footer.

Include:

Logo
Short organization description

Navigation:
Home
Who We Are
What We Do
Projects
News & Stories
Contact

Support:
Donate
Volunteer
Partner With Us

Legal:
Privacy Policy
Terms
Cookie Policy

Contact information

Social links

Copyright:

© 2026 Arvishha Foundation. All rights reserved.

RESPONSIVE DESIGN

The site must be fully responsive.

Optimize specifically for:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- large desktop

Do not simply shrink the desktop layout.

Create proper mobile layouts.

Mobile navigation should be a proper drawer/sheet.

Cards should become single-column or horizontally scrollable where appropriate.

Typography must remain readable on mobile.

ACCESSIBILITY

Follow WCAG-friendly practices.

Use:

- semantic HTML
- proper heading hierarchy
- accessible buttons
- accessible forms
- alt text
- keyboard navigation
- visible focus states
- sufficient color contrast
- aria labels where required

Do not use divs as buttons.

SEO

Implement strong technical SEO.

Every page should support:

- title
- description
- canonical URL
- Open Graph
- Twitter/X metadata
- robots metadata where appropriate

Use Next.js metadata APIs.

Create:

app/sitemap.ts

app/robots.ts

Use structured data where appropriate:

Organization
NGO
WebSite
Article
BreadcrumbList

Use JSON-LD safely.

Homepage metadata should be configurable rather than hardcoded throughout the application.

PERFORMANCE

Use Next.js 16 App Router correctly.

Prefer Server Components.

Use Client Components only for:

- forms
- mobile navigation
- sliders/carousels
- tabs if interactive
- accordions where needed
- other browser-dependent interactions

Do not add "use client" unnecessarily.

Use next/image for WordPress images.

Use proper image sizes and responsive sizes.

Do not load huge original images when a smaller WordPress image size is available.

Avoid unnecessary JavaScript.

Avoid unnecessary API calls.

SSR / ISR

Use SSR for pages where content or data must be generated dynamically.

Use ISR/revalidation where content can be cached.

Static pages should remain statically rendered whenever possible.

For example:

Homepage:
Static / ISR depending on dynamic sections.

About:
Static.

What We Do:
Static.

Contact:
Static page with client-side form interaction.

Blog:
ISR if using WordPress REST API.

Dynamic article/project pages:
ISR with revalidation.

Do not use SSR everywhere just because Next.js supports it.

Use the rendering strategy that actually fits each page.

WORDPRESS MEDIA

WordPress is hosted at:

https://media.arvishhafoundation.org/

Images come directly from this WordPress installation.

Create a helper for WordPress media URLs if useful:

getWordPressMediaUrl()

But do not proxy or copy images through Next.js unnecessarily.

Configure:

next.config.ts

for remote images.

WORDPRESS FORMS

Create a centralized WordPress API client.

Example conceptual API:

wordpressApi.submitContact()
wordpressApi.submitVolunteer()
wordpressApi.subscribeNewsletter()

The actual endpoint should be configurable.

Use environment variables.

Never expose private WordPress credentials.

Validate data on both frontend and backend.

Handle:

400
401
403
404
429
500

gracefully.

ERROR HANDLING

Create clean loading/error/empty states.

Do not expose raw API errors to users.

Use user-friendly messages.

PROJECT STRUCTURE

Use something similar to:

```sh
src/
├── app/
│ ├── page.tsx
│ ├── about/
│ │ └── page.tsx
│ ├── what-we-do/
│ │ └── page.tsx
│ ├── projects/
│ │ └── page.tsx
│ ├── news/
│ │ ├── page.tsx
│ │ └── [slug]/
│ │ └── page.tsx
│ ├── get-involved/
│ │ └── page.tsx
│ ├── contact/
│ │ └── page.tsx
│ ├── donate/
│ │ └── page.tsx
│ ├── sitemap.ts
│ └── robots.ts
│
├── components/
│ ├── ui/
│ ├── layout/
│ ├── common/
│ ├── home/
│ ├── forms/
│ └── sections/
│
├── data/
│ ├── page-home.ts
│ ├── page-about.ts
│ ├── page-what-we-do.ts
│ ├── page-contact.ts
│ └── navigation.ts
│
├── lib/
│ ├── wordpress.ts
│ ├── api.ts
│ ├── seo.ts
│ └── utils.ts
│
├── types/
│ ├── wordpress.ts
│ └── site.ts
│
└── styles/
```

## News

News are the posts of wordpress. it fetched from server



CODE QUALITY

Write production-quality TypeScript.

Avoid:

- any
- duplicated JSX
- giant page components
- hardcoded content inside components
- unnecessary client components
- unnecessary useEffect
- unnecessary state
- inline API requests
- duplicated Tailwind classes where reusable components make more sense

Use typed interfaces.

Use reusable components.

Keep components focused and composable.

Use shadcn/ui as the base UI system, but create custom NGO-specific components where needed.

IMPORTANT

Do not build this as a WordPress theme.

Do not use WordPress as the primary CMS for static page content.

Do not make the frontend dependent on WordPress being available for normal static pages.

The website must continue rendering its static content even if the WordPress server is temporarily unavailable.

WordPress should primarily provide:

- external media
- form processing
- optional dynamic content/API data

The final result should feel like a premium, trustworthy, modern NGO website — not a SaaS dashboard, corporate template, or generic AI-generated landing page.

Use the uploaded Arvishha Foundation website screenshot as the visual reference for the existing branding and content direction, while improving the UX, responsiveness, accessibility, spacing, typography and component architecture.
