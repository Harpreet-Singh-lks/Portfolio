"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';
import CommandPalette from "../components/command-palette";
import { createHandleSubmit } from '../lib/chatLogic';
import MessageBubble from '../components/MessageBubble';
import type { Message } from '../lib/types';

// Add the same interfaces from Dashboard
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  cards?: ProjectCard[];
}

interface ProjectCard {
  title: string;
  description: string;
  tech: string[];
  links: { github?: string; demo?: string; };
  image?: string;
}

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

  const handleSubmit = React.useMemo(
    () =>
      createHandleSubmit({
        suggestions: SAMPLE_SUGGESTIONS,
        setMessages,
        setSearchValue,
        setShowSuggestions,
        setIsTyping
      }),
    [SAMPLE_SUGGESTIONS]
  );

  useEffect(() => {
    const q = localStorage.getItem('initialQuery');
    if (q) {
      localStorage.removeItem('initialQuery');
      setShowSuggestions(false);
      handleSubmit(q); // triggers user message + assistant response
    }
  }, [handleSubmit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          
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

          {/* Search Bar Container */}
          <div className="sticky bottom-0 z-20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border pt-3">
            <Searchbar
              ref={searchBarRef} // Now properly forwarded
              value={searchValue}
              setValue={setSearchValue}
              onSubmit={handleSubmit}
              openSuggestions={() => setShowSuggestions(true)}
              closeSuggestions={() => setShowSuggestions(false)}
            />
            
            {/* Command Palette with intelligent positioning */}
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
            />
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;