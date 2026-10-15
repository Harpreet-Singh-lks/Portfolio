import { experience } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function Experience() {
  return (
    <section id="experience" className="flex flex-col md:min-h-screen justify-center px-6 py-16 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <h2 className="font-display text-[40px] tracking-[-0.02em] text-white">Experience</h2>
        <ol className="mt-8 space-y-10 border-l border-white/15 pl-6">
          {experience.map((e) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[29px] top-2 h-2 w-2 rounded-full bg-ember" />
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ember">{e.period}</p>
              <h3 className="mt-1 font-display text-2xl text-white">
                {e.role} · {e.company}
              </h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[15px] text-neutral-300 marker:text-neutral-600">
                {e.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2">
                {e.tags.map((t) => (
                  <li key={t} className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-neutral-300">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </ScrollFadeIn>
    </section>
  );
}
