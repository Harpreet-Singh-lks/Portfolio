export type ProjectCard = {
  title: string;
  description: string;
  tech: string[];
  links: {
    github?: string;
    demo?: string;
  };
  image?: string;
  timeline?: string;   // ✅ add this
  highlight?: string;  // ✅ add this
};

export interface ExperienceItem {
  role: string;
  company: string;
  start: string; // "2023-01"
  end: string;   // "Present" or "2024-06"
  bullets: string[];
}

// Rich assistant payload shapes
type AboutPayload = {
  kind: 'about';
  description: string;
};

type ContactPayload = {
  kind: 'contact';
  contact: {
    email: string;
    location?: string;
    linkedin?: string;
    github?: string;
    Twitter?: string;
  };
};

type ExperiencePayloadItem = {
  company: string;
  role: string;
  period: string;
  description: string[];
};

type ExperiencePayload = {
  kind: 'experience';
  items: ExperiencePayloadItem[];
};

type ProjectItem = {
  title: string;
  description: string;
  tech: string[];
};

type ProjectPayload = {
  kind: 'project';
  items: ProjectItem[];
};

type LinkPayload = {
  kind: 'link';
  url: string;
};

// Extendable union for assistant payloads
type AssistantPayload =
  | AboutPayload
  | ContactPayload
  | ExperiencePayload
  | ProjectPayload
  | LinkPayload
  | { kind: string; [key: string]: any }; // fallback for future/unknown payloads

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  content: string;            // for user echo and simple text
  payload?: AssistantPayload; // for rich responses
}