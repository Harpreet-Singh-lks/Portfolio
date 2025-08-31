"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  description: string;
};

type Props = {
  items: ExperienceItem[];
};

const listVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.42, 0, 0.58, 1] },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    },
  },
};

const ExperienceTimeline: React.FC<Props> = ({ items }: Props) => {
  return (
    <motion.div
      className="relative flex flex-col items-start max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {/* Vertical Line */}
      <motion.div
        className="absolute left-[10px] sm:left-[13px] top-0 w-[2px] sm:w-[3px] h-full bg-gradient-to-b from-amber-400/80 via-amber-300/60 to-zinc-700/40 rounded-full shadow-sm"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.42, 0, 0.58, 1] }}
        style={{ transformOrigin: "top" }}
      />

      {items.map((exp, index) => (
        <motion.div
          key={index}
          className="relative pl-12 sm:pl-16 mb-8 sm:mb-12"
          variants={itemVariants}
        >
          {/* Timeline Dot */}
          <motion.div
            className="absolute left-[2px] sm:left-[5px] top-2 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 ring-3 sm:ring-4 ring-zinc-800/80 shadow-lg"
            variants={dotVariants}
            whileHover={{
              scale: 1.2,
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)",
              transition: { duration: 0.2 },
            }}
          >
            <div className="absolute inset-0 rounded-full bg-amber-200/30 animate-pulse" />
            <div
              className="absolute -inset-1 rounded-full bg-amber-400/20 animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </motion.div>

          {/* Period pill */}
          <div className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 mb-1 sm:mb-2 rounded-full border border-zinc-700 text-xs sm:text-sm font-mono text-gray-300 bg-zinc-900 shadow-sm">
            {exp.period}
          </div>

          {/* Role & Company */}
          <h3 className="text-lg sm:text-xl font-serif italic font-semibold text-amber-400 mb-1">
            {exp.role} <span className="text-amber-400">@{exp.company}</span>
          </h3>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {exp.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExperienceTimeline;
