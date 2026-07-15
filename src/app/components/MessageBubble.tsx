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
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.type === 'user';
  const isTextResponse = !msg.payload || msg.payload.kind === 'text';
  const hasText = (p: unknown): p is { text?: string } =>
    !!p && typeof p === 'object' && 'text' in p;
  const textContent = msg.content || (msg.payload && hasText(msg.payload) ? msg.payload.text ?? '' : '');
  const [displayText, setDisplayText] = useState('');

  // Streaming text effect
  useEffect(() => {
    if (!isTextResponse) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < textContent.length) {
        setDisplayText(textContent.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [textContent, isTextResponse]);

  const getResponseIcon = () => {
    if (isUser) return null;
    return <Terminal className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 text-orange-400" />;
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isUser ? (
        <div className="max-w-2xl">
          <div className="bg-neutral-700/40 border border-neutral-600/30 rounded-2xl px-4 py-3 sm:px-5 sm:py-3">
            <p className="text-sm sm:text-base leading-relaxed text-gray-100 whitespace-pre-wrap">
              {textContent}
            </p>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl flex-1">
          {/* Assistant Response */}
          {!isTextResponse && (
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4 text-gray-200">
              {getResponseIcon()}
              <span className="text-sm sm:text-base font-medium text-orange-400">
                {msg.payload?.kind === 'projects' && 'Projects'}
                {msg.payload?.kind === 'experience' && 'Experience'}
                {msg.payload?.kind === 'skills' && 'Skills'}
                {msg.payload?.kind === 'contact' && 'Contact'}
                {(!msg.payload || msg.payload.kind === 'text') && 'Response'}
              </span>
            </div>
          )}

          {/* Text Response - ChatGPT Style */}
          {isTextResponse && (
            <div className="text-sm sm:text-base leading-relaxed text-gray-300 whitespace-pre-wrap break-words">
              {displayText}
              {displayText.length < textContent.length && (
                <span className="inline-block w-2 h-5 ml-1 bg-orange-400 animate-pulse rounded-sm" />
              )}
            </div>
          )}

          {/* About Section */}
          {msg.payload?.kind === 'about' && (
            <About description={(msg.payload as any).description} />
          )}

          {/* Project Cards */}
          {msg.payload?.kind === 'project' && (
            <div className="mt-4 grid gap-4">
              {(msg.payload.items as Project[]).map((project, i) => (
                <ProjectCard key={i} project={{ ...project, links: project.links ?? {} }} />
              ))}
            </div>
          )}

          {/* Link */}
          {msg.payload?.kind === 'link' && (
            <div className="mt-4">
              <a
                href={msg.payload.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium underline"
              >
                {msg.content || "Click here to view my resume"}
              </a>
            </div>
          )}

          {/* Experience Timeline */}
          {msg.payload?.kind === 'experience' && (
            <div className="mt-4">
              <ExperienceTimeline items={msg.payload.items} />
            </div>
          )}

          {/* Skills */}
          {msg.payload?.kind === 'skills' && (
            <div className="mt-4">
              <Skills description={(msg.payload as any).description} />
            </div>
          )}

          {/* Contact */}
          {msg.payload?.kind === 'contact' && (
            <div className="mt-4">
              <Contact contact={msg.payload.contact} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
