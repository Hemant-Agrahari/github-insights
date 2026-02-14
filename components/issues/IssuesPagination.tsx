import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

type Props = {
    page: number;
    setPage: (fn: (p: number) => number) => void;
    isFetching: boolean;
    hasNext: boolean;
};

export default function IssuesPagination({
    page,
    setPage,
    isFetching,
    hasNext,
}: Props) {
    return (
        <div className="flex items-center justify-center gap-6 mt-8 py-4 border-t border-slate-100">
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 border-slate-200 text-slate-600 hover:text-slate-900 transition-all hover:bg-slate-50"
                    disabled={page === 1 || isFetching}
                    onClick={() => setPage((p) => p - 1)}
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </Button>

                <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-md">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter mr-2">Page</span>
                    <span className="text-sm font-bold text-slate-900">{page}</span>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="h-9 px-4 border-slate-200 text-slate-600 hover:text-slate-900 transition-all hover:bg-slate-50"
                    disabled={isFetching || !hasNext}
                    onClick={() => setPage((p) => p + 1)}
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            <div className="w-24 flex items-center h-5">
                {isFetching && (
                    <div className="flex items-center text-blue-600 gap-2 animate-in fade-in duration-300">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span className="text-xs font-bold uppercase tracking-wider">Syncing</span>
                    </div>
                )}
            </div>
        </div>
    );
}
