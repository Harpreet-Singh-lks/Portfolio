'use client';

import React from 'react';
import { Terminal } from 'lucide-react';

interface SkillsProps {
  description: string;
}

export default function Skills({ description = '' }: SkillsProps) {
  return (
    <div className="flex gap-3">
      <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 flex-shrink-0 mt-1" />
      <div className="text-sm sm:text-base leading-relaxed text-gray-300 whitespace-pre-wrap break-words flex-1">
        {description}
      </div>
    </div>
  );
}
