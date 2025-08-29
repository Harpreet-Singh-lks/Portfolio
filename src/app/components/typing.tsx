"use client";

import React from "react";

type TypingMessageProps = {
  text: string;
};

const TypingMessage: React.FC<TypingMessageProps> = ({ text }) => {
  return (
    <div className="whitespace-pre-line">
      {text.split(" ").map((word, i) => (
        <span
          key={i}
          className="inline-block mr-1"
          style={{
            animation: `fadeUp 600ms cubic-bezier(.2,.8,.2,1) ${i * 120}ms both`,
          }}
        >
          {word}
        </span>
      ))}

      <style jsx>{`
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TypingMessage;
