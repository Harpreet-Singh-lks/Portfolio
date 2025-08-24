'use client';

import React from 'react';

interface AboutProps {
  name?: string;
  title?: string;
  description: string;
  highlights?: string[];
  stats?: { label: string; value: string }[];
}

export default function About({
  // Defaults kept but unused to keep API stable
  name = "Harpreet Singh",
  title = "Backend & Blockchain Developer · 4th-year BTech EE @ IIT Roorkee",
  description = "I’m Harpreet Singh, a 4th‑year BTech Electrical Engineering student at IIT Roorkee with strong backend experience and a deep interest in DeFi and blockchain. I love exploring and building across the stack. I work with TypeScript, Rust, Go, Python, Assembly, C/C++, and SQL, and with EVM, Docker, Vite, Next.js, Remix, Astro, Tailwind CSS, Ethers.js, Flask, Django, Linux, and Git.",
}: AboutProps) {
  const renderHighlightedText = (text: string) => {
    const highlightWords = [
      'IIT Roorkee', 'Electrical Engineering', '4th-year',
      'backend', 'scalable systems', 'DeFi', 'blockchain', 'web3',
      'TypeScript', 'Go', 'Rust', 'Python', 'C/C++', 'SQL', 'Assembly',
      'Next.js', 'Remix', 'Astro', 'Tailwind CSS', 'Docker', 'Linux', 'Git',
      'Ethers.js', 'Flask', 'Django', 'Vite', 'EVM',
      'exploring', 'building'
    ];

    let highlightedText = text;
    highlightWords.forEach((word) => {
      const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`\\b(${escaped})\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, (match) => `<mark class="highlight-word">${match}</mark>`);
    });

    return { __html: highlightedText };
  };

  return (
    <div className="about-content text-gray-300 leading-relaxed">
      <div dangerouslySetInnerHTML={renderHighlightedText(description)} />
      <style jsx>{`
        .about-content :global(.highlight-word) {
          background: linear-gradient(120deg, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0.08) 100%);
          color: rgb(251, 191, 36);
          padding: 1px 4px;
          border-radius: 3px;
          font-weight: 500;
          border-bottom: 1px solid rgba(245, 158, 11, 0.35);
        }
      `}</style>
    </div>
  );
}