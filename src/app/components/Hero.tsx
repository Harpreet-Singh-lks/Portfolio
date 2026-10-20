import { profile } from '@/app/lib/content';
import IdCard from './IdCard';

const btn =
  'border border-ember/60 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-ember transition-colors hover:bg-ember hover:text-ink';

export default function Hero() {
  return (
    <section id="hero" className="flex min-h-[calc(100svh-57px)] flex-col items-start justify-center gap-10 py-12 md:min-h-screen px-6 md:px-12 lg:px-16 xl:flex-row xl:items-center xl:justify-between">
      <div className="max-w-2xl">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ember/40 bg-ember/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-neutral-300">
          <span className="h-1.5 w-1.5 rounded-full bg-ember motion-safe:animate-pulse" aria-hidden />
          {profile.openTo}
        </p>
        <h1 className="font-display text-6xl font-bold !leading-[0.95] tracking-[-0.03em] text-white md:text-7xl xl:text-[96px]">
          I&apos;m {profile.name}.
        </h1>
        <p className="mt-4 text-[15px] font-medium tracking-[0.06em] text-neutral-400">
          {profile.role} <span className="mx-2 hidden text-neutral-600 sm:inline">·</span>
          <span className="block sm:inline">{profile.tagline}</span>
        </p>
        <div className="my-5 h-px w-16 bg-ember" />
        <p className="max-w-lg text-[17px] leading-[1.7] text-neutral-400">{profile.bio}</p>
        <div className="mt-6 flex gap-3">
          <a href="#projects" className={btn}>View Work →</a>
          <a href="#connect" className={btn}>Get in Touch →</a>
        </div>
      </div>
      <div className="self-center xl:mr-20 xl:self-auto 2xl:mr-32">
        <IdCard />
      </div>
    </section>
  );
}
