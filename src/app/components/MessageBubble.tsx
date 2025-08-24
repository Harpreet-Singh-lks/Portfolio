import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import type { Message } from '@/app/lib/types';
import ProjectCard from './ProjectCard';
import ExperienceTimeline from './ExperienceTimeline';
import About from './about';
import Contact from './contact';

// ⌨️ Typing animation component
function TypingText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return <span>{displayed}</span>;
}

// 💬 Typing dots indicator
function TypingDots() {
  return (
    <div className="flex space-x-1 mt-1">
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.15s]"></div>
      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0.3s]"></div>
    </div>
  );
}

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.type === 'user';
  const isTextResponse = !msg.payload || msg.payload.kind === 'text';
  const textContent = msg.content || msg.payload?.text || '';

  const getResponseIcon = () => {
    if (isUser) return null;
    return <Terminal className="w-7 h-7" />;
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="font-['JetBrains_Mono'] text-[24px] leading-relaxed text-gray-900 dark:text-white">
          <div className="whitespace-pre-line">{textContent}</div>
        </div>
      ) : (
        <div className="max-w-5xl p-6 rounded-lg font-['JetBrains_Mono'] bg-transparent text-gray-900 dark:text-white">
          {/* Assistant header */}
          {!isTextResponse && msg.payload?.kind !== 'about' && (
            <div className="flex items-center gap-3 mb-4 text-orange-400">
              {getResponseIcon()}
              <span className="text-[24px] font-semibold">
                {msg.payload?.kind === 'projects' && 'Projects'}
                {msg.payload?.kind === 'experience' && 'Experience'}
                {msg.payload?.kind === 'skills' && 'Skills'}
                {msg.payload?.kind === 'contact' && 'Contact'}
                {(!msg.payload || msg.payload.kind === 'text') && 'Response'}
              </span>
            </div>
          )}

          {/* Text responses */}
          {isTextResponse && (
            <div className="flex items-start gap-3">
              <Terminal className="w-6 h-6 mt-1 text-orange-400 flex-shrink-0" />
              <div className="whitespace-pre-line text-[24px] leading-relaxed">{textContent}</div>
            </div>
          )}

            {msg.payload?.kind === 'projects' && (
            <div className="grid gap-6 mt-3 sm:grid-cols-2">
                {msg.payload.items.map((p, i) => {
                console.log("Project item:", p); // 🔍 check shape
                return <ProjectCard key={i} project={p} />;
                })}
            </div>
            )}

          {msg.payload?.kind === 'experience' && (
            <div className="mt-3">
              <ExperienceTimeline items={msg.payload.items} />
            </div>
          )}

          {msg.payload?.kind === 'skills' && (
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              {Object.entries(msg.payload.groups).map(([group, skills]) => (
                <div
                  key={group}
                  className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50"
                >
                  <div className="font-semibold text-amber-400 mb-3 text-[24px]">
                    {group}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span
                        key={s}
                        className="text-lg px-3 py-1.5 rounded-full bg-zinc-700 text-gray-300 border border-zinc-600 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {msg.payload?.kind === 'contact' && (
            <div className="mt-3">
              <Contact contact={msg.payload.contact} />
            </div>
          )}

          {msg.payload?.kind === 'about' && (
            <div className="mt-3">
              <About
                description={msg.payload.description}
                highlights={msg.payload.highlights}
                stats={msg.payload.stats}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

