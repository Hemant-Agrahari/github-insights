import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

import { Contributor } from "@/types/github";

interface RepoContributorsProps {
    contributors: Contributor[];
}

export const RepoContributors = ({ contributors }: RepoContributorsProps) => {
    return (
        <Card className="md:col-span-2 border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-slate-900 text-white pb-6">
                <div className="flex items-center gap-3 mb-1 opacity-80">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Community</span>
                </div>
                <CardTitle className="text-xl font-bold">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-8 -mt-4 bg-white rounded-t-3xl relative">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                    {contributors.slice(0, 9).map((c) => (
                        <div key={c.id} className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                            <img
                                src={c.avatar_url}
                                alt={c.login}
                                className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2 ring-white shadow-sm"
                            />
                            <span className="text-xs md:text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors truncate">
                                {c.login}
                            </span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
