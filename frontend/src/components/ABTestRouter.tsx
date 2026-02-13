import React, { useEffect, useState } from 'react';

// A/B Test Landing Page Router
// Randomly assigns users to variant A (original) or variant B (nature)
// Uses localStorage to persist assignment for consistent UX

interface ABTestRouterProps {
    variantA: React.ReactNode;
    variantB: React.ReactNode;
    testName?: string;
    splitRatio?: number; // 0-100, percentage of users shown variant B
}

const AB_STORAGE_KEY = 'ab_landing_variant';

const ABTestRouter: React.FC<ABTestRouterProps> = ({
    variantA,
    variantB,
    testName = 'landing_page',
    splitRatio = 50, // 50/50 split by default
}) => {
    const [variant, setVariant] = useState<'A' | 'B' | null>(null);

    useEffect(() => {
        // Check if user already has an assigned variant
        const storedVariant = localStorage.getItem(AB_STORAGE_KEY);

        if (storedVariant === 'A' || storedVariant === 'B') {
            setVariant(storedVariant);
        } else {
            // Randomly assign variant based on split ratio
            const randomValue = Math.random() * 100;
            const assignedVariant = randomValue < splitRatio ? 'B' : 'A';

            // Persist in localStorage
            localStorage.setItem(AB_STORAGE_KEY, assignedVariant);
            setVariant(assignedVariant);
        }
    }, [splitRatio]);

    useEffect(() => {
        if (variant && window.gtag) {
            // Track which variant was shown
            window.gtag('event', 'ab_test_assigned', {
                event_category: 'ab_test',
                event_label: testName,
                variant: variant,
                test_name: testName
            });
        }
    }, [variant, testName]);

    // Show loading state while determining variant
    if (variant === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900">
                <div className="w-8 h-8 border-2 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <>{variant === 'A' ? variantA : variantB}</>;
};

export default ABTestRouter;

// Utility hook to get current variant
export const useABVariant = (): 'A' | 'B' | null => {
    const [variant, setVariant] = useState<'A' | 'B' | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem(AB_STORAGE_KEY);
        if (stored === 'A' || stored === 'B') {
            setVariant(stored);
        }
    }, []);

    return variant;
};

// Utility to force a specific variant (for testing)
export const forceVariant = (variant: 'A' | 'B'): void => {
    localStorage.setItem(AB_STORAGE_KEY, variant);
    window.location.reload();
};

// Utility to clear variant (will reassign on next visit)
export const clearVariant = (): void => {
    localStorage.removeItem(AB_STORAGE_KEY);
};
