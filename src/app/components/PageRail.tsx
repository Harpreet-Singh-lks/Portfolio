import Link from 'next/link';

type Props = {
  title: string;
  caption?: string;
  subtitle?: string;
  backHref: string;
  backLabel: string;
};

// Static counterpart of LeftRail for pages that aren't the scrolling home.
export default function PageRail({ title, caption, subtitle, backHref, backLabel }: Props) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-1/3 border-r-2 border-ember bg-gradient-to-r from-ink to-[#1a0f0b] md:block">
        <div className="flex h-full flex-col justify-center px-16 lg:px-24">
          <h2 className="font-display text-5xl font-light !leading-[0.95] tracking-[-0.03em] text-ember lg:text-7xl xl:text-[80px]">
            {title}
          </h2>
          {caption && (
            <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-neutral-400">{caption}</p>
          )}
          {subtitle && <p className="mt-2 font-display text-base italic text-neutral-500">{subtitle}</p>}
        </div>
        <nav aria-label="Navigation" className="absolute bottom-10 left-16 text-sm uppercase tracking-widest lg:left-24">
          <Link href={backHref} className="text-neutral-500 transition-colors hover:text-ember">← {backLabel}</Link>
        </nav>
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-white/10 bg-ink/90 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="font-display text-2xl text-ember">Portfolio</Link>
        <Link href={backHref} className="text-sm uppercase tracking-widest text-neutral-400">← {backLabel}</Link>
      </header>
    </>
  );
}
