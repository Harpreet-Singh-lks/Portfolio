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

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    },
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
      {/* Enhanced Vertical Line with Gradient */}
      <motion.div
        className="absolute left-[13px] top-0 w-[3px] h-full bg-gradient-to-b from-amber-400/80 via-amber-300/60 to-zinc-700/40 rounded-full shadow-sm"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
      />

      {items.map((exp, index) => (
        <motion.div
          key={index}
          className="relative pl-16 mb-12"
          variants={itemVariants}
        >
          {/* Enhanced Timeline Dot with Pulse Animation */}
          <motion.div
            className="absolute left-[5px] top-2 w-4 h-4 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 ring-4 ring-zinc-800/80 shadow-lg"
            variants={dotVariants}
            whileHover={{ 
              scale: 1.2, 
              boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)",
              transition: { duration: 0.2 }
            }}
          >
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-full bg-amber-200/30 animate-pulse" />
            {/* Outer ring glow */}
            <div className="absolute -inset-1 rounded-full bg-amber-400/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </motion.div>

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