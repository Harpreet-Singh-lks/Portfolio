import { profile } from '@/app/lib/content';

const btn =
  'border border-ember/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-ember transition-colors hover:bg-ember hover:text-ink';

export default function Hero() {
  return (
    <section id="hero" className="flex min-h-screen items-center px-6 md:px-12 lg:px-16">
      <div className="max-w-xl">
        <h1 className="font-display text-5xl font-semibold leading-tight text-white md:text-6xl">
          I&apos;m {profile.name}.
        </h1>
        <p className="mt-3 text-xs text-neutral-400">
          {profile.role} <span className="mx-2 text-neutral-600">·</span> {profile.tagline}
        </p>
        <div className="my-5 h-px w-16 bg-ember" />
        <p className="max-w-md text-sm leading-relaxed text-neutral-500">{profile.bio}</p>
        <div className="mt-6 flex gap-3">
          <a href="#projects" className={btn}>View Work →</a>
          <a href="#connect" className={btn}>Get in Touch →</a>
        </div>
      </div>
    </section>
  );
}
