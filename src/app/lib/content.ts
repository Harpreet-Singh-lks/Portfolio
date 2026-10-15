export type SectionLink = {
  id: string;
  label: string;
  title: string; // big serif heading shown in the left rail
  caption: string; // small uppercase line under the title
  subtitle: string; // italic line under the caption
};

export type Profile = {
  name: string;
  fullName: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
};

export type Link = { label: string; href: string };

export type FeaturedProject = {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: Link[];
  variant: 'dark' | 'accent';
};

export type GridProject = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  links: Link[];
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  tags: string[];
};

export type SkillGroup = { label: string; items: string[] };
export type Social = { label: string; href?: string; icon: 'github' | 'linkedin' | 'twitter' | 'mail' };

export const sections: SectionLink[] = [
  { id: 'hero', label: 'Home', title: 'Portfolio', caption: '', subtitle: '' }, // caption/subtitle filled from profile.fullName in LeftRail
  { id: 'about', label: 'About', title: 'About', caption: 'BACKGROUND & STORY', subtitle: 'Backend, AI agents & Web3' },
  { id: 'experience', label: 'Experience', title: 'Experience', caption: 'WHERE I HAVE WORKED', subtitle: 'Backend & full-stack roles' },
  { id: 'projects', label: 'Projects', title: 'Work', caption: 'SELECTED PROJECTS', subtitle: '' }, // subtitle computed from project counts
  { id: 'skills', label: 'Skills', title: 'Skills', caption: 'TOOLS & STACK', subtitle: 'What I build with' },
  { id: 'connect', label: 'Connect', title: "Let's Connect", caption: 'GET IN TOUCH', subtitle: 'Open to new work and collaborations' },
];

export const profile: Profile = {
  name: 'Harpreet',
  fullName: 'Harpreet Singh',
  role: 'Backend Developer',
  tagline: 'Distributed Systems · AI Agents · Web3 ',
  bio: 'Building Reliable Backend Systems And AI-powered Product from Architecture to production.',
  email: 'Harpreetwork57@gmail.com', // from resume; the old site used preetsinghlks@gmail.com
};

export const about = {
  paragraphs: [
    'I build backend systems and AI agents, and I got here by way of a detour. I studied Electrical Engineering at IIT Roorkee, and a hackathon in my second year pulled me into software. Hackathons also led me to Web3. Since then I have learned the way I like best: by shipping, breaking things, and getting better each time.',
    'In my final year I joined an early-stage startup as it pivoted from business automation to healthcare. We shipped an MVP in two months, and it was later acquired by a healthcare company. Today I co-build the backend of Elara, an AI stylist that recommends outfits by occasion, fit, mood and time for 3,000+ customers. I designed its agent pipeline and cut response time from 2 minutes to 30 seconds.',
    'I also play volleyball, with Gold at Udghosh 2023 and Silver at Inter-IIT 2023 and 2024. Years of tournaments taught me teamwork and patience, how to take a loss, and how to stay calm under pressure. I bring the same to engineering.',
  ],


  quote: '', // TODO: optional pull quote in your own words (hidden when empty)
};

export const experience: ExperienceItem[] = [
  {
    role: 'Backend Developer',
    company: 'Elara',
    period: 'Sep 2025 – Present',
    bullets: [
      'Co-built the backend of joinelara.com, an AI fashion assistant with 3,000+ customers: a NestJS/TypeScript API on MongoDB and Redis, deployed on GCP with custom domains.',
      'Designed the AI agent pipeline (intent decision-making, cross-site product search) and cut response latency from 2 min to 30s while improving answer quality.',
      'Built virtual try-on, price tracking, a custom web scraper and Chrome extensions.',
      'Implemented subscriptions with Dodo Payments, including webhooks and plan-based credit grants.',
    ],
    tags: ['NestJS', 'TypeScript', 'MongoDB', 'Redis', 'Dodo Payments', 'Gemini', 'OpenAI', 'GCP'],
  },
  {
    role: 'Software Developer (Intern)',
    company: 'Amorcer',
    period: 'Jun 2025 – Jul 2025',
    bullets: [
      'Built the MVP of a doctor dashboard and REST APIs in Next.js/Node.js, with PostgreSQL schemas managed through Prisma, for an early-stage healthtech startup.',
      'Integrated Stripe for doctor onboarding and subscription payments, with an admin view of account status.',
      'Deployed on Vercel with custom domains; worked directly with the founder on product scope as the startup pivoted to healthcare.',
    ],
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Vercel'],
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    badge: 'ETHONLINE 2026',
    title: 'Beast',
    subtitle: 'ETHEREUM · AI AGENT SPENDING CONTROL',
    description:
      'Spending controls for AI agents: each agent gets an ENS identity and a Privy wallet with merchant and spend limits, and loses authority unless a verified human (World) keeps checking in.',
    tags: ['Solidity', 'Foundry', 'ENS', 'Privy', 'World', 'Node.js', 'React'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks/EthOnline-2026' }],
    variant: 'dark',
  },
  {
    badge: '',
    title: 'Shopping Agent',
    subtitle: 'LLM AGENT · SHOPIFY',
    description:
      'Multi-stage LLM agent for conversational product discovery: intent classification, pgvector search with structured filters, an LLM judge and an output validator. Cut per-query tokens by 67% and latency by 65% (20s to 4–7s).',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'pgvector', 'Gemini', 'OpenAI'],
    links: [], // TODO: add repo / demo link if public
    variant: 'accent',
  },
];

export const projects: GridProject[] = [
  {
    title: 'Elara',
    subtitle: 'AI FASHION ASSISTANT · WORK',
    description:
      'Co-built the backend: a NestJS agent pipeline, virtual try-on, price tracking, and subscriptions with Dodo Payments. 3,000+ customers.',
    tags: ['NestJS', 'MongoDB', 'Redis', 'GCP'],
    links: [{ label: 'Live', href: 'https://joinelara.com' }],
  },
  {
    title: 'SelfMate',
    subtitle: 'WEB3 · DECENTRALIZED DATING',
    description:
      'Verified-only matching with identity and age checks via Self Protocol, and profiles stored on the Walrus Network.',
    tags: ['Self Protocol', 'Walrus', 'Smart Contracts'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks/SelfMate' }],
  },
  {
    title: 'LangDAO',
    subtitle: 'WEB3 · ETHONLINE 2025 · TEAM PROJECT',
    description:
      'Platform where people use their language skills to teach, learn and earn crypto: wallet-based sessions, token-gated rooms and proof of participation. Contributed a roulette feature and caching/performance work.',
    tags: ['Next.js', 'TypeScript', 'Solidity', 'wagmi', 'Huddle01'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks/langdao-ethonline2025' }],
  },
  {
    title: 'Newton-Raphson Load Flow',
    subtitle: 'POWER SYSTEMS · C++',
    description:
      'Load flow solver for power systems with distributed generation: droop-controlled DGs, PQ, ZIP and frequency-dependent loads, and Jacobian construction, reporting bus voltages, angles and losses.',
    tags: ['C++', 'Numerical Methods', 'Power Systems'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks/Modified-Newton-Raphson-for-load-flow-analysis' }],
  },
];

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C++', 'Solidity', 'Rust'] },
  {
    label: 'Backend & AI',
    items: ['NestJS', 'Node.js', 'Express.js', 'FastAPI', 'PostgreSQL', 'pgvector', 'TypeORM', 'LangGraph', 'LangChain', 'RAG'],
  },
  { label: 'Web3', items: ['Foundry', 'Hardhat', 'ethers.js', 'Zero-Knowledge Proofs'] },
  { label: 'Infra & Payments', items: ['GCP', 'Docker', 'CI/CD', 'Stripe Connect', 'Dodo Payments'] },
];

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/harpreet-singh-792362256', icon: 'linkedin' },
  { label: 'X', href: 'https://x.com/J_oKer_57', icon: 'twitter' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
];
