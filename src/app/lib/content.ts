export type SectionLink = { id: string; label: string };

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
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'connect', label: 'Connect' },
];

export const profile: Profile = {
  name: 'Harpreet',
  fullName: 'Harpreet Singh',
  role: 'Full-Stack Developer',
  tagline: 'Backend · Web3 · DeFi', // TODO: confirm tagline
  bio: 'IIT Roorkee engineer building backend systems, DeFi protocols and full-stack apps. If it needs a server, a chain, or a socket, I can ship it.', // TODO: refine
  email: 'preetsinghlks@gmail.com',
};

export const about = {
  paragraphs: [
    "I'm a 4th-year B.Tech Electrical Engineering student at IIT Roorkee who likes building things end to end — backend systems, DeFi protocols, and full-stack apps.",
    'I work mostly in TypeScript, Rust, Go and Python, with Docker, Next.js and Solidity in the toolbox.', // TODO: add hackathons / achievements
    'I enjoy the blockchain space and experimenting across the stack, from smart contracts to infrastructure.', // TODO
  ],
  quote: 'Build it, test it, ship it.', // TODO: your own line
};

export const featuredProjects: FeaturedProject[] = [
  {
    badge: 'FEATURED · TODO ACHIEVEMENT', // TODO
    title: 'Project One', // TODO
    subtitle: 'CHAIN · CATEGORY', // TODO
    description: 'TODO: one or two sentences about what this project does and why it matters.',
    tags: ['TypeScript', 'Solidity', 'Next.js'], // TODO
    links: [
      { label: 'Live', href: 'https://example.com' }, // TODO
      { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }, // TODO
    ],
    variant: 'dark',
  },
  {
    badge: 'FEATURED · TODO ACHIEVEMENT', // TODO
    title: 'Project Two', // TODO
    subtitle: 'STACK · CATEGORY', // TODO
    description: 'TODO: one or two sentences about what this project does and why it matters.',
    tags: ['Go', 'PostgreSQL', 'Kafka'], // TODO
    links: [
      { label: 'Live', href: 'https://example.com' }, // TODO
      { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }, // TODO
    ],
    variant: 'accent',
  },
];

export const projects: GridProject[] = [
  {
    title: 'Project Three', // TODO
    subtitle: 'CATEGORY',
    description: 'TODO: short description.',
    tags: ['Rust', 'Docker'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }],
  },
  {
    title: 'Project Four', // TODO
    subtitle: 'CATEGORY',
    description: 'TODO: short description.',
    tags: ['React', 'Node.js'],
    links: [{ label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks' }],
  },
  {
    title: 'Project Five', // TODO
    subtitle: 'CATEGORY',
    description: 'TODO: short description.',
    tags: ['Python'],
    links: [],
  },
];

export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['TypeScript', 'Rust', 'Go', 'Python', 'C/C++', 'Solidity'] },
  { label: 'Frameworks', items: ['Next.js', 'React', 'Node.js', 'Remix', 'Tailwind'] },
  { label: 'Backend & Infra', items: ['PostgreSQL', 'Docker', 'Kafka'] },
  { label: 'Web3', items: ['EVM', 'Ethers.js', 'Hardhat'] },
];

export const socials: Social[] = [
  { label: 'GitHub', href: 'https://github.com/Harpreet-Singh-lks', icon: 'github' },
  { label: 'LinkedIn', href: undefined, icon: 'linkedin' }, // TODO: add URL
  { label: 'Twitter', href: undefined, icon: 'twitter' }, // TODO: add URL
  { label: 'Email', href: 'mailto:preetsinghlks@gmail.com', icon: 'mail' },
];
