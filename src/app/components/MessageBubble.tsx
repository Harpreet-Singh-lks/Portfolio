import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import type { Message } from '@/app/lib/types';
import ProjectCard from './ProjectCard';
import ExperienceTimeline from './ExperienceTimeline';
import About from './about';
import Contact from './contact';

type Project = {
  title: string;
  description: string;
  tech: string[];
};


export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.type === 'user';
  const isTextResponse = !msg.payload || msg.payload.kind === 'text';
  const hasText = (p: unknown): p is { text?: string } =>
    !!p && typeof p === 'object' && 'text' in p;
  const textContent = msg.content || (msg.payload && hasText(msg.payload) ? msg.payload.text ?? '' : '');

  const getResponseIcon = () => {
    if (isUser) return null;
    return <Terminal className="w-7 h-7" />;
  };

  const HighLightedText=(text: string)=>{
    const highlightWords= [
      'skills',
      'experience',
    ]
    let highlighted = text;
    highlightWords.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, "gi");
      highlighted = highlighted.replace(
        regex,
        `<mark class="highlight-word">$1</mark>`
      );
    });

    return { __html: highlighted };
  }
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="font-['JetBrains_Mono'] text-[24px] leading-relaxed text-gray-900 dark:text-white">
          <div className="whitespace-pre-line">{textContent}</div>
        </div>
      ) : (
        <div className="max-w-5xl p-6 rounded-lg font-['JetBrains_Mono'] bg-transparent text-gray-900 dark:text-white">
          {/* Assistant header */}
          {!isTextResponse && (
            <div className="flex items-center gap-3 mb-4 text-orange-400">
              {getResponseIcon()}
              <span className="text-[24px] font-semibold">
                {msg.payload?.kind === 'projects' && 'Projects'}
                {msg.payload?.kind === 'experience' && 'Experience'}
                {msg.payload?.kind === 'skills' && 'Skills'}
                {msg.payload?.kind === 'contact' && 'Contact'}
                {msg.payload?.kind === 'about' && 'About'}
                {(!msg.payload || msg.payload.kind === 'text') && 'Response'}
              </span>
            </div>
          )}

          {/* Text responses */}
          {isTextResponse && (
            <div className="flex items-start gap-3">
              <Terminal className="w-6 h-6 mt-1 text-orange-400 flex-shrink-0" />
              <div className="whitespace-pre-line text-[24px] leading-relaxed">{textContent}</div>  {/*assistant text replies */}
            </div>
          )}
              {/* About Section  */}
          {msg.payload?.kind === 'about' && (
            <div className="mt-3">
              <About
                description={(msg.payload as any).description}
                highlights={(msg.payload as any).highlights}
                stats={(msg.payload as any).stats}
              />
            </div>
          )}

            {msg.payload?.kind === 'project' && (
              <div className="mt-3 grid gap-4">
                {(msg.payload.items as Project[]).map((project, i) => (
                  <ProjectCard key={i} project={project} />
                ))}
              </div>
            )}

          {msg.payload?.kind === 'link' && (
  <div className="mt-3">
    <a
      href={msg.payload.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-500 underline text-[20px]"
    >
      {msg.content || "Click here to view my resume"}
    </a>
  </div>
)}

          {msg.payload?.kind === 'experience' && (
            <div className="mt-3">
              <ExperienceTimeline items={msg.payload.items} />
            </div>
          )}

{msg.payload?.kind === 'skills' && (
  <div className="mt-3">
    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
      {msg.payload.description}
    </p>
  </div>
)}

          {msg.payload?.kind === 'contact' && (
            <div className="mt-3">
              <Contact contact={msg.payload.contact} />
            </div>
          )}

          
        </div>
      )}
    </div>
  );
}

