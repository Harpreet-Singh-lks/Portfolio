'use client';

import React from 'react';
import { Code, Coffee, Heart, Sparkles } from 'lucide-react';

interface AboutProps {
  name?: string;
  title?: string;
  description: string;
  highlights?: string[];
  stats?: { label: string; value: string }[];
}

export default function About({ 
  name = "Harpreet Singh",
  title = "Software Developer",
  description,
  highlights = [],
  stats = []
}: AboutProps) {
  
  // Function to highlight specific words/phrases in the description
  const renderHighlightedText = (text: string) => {
    // Define words/phrases to highlight
    const highlightWords = [
      'full-stack developer', 'software engineer', 'React', 'Node.js', 'TypeScript',
      'scalable', 'backend systems', 'web3', 'blockchain', 'passionate',
      'innovative', 'user-focused', 'efficient', 'modern technologies'
    ];
    
    let highlightedText = text;
    
    highlightWords.forEach(word => {
      const regex = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, (match) => 
        `<mark class="highlight-word">${match}</mark>`
      );
    });
    
    return { __html: highlightedText };
  };

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-amber-400/10">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-2xl font-serif italic text-amber-400">About {name}</h2>
            <p className="text-sm text-zinc-400">{title}</p>
          </div>
        </div>
      </div>

      {/* Main Description */}
      <div className="mb-6">
        <div 
          className="text-gray-300 leading-relaxed space-y-4 about-content"
          dangerouslySetInnerHTML={renderHighlightedText(description)}
        />
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-200 mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            What I Love
          </h3>
          <div className="grid gap-2">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-800/50 border border-zinc-800">
                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-300">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {stats.length > 0 && (
        <div className="border-t border-zinc-800 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-3 rounded-lg bg-zinc-800/30">
                <div className="text-xl font-bold text-amber-400">{stat.value}</div>
                <div className="text-xs text-zinc-400 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fun Footer */}
      <div className="mt-6 pt-6 border-t border-zinc-800">
        <div className="flex items-center justify-center gap-6 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-blue-400" />
            <span>Always coding</span>
          </div>
          <div className="flex items-center gap-2">
            <Coffee className="w-4 h-4 text-amber-400" />
            <span>Fueled by coffee</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for highlighting */}
      <style jsx>{`
        .about-content :global(.highlight-word) {
          background: linear-gradient(120deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%);
          color: rgb(251, 191, 36);
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: 500;
          border-bottom: 1px solid rgba(245, 158, 11, 0.4);
          text-decoration: none;
        }
        
        .about-content :global(p) {
          margin-bottom: 1rem;
        }
        
        .about-content :global(strong) {
          color: rgb(229, 231, 235);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}