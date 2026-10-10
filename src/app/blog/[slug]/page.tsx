import { notFound } from 'next/navigation';
import PageRail from '../../components/PageRail';
import { formatDate, getAllPosts, getPost } from '../../lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} — Harpreet Singh`, description: post.summary };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-ink bg-grid">
      <PageRail
        title="Blog"
        caption={formatDate(post.date).toUpperCase() || undefined}
        subtitle={post.title}
        backHref="/blog"
        backLabel="All posts"
      />
      <main className="min-h-screen px-6 py-16 md:ml-[33.3333%] md:px-8">
        <article className="max-w-2xl">
          <h1 className="break-words font-display text-5xl font-bold !leading-none tracking-[-0.03em] text-white md:text-6xl">
            {post.title}
          </h1>
          {formatDate(post.date) && (
            <p className="mt-4 font-mono text-xs font-semibold uppercase tracking-[0.1em] text-ember">
              {formatDate(post.date)}
            </p>
          )}
          <div className="prose-blog mt-10" dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
      </main>
    </div>
  );
}
