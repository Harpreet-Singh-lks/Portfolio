"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/navbar";
import Searchbar from '../components/searchbar';

import CommandPalette from '../components/command-palette';

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
  const searchBarRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [searchValue, setSearchValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Trigger animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = React.useCallback((query: string) => {
    localStorage.setItem('initialQuery', query);
    router.push('/chat');
  }, [router]);

  return (
    <div className="min-h-screen bg-black">
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Hero Section with animations */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh]">
          {/* Main heading with fade-up animation */}
          <h1 className={`font-Molde text-center font-bold leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl tracking-tight transition-all duration-1000 ease-out ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            Hi, I am <span className="text-orange-400">Harpreet 👋</span>
          </h1>

          {/* Subtitle with delayed animation */}
          <h2 className={`mt-4 sm:mt-6 text-center font-Molde text-muted-foreground leading-snug text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl tracking-tight [text-wrap:balance] transition-all duration-1000 ease-out delay-300 ${
            isLoaded
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}>
            <span className="block text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl">
              & I love building scalable
            </span>
            <span className="block">
              <span className="relative mx-auto flex items-center justify-center h-8 sm:h-10 md:h-11 px-2 sm:px-3 w-fit min-w-[140px] sm:min-w-[180px] transition-[width] duration-300">
                <span className="absolute inset-0 flex items-center justify-center animate-rotateWord1 whitespace-nowrap text-amber-400 text-base sm:text-lg md:text-2xl">
                  backend systems
                </span>
                <span className="absolute inset-0 flex items-center justify-center animate-rotateWord2 whitespace-nowrap text-yellow-400 text-base sm:text-lg md:text-2xl">
                  web3 products
                </span>
              </span>
            </span>
          </h2>

          {/* Search Bar with scale-up animation */}
          <div className={`mt-10 sm:mt-12 flex justify-center w-full transition-all duration-1000 ease-out delay-600 ${
            isLoaded 
              ? 'opacity-100 scale-100 translate-y-0' 
              : 'opacity-0 scale-95 translate-y-4'
          }`}>
            <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl px-4">
              <div className="flex justify-center">
                <div className="w-full max-w-xl lg:max-w-2xl">
                  {/* Single container with proper ref for positioning */}
                  <div ref={searchBarRef} className="relative">
                    <Searchbar
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
                        localStorage.setItem('initialQuery', item.title);
                        router.push('/chat');
                      }}
                      onClose={() => setShowSuggestions(false)}
                      searchBarRef={searchBarRef}
                      mode="below"  // use dropdown mode
                      className=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add custom styles for smoother animations */}
      <style jsx>{`
        /* Enhanced word rotation animations */
        @keyframes rotateWord1 {
          0%, 40% { 
            opacity: 1; 
            transform: translateY(0); 
          }
          50%, 90% { 
            opacity: 0; 
            transform: translateY(-10px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes rotateWord2 {
          0%, 40% { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          50%, 90% { 
            opacity: 1; 
            transform: translateY(0); 
          }
          100% { 
            opacity: 0; 
            transform: translateY(10px); 
          }
        }

        :global(.animate-rotateWord1) {
          animation: rotateWord1 4s infinite;
        }

        :global(.animate-rotateWord2) {
          animation: rotateWord2 4s infinite;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;

