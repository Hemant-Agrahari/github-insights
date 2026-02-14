import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    href: string;
    label: string;
    className?: string;
}

export const BackButton = ({ href, label, className }: BackButtonProps) => {
    return (
        <Link href={href} className={cn("inline-block", className)}>
            <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-slate-500 hover:text-slate-900 transition-colors -ml-2 font-medium"
            >
                <ArrowLeft className="w-4 h-4" />
                {label}
            </Button>
        </Link>
    );
};
