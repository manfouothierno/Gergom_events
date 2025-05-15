// src/components/home/AnimatedStat.tsx
'use client';

import React, {useEffect, useRef, useState} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHeadset, FaCalendarCheck, FaTools, FaUsers, FaTrophy, FaQuestionCircle } from 'react-icons/fa';
import {from} from "rxjs"; // Import potential icons

// Utility to map icon name string to React component
const getIconComponentByName = (name?: string) => {
    const FaIcons = { FaHeadset, FaCalendarCheck, FaTools, FaUsers, FaTrophy, FaQuestionCircle }; // List ALL potential icons you might use
    if (!name || !(FaIcons as any)[name]) {
        console.warn(`Icon component not found for name: ${name}`);
        return FaQuestionCircle; // Fallback icon
    }
    return (FaIcons as any)[name];
};

// Define props for AnimatedStat
interface AnimatedStatProps {
    // Direct data from CtaStatItem
    numericValue: number; // The number for the animation count
    displayValue: string; // The text actually shown
    label: string;
    iconName: string; // Icon name string
    // Add duration prop if you added it to the schema
    duration?: number; // Optional: Keep local duration prop or get from parent
}

const AnimatedStat = ({ numericValue, displayValue, label, iconName, duration = 2 }: AnimatedStatProps) => {
    const ref = useRef(null);

    // Use useScroll with a target ref
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end center"] // Trigger animation when the component's start reaches container's end
    });

    // useTransform for the count value, animating from 0 to numericValue
    const count = useTransform(scrollYProgress, [0, 1], [0, numericValue]);

    // Map the iconName string to the component
    const IconComponent = getIconComponentByName(iconName);

    // Create a motion value observer for the counter
    // This is a bit more complex - let's use a simpler useEffect based counter like in AboutSection's Counter
    // OR simply animate `opacity`/`y` and show `displayValue` when in view
    // Keeping your useTransform logic, but it will require a small trick for string values.
    // A simpler approach: use a state counter in useEffect like before

    const [animatedCount, setAnimatedCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        let animationFrameId: number | null = null;
        let startTime: number | null = null;

        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            const easedProgress = easeOutQuart(progress);

            // Animate towards the numeric value
            const nextCount = from + (numericValue - from) * easedProgress;
            setAnimatedCount(Math.floor(nextCount));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            } else {
                // Animation finished, optionally snap to the exact display value or keep last animated number
                setAnimatedCount(numericValue); // Ensure it lands exactly on the numeric value
            }
        };

        const unsubscribe = scrollYProgress.onChange(value => {
            // Trigger animation when entering view (value > 0 for "start end" offset)
            if (value > 0 && !hasAnimated) {
                setHasAnimated(true); // Trigger only once
                // Set initial 'from' value for the animation dynamically
                // You could make 'from' a prop, but 0 is a common default
                const fromValue = 0;
                startTime = null; // Reset start time for animation
                setAnimatedCount(fromValue); // Start counter from 'fromValue'
                animationFrameId = requestAnimationFrame(step); // Start the animation loop
            }
            // To restart animation if element scrolls out and back in, you'd need more complex state/offset
        });

        // Cleanup
        return () => {
            unsubscribe();
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            // Don't reset hasAnimated here if you only want it to run once ever
        };
        // Effect dependencies include scrollYProgress, numericValue, duration. HasAnimated state change causes re-evaluation.
    }, [scrollYProgress, numericValue, duration, hasAnimated]); // Added dependencies

    // The displayed value will be the `displayValue` string from Sanity once animation finishes
    // OR, maybe just show the `displayValue` string the whole time? That simplifies things.
    // If you want the *counter effect*, display `animatedCount` (plus suffix) during animation,
    // and `displayValue` string after the animation or if animation skipped (e.g., server render or instant animation).
    // Let's refine to always display `displayValue` when loaded/in view, removing the numeric animation difficulty.

    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(value => {
            // If scrollProgress is between 0 and 1 (within the offset range), it's in view
            setIsInView(value > 0 && value < 1);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // Simpler approach: Animate opacity/y based on scroll progress using motion component wrapping content
    const statContentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };


    return (
        // Attach the ref for scroll tracking
        <motion.div
            ref={ref}
            className="text-center"
            // Animation will be handled by the parent CTA section or other means now
            // Remove whileInView/viewport from HERE, it should be on the *wrapper* element if used per item.
            // The outer AnimatedStat div already has this animation. Keep the ref only for useScroll hook.
            // We'll apply an opacity/y animation directly to the content here based on scrollYProgress
        >
            {/* Inner div to animate content based on scroll */}
            {/* Use motion attributes based on this component's useScroll progress */}
            {/* Simplified: Just animate opacity/y for the inner content block */}
            <motion.div
                initial="hidden"
                // Animate to 'visible' when it enters view based on ref scroll progress
                animate={isInView ? "visible" : "hidden"}
                // Delay based on index should be handled by the *parent* when mapping AnimatedStat
                transition={{ duration: 0.6 }}
                variants={statContentVariants}
            >
                {/* Render the icon component if found */}
                {IconComponent && (
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/20 backdrop-blur-sm mb-4"> {/* Keep design */}
                        <IconComponent className="text-2xl text-white" />
                    </div>
                )}

                <div className="text-4xl font-bold text-white"> {/* Keep color hardcoded for now */}
                    {/* Display the displayValue string directly from Sanity */}
                    {displayValue}
                </div>
                {/* Display the label from data */}
                <div className="text-gray-100 mt-1">{label}</div> {/* Keep color hardcoded */}

            </motion.div>
        </motion.div>
    );
};

// Re-export
export default AnimatedStat;