import { featuredProjects, projects } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';
import FeaturedProject from './FeaturedProject';
import ProjectGrid from './ProjectGrid';

export default function ProjectsBlock() {
  return (
    <section id="projects" className="flex flex-col md:min-h-screen justify-center px-6 py-16 md:px-8">
      <h2 className="mb-6 font-display text-[40px] tracking-[-0.02em] text-white md:hidden">Work</h2>
      <div className="space-y-6">
        {featuredProjects.map((p, i) => (
          <ScrollFadeIn key={p.title} delay={i * 0.1}>
            <FeaturedProject project={p} />
          </ScrollFadeIn>
        ))}
      </div>
      {projects.length > 0 && (
        <ScrollFadeIn className="mt-12">
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">More Projects</p>
          <ProjectGrid items={projects} />
        </ScrollFadeIn>
      )}
    </section>
  );
}
