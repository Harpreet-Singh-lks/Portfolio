import { skillGroups } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function SkillGroups() {
  return (
    <section id="skills" className="px-6 py-24 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <h2 className="font-display text-3xl text-white">Skills</h2>
        <div className="mt-8 space-y-6">
          {skillGroups
            .filter((g) => g.items.length > 0)
            .map((g) => (
              <div key={g.label}>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-widest text-ember">{g.label}</p>
                <ul className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <li key={s} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-[10px] text-neutral-300">
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
