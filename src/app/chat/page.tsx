"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';
import CommandPalette from "../components/command-palette";
import MessageBubble from '../components/MessageBubble';

import type { Message } from '../lib/types';
import { Twitter } from "lucide-react";

const SAMPLE_SUGGESTIONS = [
  { id: 'about', command: '/about', description: 'Learn about my background and story' },
  { id: 'experience', command: '/experience', description: 'View my work experience and career journey' },
  { id: 'projects', command: '/projects', description: 'Explore my latest projects and case studies' },
  { id: 'skills', command: '/skills', description: 'Check out my technical skills and expertise' },
  { id: 'contact', command: '/contact', description: 'Get my contact information' },
  { id: 'resume', command: '/resume', description: 'Download my resume' }
];

const ChatInterface = () => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Inline submit handler (removed chatLogic)
  const handleSubmit = useCallback(async (raw: string) => {
    const text = raw.trim();
    if (!text) return;

    setShowSuggestions(false);
    setSearchValue('');

    // Add user message
    const userMsg: Message = {
      id: crypto.randomUUID(),
      type: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Handle local slash commands (render via MessageBubble components)
    if (text.toLowerCase().startsWith('/about')) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: '',
        // Render About component via payload (MessageBubble handles this)
        payload: {
          kind: 'about',
          description:
            "I’m Harpreet Singh, a 4th‑year BTech Electrical Engineering student at IIT Roorkee with strong backend experience and a deep interest in DeFi and blockchain. I love exploring and building across the stack. I work with TypeScript, Rust, Go, Python, Assembly, C/C++, and SQL, and with EVM, Docker, Vite, Next.js, Remix, Astro, Tailwind CSS, Ethers.js, Flask, Django, Linux, and Git."
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      return;
    }

    if (text.toLowerCase().startsWith('/contact')) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: '',
        payload: {
          kind: 'contact',
          contact: {
            email: 'preetsingh@gmail.com',
            location: 'Roorkee, Uttarakhand, India',
            linkedin: 'https://www.linkedin.com/in/harpreet-singh-792362256/',
            github: 'https://github.com/harpreet-singh-lks',
            Twitter: 'https://x.com/J_oKer_57'
          }
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      return;
    }
    if (text.toLowerCase().startsWith('/experience')) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: 'Here\'s my experience timeline:',
        payload: {
          kind: 'experience',
          items: [
            {
              company: "Amorcer",
              role: "Software Engineering Intern",
              period: "Jan 2025 – Apr 2025",
              description: [
                "Worked on backend development in Go",
                "Implemented REST APIs for microservices architecture", 
                "Improved database performance by 30% through query optimization",
                "Collaborated with cross-functional teams using Agile methodology"
              ]
            },
            {
              company: "Hackathon Project",
              role: "Blockchain Developer", 
              period: "2024",
              description: [
                "Built cross-chain DeFi protocols using Solidity, Move, and Rust",
                "Implemented automated market maker (AMM) functionality",
                "Developed smart contracts for yield farming protocols",
                "Created frontend interface using React and Web3.js"
              ]
            }
          ]
        },
        timestamp: new Date()
      };
    
      setMessages(prev => [...prev, assistantMsg]);
      return;
    }
    if (text.toLowerCase().startsWith('/project')) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: '',
        // Render Project component via payload (MessageBubble handles this)
        payload: {
          kind: 'project',
          items: [
            {
              title: "Decentralized Reputation-Based Mortgage System",
              description:
                "Built for Graphite Network Reputation Hackathon, this project enables decentralized compliance and modular identity infrastructure to issue mortgages based on on-chain trust scores.",
              tech: ["Solidity", "Foundry", "The Graph", "IPFS"]
            },
            {
              title: "Cross-Chain HTLC Atomic Swap",
              description:
                "Implemented a system for bidirectional swaps between Ethereum and Cardano using 1inch Fusion+ intent-based model with Solidity and Plutus smart contracts.",
              tech: ["Solidity", "Plutus", "Foundry", "Haskell"]
            },
            {
              title: "AI-Driven Healthcare Business Automation",
              description:
                "MVP platform automating 10+ healthcare modules including EMR, billing, staffing, and marketing, with Zapier and AI integrations.",
              tech: ["Next.js", "Node.js", "Stripe", "Zapier", "OpenAI"]
            }
          ]
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      return;
    }
    
    if (text.toLowerCase().startsWith('/resume')) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: 'Click here to view my resume ',
        payload: {
          kind: 'link',
          url: ' https://drive.google.com/file/d/1ueDR1rZ2hCgi_Ahy6WMe2uGCaWKbBr4Y/view?usp=drivesdk' // Replace with your actual resume link
        },
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      return;
    }
    
    
    

    // Call backend for assistant response
    setIsTyping(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text })
      });

      let answer = 'Sorry, something went wrong.';
      if (res.ok) {
        const data = await res.json();
        answer = data.answer ?? answer;
      } else {
        const errText = await res.text().catch(() => '');
        answer = `Error ${res.status}: ${errText || 'Failed to get response.'}`;
      }

      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: answer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: `Error: ${e?.message || 'Network error.'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  useEffect(() => {
    const q = localStorage.getItem('initialQuery');
    if (q) {
      localStorage.removeItem('initialQuery');
      setShowSuggestions(false);
      handleSubmit(q);
    }
  }, [handleSubmit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          
          {/* Optional About section when no messages */}
          

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto mb-6">
            <div className="space-y-4">
              {messages.map(m => <MessageBubble key={m.id} msg={m} />)}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar + Command Palette */}
          <div className="sticky bottom-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border pt-3">
            <Searchbar
              ref={searchBarRef}
              value={searchValue}
              setValue={setSearchValue}
              onSubmit={handleSubmit}
              openSuggestions={() => setShowSuggestions(true)}
              closeSuggestions={() => setShowSuggestions(false)}
            />
            <CommandPalette
              open={showSuggestions}
              query={searchValue}
              items={SAMPLE_SUGGESTIONS.map(s => ({
                id: s.id,
                title: s.command,
                description: s.description,
                intent: s.id
              }))}
              onSelect={(item) => {
                setShowSuggestions(false);
                setSearchValue('');
                handleSubmit(item.title);
              }}
              onClose={() => setShowSuggestions(false)}
              searchBarRef={searchBarRef}
              mode='inline'
            />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;