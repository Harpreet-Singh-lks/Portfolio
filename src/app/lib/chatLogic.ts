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
export const detectIntent = (input: string, suggestions: SuggestionItem[]): string => {
  const lowercaseInput = input.toLowerCase().trim();
  const suggestion = suggestions.find(
    s => lowercaseInput === s.command || lowercaseInput.includes(s.command.slice(1))
  );
  if (suggestion) return suggestion.id;
  if (lowercaseInput.includes('project')) return 'projects';
  if (lowercaseInput.includes('experience') || lowercaseInput.includes('work')) return 'experience';
  if (lowercaseInput.includes('skill') || lowercaseInput.includes('tech')) return 'skills';
  if (lowercaseInput.includes('about') || lowercaseInput.includes('background')) return 'about';
  if (lowercaseInput.includes('contact') || lowercaseInput.includes('email')) return 'contact';
  return 'fallback';
};

// Response generation (pure)
export const generateResponse = (intent: string): { content: string; cards?: ProjectCard[] } => {
  switch (intent) {
    case 'about':
      return {
        content: `Hi! I'm Harpreet Singh, a passionate software developer with expertise in building scalable backend systems and web3 products.

I love creating efficient, user-focused solutions and have experience with React, Node.js, and blockchain technologies.

When I'm not coding I explore new tech, contribute to OSS, or share knowledge.`
      };
    case 'projects':
      return {
        content: 'Here are some featured projects:',
        cards: [
          {
            title: 'E-commerce Platform',
            description: 'Full‑stack commerce app (React, Node.js, MongoDB, Stripe)',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            links: { github: '#', demo: '#' }
          },
          {
            title: 'Task Management App',
            description: 'Real-time collaboration (Next.js, Socket.io, PostgreSQL, Redis)',
            tech: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
            links: { github: '#', demo: '#' }
          }
        ]
      };
    case 'skills':
      return {
        content: `Skills:

Frontend: React, Next.js, TypeScript, Tailwind  
Backend: Node.js, Express, Python, Django, GraphQL  
Infra & DB: PostgreSQL, MongoDB, Redis, Docker, AWS  
Testing & Tooling: Jest, CI/CD, Performance`
      };
    case 'experience':
      return {
        content: `Experience:

Senior Software Developer – TechCorp (2022–Now)
• Microservices for 100k+ users
• 40% perf improvement

Full Stack Developer – StartupXYZ (2021–2022)
• React/Node delivery
• CI/CD time -60%`
      };
    case 'contact':
      return {
        content: `Contact:

Email: harpreet@example.com
LinkedIn: linkedin.com/in/harpreet-singh
GitHub: github.com/harpreetsingh`
      };
    default:
      return {
        content: `Try asking:

/about  /projects  /skills  /experience  /contact

Natural questions also work.`
      };
  }
};

// Factory to build a submit handler using your component state setters
export const createHandleSubmit = (opts: {
  suggestions: SuggestionItem[];
  setActiveTab?: (tab: string) => void;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setSearchValue: (v: string) => void;
  setShowSuggestions: (v: boolean) => void;
  setIsTyping: (v: boolean) => void;
  typingDelay?: number;
}) => {
  const {
    suggestions,
    setActiveTab,
    setMessages,
    setSearchValue,
    setShowSuggestions,
    setIsTyping,
    typingDelay = 800
  } = opts;

  return (query: string) => {
    if (!query.trim()) return;
    setActiveTab && setActiveTab('chat');

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: query,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setSearchValue('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const intent = detectIntent(query, suggestions);
      const response = generateResponse(intent);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        cards: response.cards,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, typingDelay);
  };
};