'use client';

import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { ScrollFadeIn } from './sections';

const projects = [
  {
    title: 'DeFi Protocol',
    description: 'Built a smart contract-based lending protocol with advanced risk management',
    tech: ['Solidity', 'Hardhat', 'TypeScript', 'React'],
    image: '🔗',
    github: 'https://github.com',
    demo: 'https://demo.com',
    highlight: 'Featured',
  },
  {
    title: 'Backend Service',
    description: 'Scalable microservices architecture handling 10K+ requests/second',
    tech: ['Go', 'PostgreSQL', 'Kafka', 'Docker'],
    image: '⚙️',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
  {
    title: 'Full Stack App',
    description: 'Modern SaaS application with real-time collaboration features',
    tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL'],
    image: '🚀',
    github: 'https://github.com',
    demo: 'https://demo.com',
  },
];

export const ProjectsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollFadeIn>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          A selection of projects I'm proud of. Each one represents my commitment to quality and innovation.
        </p>
      </ScrollFadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <ScrollFadeIn key={project.title} delay={idx * 0.1}>
            <div className="group relative h-full rounded-2xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50
                          hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/10
                          transition-all duration-300 overflow-hidden">
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-blue-400/10 to-blue-400/0
                            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon */}
                <div className="text-4xl mb-4">{project.image}</div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(tech => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-full bg-blue-400/10 text-blue-400 border border-blue-400/20">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-neutral-700/50">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    title="View source"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    title="Live demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Demo
                  </a>
                </div>

                {/* Highlight badge */}
                {project.highlight && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20
                                border border-blue-400/30 text-xs font-medium text-blue-300">
                    ⭐ {project.highlight}
                  </div>
                )}
              </div>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
};
