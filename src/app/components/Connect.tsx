import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { profile, socials } from '@/app/lib/content';
import { ScrollFadeIn } from './ScrollFadeIn';

const icons = { github: Github, linkedin: Linkedin, twitter: Twitter, mail: Mail };

export default function Connect() {
  return (
    <section id="connect" className="flex min-h-screen flex-col justify-center px-6 pb-16 pt-24 md:px-12 lg:px-16">
      <ScrollFadeIn>
        <h2 className="font-display text-[40px] tracking-[-0.02em] text-white">Let&apos;s Connect</h2>
        <a href={`mailto:${profile.email}`} className="mt-4 block break-all text-2xl tracking-[-0.02em] text-white md:text-[32px] hover:text-ember">
          {profile.email}
        </a>
        <div className="mt-5 flex gap-3">
          {socials
            .filter((s) => s.href)
            .map((s) => {
              const Icon = icons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href!.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-neutral-400 transition-colors hover:border-ember hover:text-ember"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
        </div>
        <p className="mt-10 text-[13px] tracking-[0.08em] text-neutral-500">
          © {new Date().getFullYear()} {profile.fullName}. All rights reserved.
        </p>
      </ScrollFadeIn>
    </section>
  );
}
