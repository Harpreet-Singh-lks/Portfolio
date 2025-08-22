export interface ProjectCard {
  title: string;
  description: string;
  tech: string[];
  links: { github?: string; demo?: string };
  image?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  start: string; // "2023-01"
  end: string;   // "Present" or "2024-06"
  bullets: string[];
}

export type AssistantPayload =
  | { kind: 'text'; text: string }
  | { kind: 'projects'; items: ProjectCard[] }
  | { kind: 'experience'; items: ExperienceItem[] }
  | { kind: 'skills'; groups: Record<string, string[]> };

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  content: string;            // for user echo and simple text
  payload?: AssistantPayload; // for rich responses
}