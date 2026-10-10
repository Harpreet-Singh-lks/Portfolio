import { about } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function AboutCard() {
  return (
    <section id="about" className="flex min-h-screen items-center px-6 py-8 md:px-8">
      <ScrollFadeIn className="w-full">
        <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col justify-center rounded-md bg-rust p-8 md:p-12">
          <div className="max-w-md space-y-5 text-base leading-[1.9] text-white/90">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {about.quote && (
              <blockquote className="pt-2 font-display text-2xl italic text-white/80">
                <span className="mr-2 text-3xl text-white/80">&ldquo;</span>
                {about.quote}
              </blockquote>
            )}
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
