import React from 'react';
import { Terminal } from 'lucide-react';
import type { Message } from '@/app/lib/types';
import ProjectCard from './ProjectCard';
import ExperienceTimeline from './ExperienceTimeline';

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
            <div
                className={`max-w-2xl p-4 rounded-lg ${
                    isUser ? 'bg-blue-600 text-white' : 'bg-transparent text-gray-900 dark:text-white'
                }`}
            >
                {/* Assistant header only for non-text payloads */}
                {!isUser && !isTextResponse && (
                    <div className="flex items-center gap-2 mb-3 text-orange-400">
                        {getResponseIcon()}
                        <span className="text-sm font-medium">
                            {msg.payload?.kind === 'projects' && 'Projects'}
                            {msg.payload?.kind === 'experience' && 'Experience'}
                            {msg.payload?.kind === 'skills' && 'Skills'}
                            {(!msg.payload || msg.payload.kind === 'text') && 'Response'}
                        </span>
                    </div>
                )}

                {/* Text responses: start after icon with a space */}
                {isTextResponse ? (
                    isUser ? (
                        <div className="whitespace-pre-line">{textContent}</div>
                    ) : (
                        <div className="flex items-start">
                            <Terminal className="w-5 h-5 mt-1 text-orange-400" />
                            <div className="ml-2 whitespace-pre-line">{textContent}</div>
                        </div>
                    )
                ) : null}

                {msg.payload?.kind === 'projects' && (
                    <div className="grid gap-3 mt-2 sm:grid-cols-2">
                        {msg.payload.items.map((p, i) => <ProjectCard key={i} project={p} />)}
                    </div>
                )}

                {msg.payload?.kind === 'experience' && (
                    <div className="mt-2">
                        <ExperienceTimeline items={msg.payload.items} />
                    </div>
                )}

                {msg.payload?.kind === 'skills' && (
                    <div className="mt-2 grid gap-3 sm:grid-cols-2">
                        {Object.entries(msg.payload.groups).map(([group, skills]) => (
                            <div key={group}>
                                <div className="font-medium">{group}</div>
                                <div className="mt-1 flex flex-wrap gap-2">
                                    {skills.map(s => <span key={s} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{s}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className={`text-xs mt-2 ${isUser ? 'opacity-70' : 'text-gray-500 dark:text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString()}
                </div>
            </div>
        </div>
    );
}