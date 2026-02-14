"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            variant="secondary"
            size="icon"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 rounded-full shadow-2xl transition-all duration-300 transform border border-slate-200 bg-white/80 backdrop-blur-md hover:bg-white hover:-translate-y-1",
                isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-50 pointer-events-none"
            )}
            aria-label="Back to top"
        >
            <ArrowUp className="w-5 h-5 text-slate-700" />
        </Button>
    );
};
