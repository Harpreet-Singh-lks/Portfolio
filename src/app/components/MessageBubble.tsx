import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import type { Message } from '@/app/lib/types';
import ProjectCard from './ProjectCard';
import ExperienceTimeline from './ExperienceTimeline';
import About from './about';
import Contact from './contact';
import Skills from './skills';
import TypingMessage from './typing';

type Project = {
  title: string;
  description: string;
  tech: string[];
  links?: {
    github?: string;
    demo?: string;
  };
  image?: string;
  timeline?: string;
  highlight?: string;
};

const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.type === 'user';
  const isTextResponse = !msg.payload || msg.payload.kind === 'text';
  const hasText = (p: unknown): p is { text?: string } =>
    !!p && typeof p === 'object' && 'text' in p;
  const textContent = msg.content || (msg.payload && hasText(msg.payload) ? msg.payload.text ?? '' : '');
  
  const getResponseIcon = () => {
    if (isUser) return null;
    return <Terminal className="w-7 h-7 text-gray-300" />;
  };

  const highlightText = (text: string) => {
    // Programming languages to highlight
    const Languages = [
      'TypeScript', 'Rust', 'Go', 'Python', 'Assembly', 'C/C++', 'SQL',
      'JavaScript', 'Java', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin'
    ];
  
    const highlightWords = [
      'backend',
      'systems',
      'blockchain',
      'web3',
    ];
    
    // Words to color with accent
    const accentWords = [
      'hello',
      'welcome',
      'web3',
      'backend',
      'systems',
      'TypeScript', 'Rust', 'Go', 'Python', 'Assembly', 'C/C++', 'SQL',
      'JavaScript', 'Java', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
      'available',
      'passionate',
      'innovative',
      'creative',
      'professional',
      'expertise'
    ];
  
    let processedText = text;
  
    // Apply wavy underline to programming languages
    Languages.forEach((word) => {
      const escapedWord = escapeRegExp(word);
      const regex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');
      processedText = processedText.replace(
        regex,
        `<span class="underline decoration-wavy decoration-amber-400 underline-offset-4 font-medium">$1</span>`
      );
    });
  
    // Apply wavy underline to highlight words
    highlightWords.forEach((word) => {
      const escapedWord = escapeRegExp(word);
      const regex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');
      processedText = processedText.replace(
        regex,
        `<span class="underline decoration-wavy decoration-yellow-400 underline-offset-4 font-semibold">$1</span>`
      );
    });
  
    // Apply accent color to special words (bold only)
    accentWords.forEach((word) => {
      const escapedWord = escapeRegExp(word);
      const regex = new RegExp(`\\b(${escapedWord})\\b`, 'gi');
      processedText = processedText.replace(
        regex,
        `<span class="font-semibold text-yellow-300">$1</span>`
      );
    });
  
    return { __html: processedText };
  };
  

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="font-Molde text-[24px] leading-relaxed text-gray-300">
          <div className="whitespace-pre-line">{textContent}</div>
        </div>
      ) : (
        <div className="max-w-5xl p-6 rounded-lg font-Molde bg-transparent">
          {/* Assistant header */}
          {!isTextResponse && (
            <div className="flex items-center gap-3 mb-4 text-gray-200">
              {getResponseIcon()}
              <span className="text-[22px]">
                {msg.payload?.kind === 'projects' && 'Projects'}
                {msg.payload?.kind === 'experience' && 'Experience'}
                {msg.payload?.kind === 'skills' && 'Skills'}
                {msg.payload?.kind === 'contact' && 'Contact'}
                {msg.payload?.kind === 'about' && 'About'}
                {(!msg.payload || msg.payload.kind === 'text') && 'Response'}
              </span>
            </div>
          )}

          {/* Text responses with highlighting */}
          {isTextResponse && (
  <div className="flex items-start gap-3">
    <Terminal className="w-6 h-6 mt-1 text-gray-400 flex-shrink-0" />
    {(msg as any).animate ? (
  <p className="whitespace-pre-line text-[24px] leading-relaxed text-gray-400">
    {textContent.split(" ").map((word, i) => {
      const highlighted = highlightText(word).__html; // highlight this word
      return (
        <span
          key={i}
          className="inline-block mr-1"
          style={{
            animation: `fadeUp 600ms cubic-bezier(.2,.8,.2,1) ${i * 120}ms both`,
          }}
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      );
    })}
    <style jsx>{`
      @keyframes fadeUp {
        0% {
          opacity: 0;
          transform: translateY(8px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}</style>
  </p>
) : (
  <div
    className="whitespace-pre-line text-[24px] leading-relaxed text-gray-400"
    dangerouslySetInnerHTML={highlightText(textContent)} // highlight whole text at once
  />
)}

  </div>
)}


          {/* About Section */}
          {msg.payload?.kind === 'about' && (
            <div className="mt-3 text-gray-500 text-[24px] leading-relaxed">
              <About
                description={(msg.payload as any).description}
              />
            </div>
          )}

          {msg.payload?.kind === 'project' && (
            <div className="mt-3 grid gap-4">
              {(msg.payload.items as Project[]).map((project, i) => (
                <ProjectCard key={i} project={{ ...project, links: project.links ?? {} }} />
              ))}
            </div>
          )}

          {msg.payload?.kind === 'link' && (
            <div className="mt-3">
              <a
                href={msg.payload.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 underline text-[22px] hover:text-gray-500 transition-colors"
              >
                {msg.content || "Click here to view my resume"}
              </a>
            </div>
          )}

          {msg.payload?.kind === 'experience' && (
            <div className="mt-3 text-gray-500">
              <ExperienceTimeline items={msg.payload.items} />
            </div>
            )}

{msg.payload?.kind === 'skills' && (
  <div className="mt-3">
    <div className="mt-4">
      <Skills description={(msg.payload as any).description} />
    </div>
  </div>
)}


            {msg.payload?.kind === 'contact' && (
            <div className="mt-3 text-gray-500">
              <Contact contact={msg.payload.contact} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}