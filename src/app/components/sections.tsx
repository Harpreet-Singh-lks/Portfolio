'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ScrollAnimationProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const ScrollFadeIn = ({ children, delay = 0, className = '' }: ScrollAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const current = ref.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AboutSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ScrollFadeIn>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I'm a 4th-year B.Tech Electrical Engineering student at IIT Roorkee passionate about building things — whether it's backend systems, DeFi protocols, or full-stack apps.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              I've spent considerable time working with TypeScript, Rust, Go, Python, and C/C++, and I enjoy using modern tools like Docker, Next.js, Remix, and Tailwind.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I love exploring the blockchain/DeFi space and experimenting across the full stack — from smart contracts to backend infrastructure.
            </p>
          </div>

          {/* Right - Skills Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { category: 'Languages', skills: ['TypeScript', 'Rust', 'Go', 'Python'] },
              { category: 'Backend', skills: ['Node.js', 'PostgreSQL', 'Docker', 'Kafka'] },
              { category: 'Frontend', skills: ['React', 'Next.js', 'Tailwind', 'Framer'] },
              { category: 'Web3', skills: ['Solidity', 'EVM', 'Ethers.js', 'Hardhat'] },
            ].map((group, idx) => (
              <ScrollFadeIn key={group.category} delay={idx * 0.1} className="group">
                <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-4 rounded-xl
                              border border-neutral-700/50 hover:border-blue-400/30
                              transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <h3 className="text-blue-400 font-semibold mb-3 text-sm">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.skills.map(skill => (
                      <li key={skill} className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                        → {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </ScrollFadeIn>
    </section>
  );
};

export const StatsSection = () => {
  const stats = [
    { label: 'Projects Built', value: '15+' },
    { label: 'Years Experience', value: '4' },
    { label: 'Technologies', value: '20+' },
    { label: 'Code Commits', value: '1K+' },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <ScrollFadeIn key={stat.label} delay={idx * 0.1}>
            <div className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-6 rounded-xl
                          border border-neutral-700/50 hover:border-blue-400/30
                          transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">{stat.value}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          </ScrollFadeIn>
        ))}
      </div>
    </section>
  );
};
