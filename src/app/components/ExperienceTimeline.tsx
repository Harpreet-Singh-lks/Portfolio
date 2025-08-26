"use client";

import React from "react";
import { motion } from "framer-motion";

type ExperienceItem = {
  company: string;
  role: string;
  period: string;       // renamed to match your prop
  description: string[]; // renamed to match your prop
};

type Props = {
  items: ExperienceItem[];
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      // Use a string easing name supported by Framer Motion
      ease: "easeInOut",
      // Or: ease: "easeInOut"
    },
  },
};

const ExperienceTimeline: React.FC<Props> = ({ items }: Props) => {
  return (
    <motion.div
      className="relative flex flex-col items-start max-w-3xl mx-auto px-6 py-12"
      initial="hidden"
      animate="visible"
      variants={listVariants}
    >
      {/* Vertical Line */}
      <motion.div
        className="absolute left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {items.map((exp, index) => (
        <motion.div
          key={index}
          className="relative pl-12 mb-10"
          variants={itemVariants}
        >
          {/* Timeline Dot */}
          <motion.div
            className="absolute left-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3
              className="text-xl font-bold text-gray-900 dark:text-white"
              whileHover={{ color: "#3b82f6" }}
            >
              {exp.company}
            </motion.h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{exp.role}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
              {exp.period}
            </p>
            <ul className="list-disc list-inside space-y-2">
              {exp.description.map((point, i) => (
                <motion.li
                  key={i}
                  className="text-gray-700 dark:text-gray-300 text-sm hover:text-blue-500 transition-colors"
                  variants={itemVariants}
                >
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ExperienceTimeline;
