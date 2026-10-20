import { about } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

const highlight = 'font-semibold text-white';
const link = `${highlight} underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white`;

export default function AboutCard() {
  return (
    <section id="about" className="flex flex-col px-6 py-8 md:min-h-screen md:flex-row md:items-center md:px-8">
      <h2 className="mb-6 font-display text-[40px] tracking-[-0.02em] text-white md:hidden">About</h2>
      <ScrollFadeIn className="w-full">
        <div className="flex w-full md:min-h-[calc(100vh-4rem)] flex-col justify-center rounded-md bg-rust p-6 sm:p-8 md:p-12">
          <div className="max-w-md space-y-5 text-[17px] leading-[1.8] text-white/90">
            {about.paragraphs.map((segments, i) => (
              <p key={i}>
                {segments.map((seg, j) =>
                  typeof seg === 'string' ? (
                    seg
                  ) : seg.href ? (
                    <a
                      key={j}
                      href={seg.href}
                      target={seg.href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className={link}
                    >
                      {seg.text}
                    </a>
                  ) : (
                    <span key={j} className={highlight}>
                      {seg.text}
                    </span>
                  ),
                )}
              </p>
            ))}
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
}
