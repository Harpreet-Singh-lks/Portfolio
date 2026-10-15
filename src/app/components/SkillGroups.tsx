import { skillGroups } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function SkillGroups() {
  return (
    <section id="skills" className="flex flex-col md:min-h-screen justify-center px-6 py-16 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <h2 className="font-display text-[40px] tracking-[-0.02em] text-white">Skills</h2>
        <div className="mt-8 space-y-6">
          {skillGroups
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <div key={g.label}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ember">{g.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-1.5 text-sm text-neutral-300">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </ScrollFadeIn>
    </section>
  );
}
