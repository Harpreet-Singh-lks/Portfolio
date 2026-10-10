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

export type SkillGroup = { label: string; items: string[] };
export type Social = { label: string; href?: string; icon: 'github' | 'linkedin' | 'twitter' | 'mail' };

export const sections: SectionLink[] = [
  { id: 'hero', label: 'Home', title: 'Portfolio', caption: '', subtitle: '' }, // caption/subtitle filled from profile.fullName in LeftRail
  { id: 'about', label: 'About', title: 'About', caption: 'BACKGROUND & STORY', subtitle: 'Backend, AI agents & Web3' },
  { id: 'projects', label: 'Projects', title: 'Work', caption: 'SELECTED PROJECTS', subtitle: '' }, // subtitle computed from project counts
  { id: 'skills', label: 'Skills', title: 'Skills', caption: 'TOOLS & STACK', subtitle: 'What I build with' },
  { id: 'connect', label: 'Connect', title: "Let's Connect", caption: 'GET IN TOUCH', subtitle: 'Open to new work and collaborations' },
];

export const profile: Profile = {
  name: 'Harpreet',
  fullName: 'Harpreet Singh',
  role: 'Backend Developer',
  tagline: 'AI Agents · Web3 · Payments',
  bio: 'IIT Roorkee engineer building AI agents, backend systems and onchain products. Currently co-building the backend of Elara, an AI fashion assistant with 3,000+ customers.',
  email: 'Harpreetwork57@gmail.com', // from resume; the old site used preetsinghlks@gmail.com
};

export const about = {
  paragraphs: [
    'I graduated in Electrical Engineering from IIT Roorkee in 2026, and I build backend systems, LLM agents and onchain products.',
    'At Elara I co-built the backend of an AI fashion assistant with 3,000+ customers, and cut agent response latency from 2 minutes to 30 seconds. Before that I built a doctor dashboard with Stripe payments for a healthtech startup, Amorcer.',
    'I build agent infrastructure and Web3 projects at hackathons, most recently Beast at ETHOnline 2026. Off the keyboard, I play volleyball: Gold at Udghosh 2023 and Silver at Inter-IIT 2023 and 2024.',
  ],
  quote: '', // TODO: optional pull quote in your own words (hidden when empty)
};

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
    title: 'Amorcer Dashboard',
    subtitle: 'HEALTHTECH · INTERNSHIP',
    description:
      'MVP doctor dashboard and REST APIs for a healthtech startup, with Stripe onboarding and subscription payments.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    links: [],
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
  { label: 'Twitter', href: undefined, icon: 'twitter' }, // not on resume; hidden until a URL is added
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'mail' },
];
