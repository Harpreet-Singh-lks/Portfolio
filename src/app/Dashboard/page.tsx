"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';
import SplashCursor from "../components/splashcursor";
import Suggestion from "../components/suggestion";
import CommandPalette from '../components/command-palette';
import { createHandleSubmit } from '../lib/chatLogic';

//interface
interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  card?: ProjectCard[];
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

const Dashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = React.useCallback((query: string) => {
    localStorage.setItem('initialQuery', query);
    router.push('/chat');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <SplashCursor/>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* Show hero when no messages, chat when there are messages */}
        {messages.length === 0 ? (
          // Hero Section (your existing code)
          <div className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh]">
            <h1 className="font-['Space_Grotesk'] text-center font-bold leading-tight text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight">
              Hi, I am <span className="text-blue-500">Harpreet 👋</span>
            </h1>

            <h2 className="mt-6 sm:mt-8 text-center font-semibold text-mute d-foreground leading-snug text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-[2.75rem] tracking-tight [text-wrap:balance]">
              <span className="block text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl">
                & I love building scalable
              </span>
              <span className="block">
                <span className="relative mx-auto flex items-center justify-center h-10 sm:h-12 md:h-14 px-2 sm:px-3 w-fit min-w-[160px] sm:min-w-[200px] transition-[width] duration-300">
                  <span className="absolute inset-0 flex items-center justify-center animate-rotateWord1 whitespace-nowrap text-indigo-400 text-xl sm:text-2xl md:text-4xl">
                    backend systems
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center animate-rotateWord2 whitespace-nowrap text-emerald-400 text-xl sm:text-2xl md:text-4xl">
                    web3 products
                  </span>
                </span>
              </span>
            </h2>

            <div className="mt-10 sm:mt-12">
              <Searchbar
                value={searchValue}
                setValue={setSearchValue}
                onSubmit={handleSubmit}
                openSuggestions={() => setShowSuggestions(true)}
                closeSuggestions={() => setShowSuggestions(false)}
              />
            </div>

            {/* Global Command Palette */}
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
                setSearchValue(item.title);
                localStorage.setItem('initialQuery', item.title);
                router.push('/chat');
              }}
              onClose={() => setShowSuggestions(false)}
            />
          </div>
        ) : (
          // Chat Section (NEW)
          <div className="max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Chat with Harpreet</h2>
              <button 
                onClick={() => setMessages([])}
                className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                New Chat
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-2xl p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="whitespace-pre-line">{message.content}</div>
                    <div className={`text-xs mt-2 ${
                      message.type === 'user' ? 'opacity-70' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
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

            {/* Search Bar - Always at bottom in chat mode */}
            <div className="sticky bottom-4">
              <Searchbar
                value={searchValue}
                setValue={setSearchValue}
                onSubmit={handleSubmit}
                openSuggestions={() => setShowSuggestions(true)}
                closeSuggestions={() => setShowSuggestions(false)}
              />
               {showSuggestions && (
                <Suggestion
                  items={SAMPLE_SUGGESTIONS.map(s => ({
                    id: s.id,
                    title: s.command,
                    description: s.description,
                    intent: s.id
                  }))}
                  onPick={(item) => {
                    handleSubmit(item.title);
                    setShowSuggestions(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default Dashboard;

