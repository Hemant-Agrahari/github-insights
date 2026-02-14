import Link from "next/link";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { IssuesTableSkeleton } from "@/components/skeletons/IssuesTableSkeleton";
import { MessageSquare, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Issue } from "@/types/github";

type Props = {
    issues?: Issue[];
    loading: boolean;
    owner: string;
    repo: string;
};

const IssuesTable = ({ issues, loading, owner, repo }: Props) => {
    return (
        <table className="w-full caption-bottom text-sm">
            <TableHeader className="bg-slate-50 border-b">
                <TableRow className="hover:bg-transparent">
                    <TableHead className="sticky top-0 z-20 w-[100px] font-semibold text-slate-900 bg-slate-50">
                        <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-slate-400" />#
                        </div>
                    </TableHead>
                    <TableHead className="sticky top-0 z-20 font-semibold text-slate-900 bg-slate-50">
                        Title
                    </TableHead>
                    <TableHead className="sticky top-0 z-20 font-semibold text-slate-900 bg-slate-50">
                        Author
                    </TableHead>
                    <TableHead className="sticky top-0 z-20 text-right font-semibold text-slate-900 bg-slate-50">
                        <div className="flex items-center justify-end gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-400" />
                            <span className="hidden sm:inline">Comments</span>
                        </div>
                    </TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {loading ? (
                    <IssuesTableSkeleton />
                ) : issues && issues.length > 0 ? (
                    issues.map((issue) => (
                        <TableRow
                            key={issue.id}
                            className="group transition-colors hover:bg-slate-50/50"
                        >
                            <TableCell className="font-mono text-slate-500 text-sm">
                                #{issue.number}
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <Link
                                        href={`/repo/${owner}/${repo}/issues/${issue.number}`}
                                        className="text-slate-900 font-medium hover:text-blue-600 transition-colors leading-snug"
                                    >
                                        {issue.title}
                                    </Link>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Badge
                                            variant={issue.state === "open" ? "secondary" : "outline"}
                                            className="px-1.5 py-0 text-[10px] uppercase font-bold tracking-tight"
                                        >
                                            {issue.state}
                                        </Badge>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    {issue.user.avatar_url && (
                                        <img
                                            src={issue.user.avatar_url}
                                            alt={issue.user.login}
                                            className="w-5 h-5 md:w-6 md:h-6 rounded-full ring-1 ring-slate-200"
                                        />
                                    )}
                                    <span className="text-slate-600 text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-none">
                                        {issue.user.login}
                                    </span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                {issue.comments > 0 ? (
                                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-semibold">
                                        {issue.comments}
                                    </span>
                                ) : (
                                    <span className="text-slate-300 text-xs">-</span>
                                )}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={4}
                            className="text-center h-32 text-slate-400 italic"
                        >
                            No issues found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </table>
    );
};
export default IssuesTable;
