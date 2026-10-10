import { featuredProjects, projects } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';
import FeaturedProject from './FeaturedProject';
import ProjectGrid from './ProjectGrid';

export default function ProjectsBlock() {
  return (
    <section id="projects" className="px-6 py-24 md:px-12 lg:px-16">
      <div className="space-y-6">
        {featuredProjects.map((p, i) => (
          <ScrollFadeIn key={p.title} delay={i * 0.1}>
            <FeaturedProject project={p} />
          </ScrollFadeIn>
        ))}
      </div>
      {projects.length > 0 && (
        <ScrollFadeIn className="mt-12">
          <p className="mb-4 text-[9px] uppercase tracking-[0.25em] text-neutral-600">More Projects</p>
          <ProjectGrid items={projects} />
        </ScrollFadeIn>
      )}
    </section>
  );
}
