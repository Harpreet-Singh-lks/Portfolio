import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');
// Slugs come from filenames and URLs; this also blocks path traversal.
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export type PostMeta = { slug: string; title: string; date: string; summary: string };
export type Post = PostMeta & { html: string };

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: match[2] };
}

function readPost(slug: string): Post | null {
  if (!SLUG.test(slug)) return null;
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, body } = parseFrontmatter(fs.readFileSync(file, 'utf8'));
  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    summary: data.summary || '',
    html: marked.parse(body, { async: false }) as string,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readPost(f.slice(0, -3)))
    .filter((p): p is Post => p !== null)
    .map(({ html: _html, ...meta }) => meta)
    .sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
}

export function getPost(slug: string): Post | null {
  return readPost(slug);
}

export function formatDate(iso: string): string {
  const t = Date.parse(iso);
  if (!t) return '';
  return new Date(t).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
