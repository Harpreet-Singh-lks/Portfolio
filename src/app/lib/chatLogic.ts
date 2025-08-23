import type { AssistantPayload, Message, ProjectCard, ExperienceItem } from './types';

type Suggestion = { id: string; command: string; description?: string };
type Ctx = {
  suggestions: Suggestion[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setSearchValue: (v: string) => void;
  setShowSuggestions: (b: boolean) => void;
  setIsTyping: (b: boolean) => void;
};

// Pure types
export interface ProjectCard {
  title: string;
  description: string;
  tech: string[];
  links: { github?: string; demo?: string };
  image?: string;
}
export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  cards?: ProjectCard[];
}
export interface SuggestionItem {
  id: string;
  command: string;
  description?: string;
}

// Intent detection (pure)
const detectIntent = (q: string, suggestions: Suggestion[]) => {
  const s = q.trim().toLowerCase();
  const hit = suggestions.find(x => s === x.command || s === x.command.slice(1));
  if (hit) return hit.id;
  if (s.includes('project')) return 'projects';
  if (s.includes('experience') || s.includes('work')) return 'experience';
  if (s.includes('skill') || s.includes('tech')) return 'skills';
  if (s.includes('about') || s.includes('background')) return 'about';
  if (s.includes('contact') || s.includes('email')) return 'contact';
  return 'fallback';
};

const generatePayload = async (intent: string, q: string): Promise<AssistantPayload> => {
  switch (intent) {
    case 'about':
      return {
        kind: 'about',
        description: `Hi! I'm Harpreet Singh, a passionate full-stack developer with expertise in building scalable backend systems and innovative web3 products. 

        I love creating efficient, user-focused solutions using modern technologies like React, Node.js, and TypeScript. My journey focuses on solving complex problems and creating meaningful digital experiences.`,
        
      };
    case 'projects':
      return {
        kind: 'projects',
        items: [
          { title: 'Project A', description: '…', tech: ['Next.js','Node'], links: { github: '#', demo: '#' } },
          { title: 'Project B', description: '…', tech: ['React','Redis'], links: { github: '#'} },
        ] as ProjectCard[]
      };
    case 'experience':
      return {
        kind: 'experience',
        items: [
          { role: 'Senior Engineer', company: 'Acme', start: '2023-01', end: 'Present', bullets: ['Led X', 'Improved Y'] },
          { role: 'Full Stack Dev', company: 'Startup', start: '2021-06', end: '2022-12', bullets: ['Built Z'] },
        ] as ExperienceItem[]
      };
    case 'skills':
      return { kind: 'skills', groups: { Frontend: ['React','Next.js','Tailwind'], Backend: ['Node','Postgres','Redis'] } };
    case 'contact':
      return { kind: 'text', text: 'Email: … | LinkedIn: … | GitHub: …' };
    case 'fallback':
    default: {
      // Fallback: call Grok (server API) with resume context
      try {
        const res = await fetch('/api/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q })
        });
        const data = await res.json();
        return { kind: 'text', text: data.answer || 'Sorry, I could not find that.' };
      } catch {
        return { kind: 'text', text: 'Sorry, something went wrong. Try a command like /projects.' };
      }
    }
  }
};

export const createHandleSubmit = (ctx: Ctx) => {
  return async (query: string) => {
    const q = query.trim();
    if (!q) return;

    const userMsg: Message = { id: crypto.randomUUID(), type: 'user', content: q, timestamp: new Date() };
    ctx.setMessages(prev => [...prev, userMsg]);
    ctx.setSearchValue('');
    ctx.setShowSuggestions(false);
    ctx.setIsTyping(true);

    const intent = detectIntent(q, ctx.suggestions);
    const payload = await generatePayload(intent, q);

    const assistant: Message = {
      id: crypto.randomUUID(),
      type: 'assistant',
      content: payload.kind === 'text' ? payload.text : '', // echo text here
      payload,
      timestamp: new Date(),
    };

    ctx.setMessages(prev => [...prev, assistant]);
    ctx.setIsTyping(false);
  };
};