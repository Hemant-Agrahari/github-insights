interface RepoStatsCardProps {
    language: string | null;
    license: string | null;
    updatedAt: string;
}

export const RepoStatsCard = ({ language, license, updatedAt }: RepoStatsCardProps) => {
    return (
        <div className="p-4 md:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2 md:space-y-3">
            <h4 className="text-[10px] md:text-sm font-bold text-slate-900 uppercase tracking-tight">Repo Health</h4>
            <div className="space-y-2">
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Language</span>
                    <span className="font-bold text-slate-900">{language || "N/A"}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">License</span>
                    <span className="font-bold text-slate-900">{license || "None"}</span>
                </div>
                <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Updated</span>
                    <span className="font-bold text-slate-900">{new Date(updatedAt).toLocaleDateString()}</span>
                </div>
            </div>
        </div>
    );
};
