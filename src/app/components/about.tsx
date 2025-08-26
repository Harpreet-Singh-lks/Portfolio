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
  
  description = "I’m Harpreet Singh, a 4th-year BTech Electrical Engineering student at IIT Roorkee with strong backend experience and a deep interest in DeFi and blockchain. I love exploring and building across the stack. I work with TypeScript, Rust, Go, Python, Assembly, C/C++, and SQL, and with EVM, Docker, Vite, Next.js, Remix, Astro, Tailwind CSS, Ethers.js, Flask, Django, Linux, and Git.",
}: AboutProps) {
  return (
    <div className="about-content text-gray-300 font-mono leading-relaxed space-y-2">
      
      <p>{description}</p>
    </div>
  );
}
