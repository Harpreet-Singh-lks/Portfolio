'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ExperienceItem } from '@/app/lib/types';

const listVariants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 220, damping: 18 },
    },
};

const bulletsContainerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

const bulletVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

const lineVariants = {
    hidden: { scaleY: 0 },
    show: { scaleY: 1, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] } },
};

const dotVariants = {
    hidden: { scale: 0.7, opacity: 0 },
    show: {
        scale: 1,
        opacity: 1,
        transition: { type: 'spring', stiffness: 260, damping: 14 },
    },
};

export default function ExperienceTimeline({ items }: { items: ExperienceItem[] }) {
    return (
        <motion.div
            className="relative"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
        >
            <motion.div
                className="relative flex flex-col space-y-8 p-6"
                variants={listVariants}
            >
                {items.map((it, i) => (
                    <motion.div
                        key={`${it.company}-${it.role}-${i}`}
                        className="group relative grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr] gap-4 sm:gap-6 items-start"
                        variants={itemVariants}
                    >
                        {/* Timeline */}
                        <div className="relative flex justify-center">
                            {/* Animated vertical line */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-px origin-top bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 group-hover:from-blue-300 group-hover:via-blue-400 group-hover:to-blue-300 dark:group-hover:from-blue-600 dark:group-hover:via-blue-500 dark:group-hover:to-blue-600 transition-colors duration-500"
                                variants={lineVariants}
                            />
                            
                            {/* Animated dot */}
                            <motion.div className="relative z-10 mt-2" variants={dotVariants}>
                                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 shadow-lg ring-4 ring-white dark:ring-gray-900 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 dark:from-blue-400 dark:to-indigo-500 animate-pulse opacity-75 group-hover:opacity-100" />
                                </div>
                                <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 dark:border-blue-500/30 scale-150 opacity-0 group-hover:animate-ping" />
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 group-hover:translate-x-1 transition-transform duration-300">
                            <div className="space-y-1">
                                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 dark:group-hover:from-blue-400 dark:group-hover:to-indigo-400 transition-all duration-300">
                                    {it.role}
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                        @ {it.company}
                                    </span>
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 dark:bg-blue-500 group-hover:bg-indigo-500 transition-colors duration-300" />
                                </div>
                            </div>

                            {it.bullets?.length ? (
                                <motion.div className="space-y-2" variants={bulletsContainerVariants}>
                                    {it.bullets.map((bullet, idx) => (
                                        <motion.div 
                                            key={idx}
                                            className="flex items-start space-x-3 group/bullet rounded-lg p-2 -ml-2 transition-all duration-200"
                                            variants={bulletVariants}
                                        >
                                            <div className="flex-shrink-0 mt-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600 group-hover/bullet:scale-125 transition-transform duration-200" />
                                            </div>
                                            <p className="text-sm sm:text-base leading-relaxed text-gray-700 dark:text-gray-300 group-hover/bullet:text-gray-900 dark:group-hover/bullet:text-gray-100 transition-colors duration-200">
                                                {bullet}
                                            </p>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : null}

                            {i < items.length - 1 && (
                                <div className="mt-6 pt-2">
                                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-50" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {/* End of timeline indicator */}
                <motion.div
                    className="grid grid-cols-[40px_1fr] sm:grid-cols-[48px_1fr] gap-4 sm:gap-6"
                    variants={itemVariants}
                >
                    <motion.div className="flex justify-center" variants={dotVariants}>
                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
                    </motion.div>
                    <div />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
