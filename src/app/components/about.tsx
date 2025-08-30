'use client';

import React from 'react';

interface AboutProps {
  description: string;
}

// words you want to highlight
const highlightWords = ["Solidity", "Next.js", "Stripe", "Zapier", "OpenAI", "skills"];

export default function About({
  description 
}: AboutProps) {
  return (
    <div className="about-content text-gray-400 text-lg md:text-2xl font-Molde leading-relaxed tracking-wide space-y-4 max-w-5xl mx-auto">
      <p className="whitespace-pre-line">
        {description.split(' ').map((word, i) => {
          const cleanWord = word.replace(/[.,]/g, ""); // remove punctuation for matching
          const isHighlighted = highlightWords.includes(cleanWord);

          return (
            <span
              key={i}
              className={`inline-block mr-1 ${isHighlighted ? "relative highlight-word" : ""}`}
              style={{ animation: `fadeUp 900ms cubic-bezier(.2,.8,.2,1) ${i * 100}ms both` }}
            >
              {word}
            </span>
          );
        })}
      </p>

      <style jsx>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .highlight-word {
          color: #facc15; /* yellow text */
        }
        .highlight-word::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 40%;
          background: rgba(250, 204, 21, 0.4); /* soft yellow */
          z-index: -1;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
