"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';
import Suggestion from "../components/suggestion";
import { createHandleSubmit } from '../lib/chatLogic';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main chat area that takes remaining space */}
      <main className="flex-1 pt-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col flex-1">
          
          {/* Chat Header */}
         
          {/* Messages Container - scrollable area */}
          <div className="flex-1 overflow-y-auto mb-6">
            <div className="space-y-4">
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
          </div>

          {/* Search Bar - Always at bottom */}
          <div className="relative">
            <Searchbar
              value={searchValue}
              setValue={setSearchValue}
              onSubmit={handleSubmit}
              openSuggestions={() => setShowSuggestions(true)}
              closeSuggestions={() => setShowSuggestions(false)}
            />
            
            {/* Suggestions */}
            {showSuggestions && (
              <div className="absolute bottom-full left-0 right-0 mb-2">
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
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default ChatInterface;