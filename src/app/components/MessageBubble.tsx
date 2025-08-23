import React from 'react';
import { Terminal } from 'lucide-react';
import type { Message } from '@/app/lib/types';
import ProjectCard from './ProjectCard';
import ExperienceTimeline from './ExperienceTimeline';

type ContactInfo = {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
};

function Contact({ contact }: { contact: ContactInfo }) {
    return (
        <div className="space-y-3 font-['JetBrains_Mono'] text-[24px]">
            {contact.email && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">Email: </span>
                    <a className="underline hover:no-underline transition-all" href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
            )}
            {contact.phone && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">Phone: </span>
                    <a className="underline hover:no-underline transition-all" href={`tel:${contact.phone}`}>{contact.phone}</a>
                </div>
            )}
            {contact.location && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">Location: </span>
                    <span>{contact.location}</span>
                </div>
            )}
            {contact.linkedin && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">LinkedIn: </span>
                    <a className="underline hover:no-underline transition-all" href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a>
                </div>
            )}
            {contact.github && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">GitHub: </span>
                    <a className="underline hover:no-underline transition-all" href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a>
                </div>
            )}
            {contact.twitter && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">Twitter/X: </span>
                    <a className="underline hover:no-underline transition-all" href={contact.twitter} target="_blank" rel="noopener noreferrer">{contact.twitter}</a>
                </div>
            )}
            {contact.website && (
                <div className="text-[24px]">
                    <span className="text-muted-foreground font-medium">Website: </span>
                    <a className="underline hover:no-underline transition-all" href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a>
                </div>
            )}
        </div>
    );
}

type AboutProps = {
    description?: string;
    highlights?: string[];
    stats?: Record<string, string | number>;
};

function About({ description, highlights = [] }: AboutProps) {
    // Function to highlight specific words/phrases
    const renderHighlightedText = (text: string) => {
        const highlightWords = [
            'full-stack developer', 'software engineer', 'React', 'Node.js', 'TypeScript',
            'scalable', 'backend systems', 'web3', 'blockchain', 'passionate',
            'innovative', 'user-focused', 'efficient', 'modern technologies'
        ];
        
        let highlightedText = text;
        
        highlightWords.forEach(word => {
            const regex = new RegExp(`\\b(${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, (match) => 
                `<span class="highlight-word">${match}</span>`
            );
        });
        
        return { __html: highlightedText };
    };

    return (
        <div className="w-full font-['JetBrains_Mono']">
            {/* Main Description */}
            {description && (
                <div 
                    className="text-[24px] leading-relaxed mb-6 about-description"
                    dangerouslySetInnerHTML={renderHighlightedText(description)}
                />
            )}
            
            {/* Highlights */}
            {highlights.length > 0 && (
                <div className="space-y-3">
                    <div className="text-[24px] font-semibold text-amber-400 mb-4">What I focus on:</div>
                    <div className="grid gap-3">
                        {highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                                <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                                <span className="text-[24px] text-gray-300 leading-relaxed">{highlight}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Custom CSS for highlighting */}
            <style jsx>{`
                .about-description :global(.highlight-word) {
                    background: linear-gradient(120deg, rgba(245, 158, 11, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%);
                    color: rgb(251, 191, 36);
                    padding: 3px 6px;
                    border-radius: 4px;
                    font-weight: 600;
                    border-bottom: 1px solid rgba(245, 158, 11, 0.3);
                    text-decoration: none;
                }
                
                .about-description :global(p) {
                    margin-bottom: 1rem;
                    line-height: 1.7;
                }
                
                .about-description :global(strong) {
                    color: rgb(229, 231, 235);
                    font-weight: 700;
                }
            `}</style>
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
            {/* User messages: just the text, no container */}
            {isUser ? (
                <div className="font-['JetBrains_Mono'] text-[24px] leading-relaxed text-gray-900 dark:text-white">
                    <div className="whitespace-pre-line">{textContent}</div>
                </div>
            ) : (
                /* Assistant messages: keep existing styling but remove timestamp */
                <div className="max-w-5xl p-6 rounded-lg font-['JetBrains_Mono'] bg-transparent text-gray-900 dark:text-white">
                    {/* Assistant header only for non-text payloads */}
                    {!isTextResponse && (
                        <div className="flex items-center gap-3 mb-4 text-orange-400">
                            {getResponseIcon()}
                            <span className="text-[24px] font-semibold">
                                {msg.payload?.kind === 'projects' && 'Projects'}
                                {msg.payload?.kind === 'experience' && 'Experience'}
                                {msg.payload?.kind === 'skills' && 'Skills'}
                                {msg.payload?.kind === 'about' && 'About'}
                                {msg.payload?.kind === 'contact' && 'Contact'}
                                {(!msg.payload || msg.payload.kind === 'text') && 'Response'}
                            </span>
                        </div>
                    )}

                    {/* Text responses: start after icon with a space */}
                    {isTextResponse && (
                        <div className="flex items-start gap-3">
                            <Terminal className="w-6 h-6 mt-1 text-orange-400 flex-shrink-0" />
                            <div className="whitespace-pre-line text-[24px] leading-relaxed">{textContent}</div>
                        </div>
                    )}

                    {msg.payload?.kind === 'projects' && (
                        <div className="grid gap-4 mt-3 sm:grid-cols-2">
                            {msg.payload.items.map((p, i) => <ProjectCard key={i} project={p} />)}
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
                                <div key={group} className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-800/50">
                                    <div className="font-semibold text-amber-400 mb-3 text-[24px]">{group}</div>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map(s => (
                                            <span key={s} className="text-lg px-3 py-1.5 rounded-full bg-zinc-700 text-gray-300 border border-zinc-600 font-medium">
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
                            <Contact 
                                contact={{
                                    email: msg.payload.email,
                                    phone: msg.payload.phone,
                                    location: msg.payload.location,
                                    linkedin: msg.payload.linkedin,
                                    github: msg.payload.github,
                                    twitter: msg.payload.twitter,
                                    website: msg.payload.website
                                }}
                            />
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

                    {/* Timestamp removed from assistant messages */}
                </div>
            )}
        </div>
    );
}