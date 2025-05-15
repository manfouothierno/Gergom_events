// src/components/home/Counter.tsx - Adapted for Sanity data

import React, { useRef, useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'

// Import specific Font Awesome icons
import { FaTrophy, FaUsers, FaCalendarAlt, FaSmile, FaQuestionCircle } from 'react-icons/fa';

// Utility to map icon name string to React component (Ensure this matches getIconByName)
export const getIconComponentByName = (name?: string) => {
    const FaIcons = { FaTrophy, FaUsers, FaCalendarAlt, FaSmile, FaQuestionCircle }; // List the icons you plan to use
    if (!name || !(FaIcons as any)[name]) {
        console.warn(`Icon component not found for name: ${name}`);
        return FaQuestionCircle; // Fallback icon
    }
    return (FaIcons as any)[name];
};


// Import type for StatItem
import { StatItem } from '@/types/aboutSection';

// Define props interface for Counter (based on StatItem + original animation props)
interface CounterProps {
    // Direct data from StatItem
    to: number; // This maps to StatItem.value
    label: string; // This maps to StatItem.label
    iconName: string; // This maps to StatItem.iconName (string)
    valueSuffix?: string | null; // New optional suffix field

    // Animation control props
    from?: number; // Optional starting value
    duration?: number; // Optional animation duration in seconds
}


// Counter component (simplified prop names and using getIconComponentByName)
// Using the props directly now
const Counter = ({ from = 0, to, duration = 2, label, iconName, valueSuffix = '+' }: CounterProps) => {
    const [count, setCount] = useState(from)
    const nodeRef = useRef(null)

    // Hook for scroll progress targeting THIS element
    const { scrollYProgress } = useScroll({
        target: nodeRef,
        offset: ["start end", "end center"] // Animation triggers when the element comes into view
    })

    // Map icon name string to actual component
    const IconComponent = getIconComponentByName(iconName);


    useEffect(() => {
        let animationFrameId: number | null = null; // Explicit type
        let startTime: number | null = null; // Explicit type

        const countTo = to;
        // Ensure 'to' is a number
        if (typeof countTo !== 'number' || isNaN(countTo)) {
            console.error("Counter 'to' value is not a valid number:", to);
            setCount(to as any); // Attempt to display original value or error state
            return; // Stop execution if 'to' is invalid
        }

        const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4); // Animation easing function


        const step = (timestamp: number) => { // Explicit type for timestamp
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1); // progress 0 to 1
            const easedProgress = easeOutQuart(progress);
            const nextCount = Math.floor(from + (countTo - from) * easedProgress);

            setCount(nextCount); // Update state

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step); // Continue animation
            }
        };

        let hasTriggered = false; // Flag to prevent re-triggering

        // Subscribe to scroll progress changes
        const unsubscribe = scrollYProgress.onChange(value => {
            // Check if the element is in view and animation hasn't triggered yet
            // A value > 0 when offset is ["start end", "end center"] means the start of the target is past the end of the container, i.e., it has entered the view from the bottom.
            if (value > 0 && !hasTriggered) {
                hasTriggered = true; // Set flag
                animationFrameId = requestAnimationFrame(step); // Start animation
            }
            // Add condition to reset if it scrolls *back* out of view maybe? Less common for counters.
        });


        // Cleanup: Remove scroll listener and cancel animation frame
        return () => {
            unsubscribe(); // Clean up the scroll subscription
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId); // Cancel any pending animation frame
            }
        };
        // Rerun effect if 'to', 'from', 'duration', or scrollYProgress target changes (unlikely scrollYProgress target changes)
        // or if 'hasTriggered' needs to reset for potential component reuse/re-render logic
    }, [from, to, duration, scrollYProgress, ]); // Added hasTriggered dependency for effect restart logic

    return (
        // Attach the ref to the element being tracked for scroll
        <div ref={nodeRef} className="flex flex-col items-center">
            {/* Render the icon component */}
            {IconComponent && ( // Only render if icon component was found
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white text-xl"> {/* Color still hardcoded, could be a prop from AboutSection or global setting */}
                    <IconComponent />
                </div>
            )}

            <div className="text-4xl font-bold mb-2 text-gray-800">
                {/* Display the animated count */}
                {count}
                {/* Display the suffix from data or default '+' */}
                <span className="text-red-600">{valueSuffix}</span> {/* Color still hardcoded */}
            </div>
            {/* Display the label from data */}
            <div className="text-gray-600">{label}</div>
        </div>
    );
}

// Re-export the Counter component
export default Counter;