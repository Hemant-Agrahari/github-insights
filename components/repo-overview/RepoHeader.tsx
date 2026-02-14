import { Badge } from "@/components/ui/badge";
import { Star, GitFork, CircleDot, Github } from "lucide-react";

interface RepoHeaderProps {
    owner: string;
    name: string;
    description: string | null;
    stargazersCount: number;
    forksCount: number;
    openIssuesCount: number;
}

export const RepoHeader = ({
    owner,
    name,
    description,
    stargazersCount,
    forksCount,
    openIssuesCount,
}: RepoHeaderProps) => {
    return (
        <div className="space-y-2 md:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                <Github className="w-3 h-3" />
                Repository Overview
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                {owner}/<span className="text-blue-600">{name}</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-500 max-w-3xl leading-relaxed">
                {description || "No description provided for this repository."}
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
                <Badge variant="secondary" className="px-3 py-1.5 gap-2 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold">{stargazersCount.toLocaleString()}</span> stars
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 gap-2 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold">{forksCount.toLocaleString()}</span> forks
                </Badge>
                <Badge variant="secondary" className="px-3 py-1.5 gap-2 bg-white border-slate-200 text-slate-700 shadow-sm">
                    <CircleDot className="w-3.5 h-3.5 text-green-500" />
                    <span className="font-bold">{openIssuesCount.toLocaleString()}</span> issues
                </Badge>
            </div>
        </div>
    );
};
