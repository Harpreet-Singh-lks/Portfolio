import { about } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function AboutCard() {
  return (
    <section id="about" className="px-6 py-24 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <div className="flex min-h-[420px] flex-col justify-center rounded-md bg-rust p-8 md:p-12">
          <div className="max-w-md space-y-4 text-sm leading-relaxed text-white/90">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {about.quote && (
              <blockquote className="pt-2 font-display text-lg italic text-white/80">
                <span className="mr-2 text-2xl text-ember">&ldquo;</span>
                {about.quote}
              </blockquote>
            )}
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
