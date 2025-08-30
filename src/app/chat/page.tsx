"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';
import CommandPalette from "../components/command-palette";
import MessageBubble from '../components/MessageBubble';

import type { Message } from '../lib/types';


const SAMPLE_SUGGESTIONS = [
  { id: 'about', command: '/about', description: 'Learn about my background and story' },
  { id: 'experience', command: '/experience', description: 'View my work experience and career journey' },
  { id: 'projects', command: '/projects', description: 'Explore my latest projects and case studies' },
  { id: 'skills', command: '/skills', description: 'Check out my technical skills and expertise' },
  { id: 'contact', command: '/contact', description: 'Get my contact information' },
  { id: 'resume', command: '/resume', description: 'Download my resume' }
];


// helper function
function resolveCommand(input: string) {
  const text = input.trim().toLowerCase();

  if (text.startsWith('/about') || text.includes("about")) {
    return {
      kind: 'about',
      description:
        `I'm a 4th-year B.Tech Electrical Engineering student at IIT Roorkee who's passionate about building things — whether it's backend systems, DeFi protocols, or full‑stack apps. I've spent a lot of time working with TypeScript, Rust, Go, Python, C/C++, and SQL, and I enjoy using tools like Docker, Next.js, Remix, and Tailwind. I love exploring the blockchain/DeFi space and experimenting across the stack — sometimes hacking on smart contracts, other times fine‑tuning backend infrastructure. For me, it's all about learning, shipping, and having fun while building cool stuff.`
    };
  }

  if (text.startsWith('/skills') || text.includes("skill")) {
    return {
      kind: 'skills',
      description:
        "I work across a mix of languages like TypeScript, Rust, Go, Python, C/C++, and SQL, and I enjoy building with tools like Docker, Next.js, Remix, Tailwind, and Ethers.js. On the blockchain side, I’ve spent time with EVM, Solidity, Move, and even some Rust-based smart contracts. I like jumping between backend, full-stack, and DeFi projects depending on what I’m building."
    };
  }

  if (text.startsWith('/experience') || text.includes("experience") || text.includes("work")) {
    return {
      kind: 'experience',
      items: [
        {
          company: "Amorcer",
          role: "Lead Software Enginner",
          period: "Jun 2025 – Aug 2025",
          description: [
            "I built a scalable TypeScript backend with REST APIs in a microservices environment, designed a Retrieval-Augmented Generation (RAG) pipeline leveraging document ingestion, embeddings, Chroma vector storage, and prompt-augmented retrieval, and integrated Stripe to enable secure payments, subscription management, and automated workflows.,"


          ]
        },
        {
          company: "IIT Roorkee",
          role: "SMP mentor ",
          period: "Oct 2024 - Jun 2025",
          description: [
"            I mentored first-year students under the Student Mentorship Program (SMP), supporting their academic, personal, and career growth. I guided them in adapting to college life through academics, time management, and extracurriculars while serving as a bridge between students and the institute administration to ensure effective communication and support",
          ]
        }
      ]
    };
  }

  if (text.startsWith('/projects') || text.includes("project")) {
    return {kind: 'project',
      items: [
        {
          title: "Decentralized Reputation-Based Mortgage System",
          description: "Built a decentralized mortgage platform leveraging on-chain reputation and identity. Implemented reputation-weighted lending decisions, decentralized compliance checks, and trustless mortgage issuance with data stored on IPFS and indexed via The Graph.",
          tech: ["Solidity", "Foundry", "The Graph", "IPFS"],
          links: { github: "", demo: "" }
        },
        {
          title: "Cross-Chain HTLC Atomic Swap",
          description: "Developed an atomic swap system enabling trustless cross-chain swaps between Ethereum and Cardano using Hash Time-Locked Contracts (HTLC). Implemented Solidity contracts, Plutus validators, and a resolver relayer to ensure bidirectional, intent-based swaps.",
          tech: ["Solidity", "Plutus", "Foundry", "Haskell"],
          links: { github: "", demo: "" }
        },
        {
          title: "AI-Driven Healthcare Business Automation",
          description: "Created an AI-powered SaaS platform for healthcare businesses covering modules like licensing, EMR integration, insurance, billing, staffing, and marketing. Integrated GPT for business insights, Stripe for payments, and Zapier for workflow automation.",
          tech: ["Next.js", "Node.js", "Stripe", "Zapier", "OpenAI"],
          links: { github: "", demo: "" }
        },
        {
          title: "Power Flow Analysis with Distributed Generation",
          description: "Developed a C++ program for Newton-Raphson based power system load flow analysis, incorporating distributed generation (DG) modeling. Implemented robust numerical methods to analyze bus voltages, power losses, and system stability across a 38-bus test system.",
          tech: ["C++", "Numerical Methods", "Power Systems"],
          links: { github: "", demo: "" }
        },
        {
          title: "BitVision | NFT Collection Health & Investment Scanner",
          description: "Built an advanced NFT analytics tool leveraging BitsCrunch APIs to evaluate the health and investment potential of NFT collections. Designed a proprietary scoring system that incorporates wash trade detection, whale activity, price estimation, and market sentiment for real-time insights.",
          tech: ["React", "Node.js", "BitsCrunch API", "Web3.js"],
          links: { github: "", demo: "" }
        },
        {
          title: "Tronent | Decentralized File Versioning Platform",
          description: "Created a decentralized file versioning and storage platform using TRON blockchain and BTFS. Implemented intuitive file management, advanced version control via CIDs, and seamless token conversion (stablecoins to TRX through SunSwap). Ensured decentralized data integrity by combining BTFS storage with TRON-based metadata.",
          tech: ["TRON", "BTFS", "SunSwap", "Web3.js"],
          links: { github: "", demo: "" }
        }
      ]
      };
  }

  if (text.startsWith('/contact') || text.includes("contact")) {
    return {
      kind: 'contact',
      contact: {
        email: 'preetsinghlks@gmail.com',
        location: 'Roorkee, Uttarakhand, India',
        linkedin: 'https://www.linkedin.com/in/harpreet-singh-792362256/',
        github: 'https://github.com/harpreet-singh-lks',
        twitter: 'https://x.com/J_oKer_57'
      }
    };
  }

  if (text.startsWith('/resume') || text.includes("resume")) {
    return {
      kind: 'link',
      url: 'https://drive.google.com/file/d/1ueDR1rZ2hCgi_Ahy6WMe2uGCaWKbBr4Y/view?usp=drivesdk'
    };
  }

  return null;
}

const ChatInterface = () => {
  const router = useRouter();
  const searchBarRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
  
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
  
    // ✅ unified resolver
    const resolved = resolveCommand(text);
    if (resolved) {
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        type: 'assistant',
        content: null,
        payload: resolved,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      return;
    }
  
    // ❌ fallback → backend
    setIsTyping(true);
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: raw })
      });
  
      let answer = 'Sorry, something went wrong.';
      if (res.ok) {
        const data = await res.json();
        answer = data.answer ?? answer;
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
    <div className="min-h-screen flex flex-col bg-black">





      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
  
      {/* Main Chat Section */}
      <main className="flex-1 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col">
        
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto mb-6 space-y-4 scrollbar-thin scrollbar-thumb-muted/40 scrollbar-track-transparent">
          {messages.map((m) => (
            <MessageBubble key={m.id} msg={m} />
          ))}
  
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div>
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Thinking</div>
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 dark:bg-gray-400 rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
                  </div>
                </div>
              </div>
            </div>
)}
  
          <div ref={messagesEndRef} />
        </div>
  
        {/* Sticky Input Area */}
        {/* Sticky Input Area */}
<div className="sticky bottom-0 z-20 bg-transparent pt-3">
  <div className="max-w-3xl mx-auto">
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
      items={SAMPLE_SUGGESTIONS.map((s) => ({
        id: s.id,
        title: s.command,
        description: s.description,
        intent: s.id,
      }))}
      onSelect={(item) => {
        setShowSuggestions(false);
        setSearchValue("");
        handleSubmit(item.title);
      }}
      onClose={() => setShowSuggestions(false)}
      searchBarRef={searchBarRef}
      mode="inline"
    />
  </div>
</div>

      </main>
    </div>
  );
  
};

export default ChatInterface;