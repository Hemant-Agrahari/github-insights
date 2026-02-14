import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CircleDot, SortDesc, Search, User } from "lucide-react";

type Props = {
    state: string;
    sort: string;
    assignee: string;
    setState: (v: string) => void;
    setSort: (v: string) => void;
    setAssignee: (v: string) => void;
    resetPage: () => void;
};

export default function IssuesFilters({
    state,
    sort,
    assignee,
    setState,
    setSort,
    setAssignee,
    resetPage,
}: Props) {
    return (
        <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-4">
                <div className="flex flex-wrap gap-6 items-center">
                    {/* Status */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <CircleDot className="w-3.5 h-3.5" />
                            Status
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <Button
                                variant={state === "open" ? "secondary" : "ghost"}
                                size="sm"
                                className={`h-8 px-4 rounded-md text-xs font-medium transition-all ${state === "open"
                                        ? "bg-white shadow-sm text-slate-900 hover:bg-white"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                                onClick={() => {
                                    resetPage();
                                    setState("open");
                                }}
                            >
                                Open
                            </Button>
                            <Button
                                variant={state === "closed" ? "secondary" : "ghost"}
                                size="sm"
                                className={`h-8 px-4 rounded-md text-xs font-medium transition-all ${state === "closed"
                                        ? "bg-white shadow-sm text-slate-900 hover:bg-white"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                                onClick={() => {
                                    resetPage();
                                    setState("closed");
                                }}
                            >
                                Closed
                            </Button>
                        </div>
                    </div>

                    {/* Sort */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <SortDesc className="w-3.5 h-3.5" />
                            Sort By
                        </label>
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <Button
                                variant={sort === "created" ? "secondary" : "ghost"}
                                size="sm"
                                className={`h-8 px-4 rounded-md text-xs font-medium transition-all ${sort === "created"
                                        ? "bg-white shadow-sm text-slate-900 hover:bg-white"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                                onClick={() => {
                                    resetPage();
                                    setSort("created");
                                }}
                            >
                                Date
                            </Button>
                            <Button
                                variant={sort === "comments" ? "secondary" : "ghost"}
                                size="sm"
                                className={`h-8 px-4 rounded-md text-xs font-medium transition-all ${sort === "comments"
                                        ? "bg-white shadow-sm text-slate-900 hover:bg-white"
                                        : "text-slate-500 hover:text-slate-900"
                                    }`}
                                onClick={() => {
                                    resetPage();
                                    setSort("comments");
                                }}
                            >
                                Comments
                            </Button>
                        </div>
                    </div>

                    {/* Assignee */}
                    <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            Assignee
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                placeholder="Search by username..."
                                className="pl-9 h-10 border-slate-200 focus-visible:ring-slate-400 bg-slate-50/50"
                                value={assignee}
                                onChange={(e) => {
                                    resetPage();
                                    setAssignee(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
