import React from 'react';
import { ExternalLink, Github, Calendar, Award, Sparkles } from 'lucide-react';
import type { ProjectCard as Project } from '@/app/lib/types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative w-full rounded-2xl border border-zinc-800/60 bg-gradient-to-br from-zinc-900/70 via-zinc-900/60 to-zinc-900/50 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/5 hover:bg-gradient-to-br hover:from-zinc-900/90 hover:via-zinc-900/80 hover:to-zinc-800/70 hover:scale-[1.02] hover:-translate-y-1">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_70%)]" />
      
      {/* Animated Border Glow */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-sm" />
      
      {/* Header */}
      <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-serif italic text-amber-400 group-hover:text-amber-300 transition-all duration-300 break-words group-hover:drop-shadow-sm">
              {project.title}
            </h3>
            {project.highlight && (
              <div className="animate-pulse">
                <Sparkles className="w-4 h-4 text-amber-400/80" />
              </div>
            )}
          </div>
          {project.timeline && (
            <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
              <Calendar className="w-3 h-3 shrink-0" />
              <span className="truncate font-mono">{project.timeline}</span>
            </div>
          )}
        </div>

        {/* Enhanced Action buttons */}
        <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-all duration-300 shrink-0">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/20 border border-transparent hover:border-amber-400/20"
              title="View Source"
            >
              <Github className="w-4 h-4" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="relative p-2 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-400/20 border border-transparent hover:border-amber-400/20"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </a>
          )}
        </div>
      </div>

      {/* Enhanced Description */}
      <p className="relative text-sm sm:text-base text-gray-300 leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
        {project.description}
      </p>

      {/* Enhanced Highlight */}
      {project.highlight && (
        <div className="relative flex items-center gap-2 mb-4 text-sm sm:text-base p-3 rounded-lg bg-gradient-to-r from-amber-400/5 to-transparent border border-amber-400/20 group-hover:from-amber-400/10 group-hover:border-amber-400/30 transition-all duration-300">
          <Award className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span className="italic font-semibold text-amber-400 break-words group-hover:text-amber-300 transition-colors">
            {project.highlight}
          </span>
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-amber-400/5 via-transparent to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {/* Enhanced Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span
            key={tech}
            className={`
              relative inline-flex items-center px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium
              border transition-all duration-300 hover:scale-105 cursor-default
              ${
                index === 0
                  ? 'border-amber-400/40 bg-gradient-to-r from-amber-400/15 to-amber-400/10 text-amber-300 hover:border-amber-400/60 hover:bg-gradient-to-r hover:from-amber-400/25 hover:to-amber-400/15 shadow-sm hover:shadow-amber-400/20'
                  : 'border-zinc-700/80 bg-gradient-to-r from-zinc-800/80 to-zinc-800/60 text-gray-300 hover:border-zinc-600 hover:bg-gradient-to-r hover:from-zinc-700/80 hover:to-zinc-700/60 hover:text-gray-200'
              }
            `}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {tech}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </span>
        ))}
      </div>

      {/* Enhanced Image */}
      {project.image && (
        <div className="relative w-full h-40 sm:h-52 rounded-xl overflow-hidden bg-zinc-800/50 border border-zinc-700/60 group-hover:border-zinc-600/80 transition-all duration-300 group-hover:shadow-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500 filter group-hover:brightness-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
          {/* Image overlay effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      {/* Enhanced Hover Effects */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-amber-400/20 transition-all duration-500 pointer-events-none" />
      
      {/* Subtle shine effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/0 via-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Corner accent */}
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400/0 group-hover:bg-amber-400/30 transition-all duration-500" />
    </div>
  );
}