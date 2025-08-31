'use client';

import React from 'react';
import { Terminal } from 'lucide-react';

interface AboutProps {
  description: string;
}

// words you want to highlight
const highlightWords = ["Solidity", "Next.js", "Stripe", "Zapier", "OpenAI", "skills"];

export default function About({
  description 
}: AboutProps) {
  return (
    <div className="max-w-5xl">
      {/* Header with Terminal icon - same as other responses */}
      <div className="flex items-start gap-2 sm:gap-3">
        <Terminal className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-1 text-gray-400 flex-shrink-0" />
        <div className="about-content text-gray-400 text-base sm:text-lg md:text-xl lg:text-2xl font-Molde leading-relaxed tracking-wide space-y-4">
          <p className="whitespace-pre-line">
            {description.split(' ').map((word, i) => {
              const cleanWord = word.replace(/[.,]/g, ""); // remove punctuation for matching
              const isHighlighted = highlightWords.includes(cleanWord);

              return (
                <span
                  key={i}
                  className={`inline-block mr-1 ${isHighlighted ? "relative highlight-word" : ""}`}
                  style={{ animation: `fadeUp 400ms cubic-bezier(.2,.8,.2,1) ${i * 60}ms both` }}
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
              text-decoration: underline;
              text-decoration-color: #facc15;
              text-decoration-style: wavy;
              text-underline-offset: 4px;
              font-weight: 600;
            }
          `}</style>
        </div>
      </div>

      {/* Content */}
    </div>
  );
}