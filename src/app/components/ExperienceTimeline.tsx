"use client";

import React from "react";
import { motion } from "framer-motion";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

type Props = {
  items: ExperienceItem[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const ExperienceTimeline: React.FC<Props> = ({ items }: Props) => {
  return (
    <motion.div
      className="relative flex flex-col items-start max-w-3xl mx-auto px-6 py-10"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {/* Vertical Line */}
      <motion.div
        className="absolute left-[13px] top-0 w-[2px] h-full bg-zinc-700/60"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {items.map((exp, index) => (
        <motion.div
          key={index}
          className="relative pl-16 mb-12"
          variants={itemVariants}
        >
          {/* Timeline Dot */}
          <div className="absolute left-[5px] top-2 w-3.5 h-3.5 rounded-full bg-amber-400 ring-4 ring-zinc-900 shadow-md" />

          {/* Period pill */}
          <div className="inline-block px-3 py-1 mb-2 rounded-full border border-zinc-700 text-x font-mono text-gray-300 bg-zinc-900 shadow-sm">
            {exp.period}
          </div>

          {/* Role & Company */}
          <h3 className="text-xl font-serif italic font-semibold text-amber-400 mb-1">
            {exp.role} <span className="text-amber-400">@{exp.company}</span>
          </h3>

          {/* Description */}
          <p className="text-lg text-gray-300 leading-relaxed">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExperienceTimeline;
