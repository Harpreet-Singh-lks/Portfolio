import { about } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

export default function AboutCard() {
  return (
    <section id="about" className="flex flex-col px-6 py-8 md:min-h-screen md:flex-row md:items-center md:px-8">
      <h2 className="mb-6 font-display text-[40px] tracking-[-0.02em] text-white md:hidden">About</h2>
      <ScrollFadeIn className="w-full">
        <div className="flex w-full md:min-h-[calc(100vh-4rem)] flex-col justify-center rounded-md bg-rust p-6 sm:p-8 md:p-12">
          <div className="max-w-md space-y-5 text-[17px] leading-[1.8] text-white/90">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {about.quote && (
              <blockquote className="pt-2 font-display text-[28px] leading-[1.5] italic text-white/80">
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
