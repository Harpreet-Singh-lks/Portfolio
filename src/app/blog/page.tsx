import Link from 'next/link';
import PageRail from '../components/PageRail';
import { formatDate, getAllPosts } from '../lib/blog';

export const metadata = { title: 'Blog — Harpreet Singh', description: 'Writing and notes.' };

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="min-h-screen bg-ink bg-grid">
      <PageRail
        title="Blog"
        caption="WRITING & NOTES"
        subtitle={`${posts.length} ${posts.length === 1 ? 'post' : 'posts'}`}
        backHref="/"
        backLabel="Home"
      />
      <main className="min-h-screen px-6 py-16 md:ml-[33.3333%] md:px-8">
        {posts.length === 0 ? (
          <p className="text-neutral-500">No posts yet.</p>
        ) : (
          <ul className="space-y-6">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group block rounded-md border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-ember/50 md:p-8"
                >
                  {formatDate(p.date) && (
                    <p className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ember">
                      {formatDate(p.date)}
                    </p>
                  )}
                  <h3 className="mt-3 break-words font-display text-4xl font-bold leading-none tracking-[-0.02em] text-white">
                    {p.title}
                  </h3>
                  {p.summary && <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-neutral-400">{p.summary}</p>}
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors group-hover:text-ember">
                    Read →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
