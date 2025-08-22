import React from 'react';
import type { ProjectCard as Project } from '@/app/lib/types';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start gap-3">
        {/* optional image */}
        <div className="flex-1">
          <h4 className="font-semibold">{project.title}</h4>
          <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="mt-3 flex gap-3 text-sm">
            {project.links.github && <a className="text-blue-600 hover:underline" href={project.links.github} target="_blank" rel="noreferrer">GitHub</a>}
            {project.links.demo && <a className="text-blue-600 hover:underline" href={project.links.demo} target="_blank" rel="noreferrer">Demo</a>}
          </div>
        </div>
      </div>
    </div>
  );
}