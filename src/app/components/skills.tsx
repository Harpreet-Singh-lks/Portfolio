'use client';

import React from 'react';


interface AboutProps {
  description: string;
}

export default function Skills({
  description = ''
}: AboutProps) {
  return (
    <div className="about-content text-gray-400 text-lg md:text-xl font-Molde leading-relaxed tracking-wide space-y-4 max-w-3xl mx-auto">
      <p className="whitespace-pre-line">
        {description.split(' ').map((word, i) => (
          <span
        key={i}
        className="inline-block mr-1"
        style={{ animation: `fadeUp 900ms cubic-bezier(.2,.8,.2,1) ${i * 100}ms both` }}
          >
        {word}
          </span>
        ))}
      </p>

      <style jsx>{`
      @keyframes fadeUp {
        0% { opacity: 0; transform: translateY(8px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      `}</style>
    </div>
  );
}
