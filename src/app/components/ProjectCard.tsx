import React from 'react';
import { ExternalLink, Github, Calendar, Award } from 'lucide-react';
import type { ProjectCard as Project } from '@/app/lib/types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:shadow-md hover:bg-zinc-900/80">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-serif italic text-amber-400 group-hover:text-amber-300 transition-colors">
            {project.title}
          </h3>
          {project.timeline && (
            <div className="flex items-center gap-1 mt-1 text-xs text-zinc-500">
              <Calendar className="w-3 h-3" />
              {project.timeline}
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 ml-3 opacity-60 group-hover:opacity-100 transition-opacity">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60 transition-all"
              title="View Source"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-zinc-400 hover:text-amber-400 hover:bg-zinc-800/60 transition-all"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-300 leading-relaxed mb-3">
        {project.description}
      </p>

      {/* Highlight */}
      {project.highlight && (
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="italic font-semibold text-amber-400">
            {project.highlight}
          </span>
        </div>
      )}

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {project.tech.map((tech, index) => (
          <span
            key={tech}
            className={`
              inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
              border transition-colors
              ${
                index === 0
                  ? 'border-amber-400/30 bg-amber-400/10 text-amber-300'
                  : 'border-zinc-700 bg-zinc-800 text-gray-300 hover:border-zinc-600'
              }
            `}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Optional image */}
      {project.image && (
        <div className="relative h-28 rounded-lg overflow-hidden bg-zinc-800/50 border border-zinc-700">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </div>
      )}

      {/* Subtle hover accent */}
      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-amber-400/10 transition-colors pointer-events-none" />
    </div>
  );
}
