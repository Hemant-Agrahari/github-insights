"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useIssues } from "@/hooks/useIssues";
import { useDebounce } from "@/hooks/useDebounce";
import IssuesFilters from "@/components/issues/IssuesFilters";
import IssuesTable from "@/components/issues/IssuesTable";
import IssuesPagination from "@/components/issues/IssuesPagination";

export default function IssuesPage() {
    const params = useParams();
    const owner = params.owner as string;
    const name = params.name as string;

    const [page, setPage] = useState(1);
    const [state, setState] = useState("open");
    const [sort, setSort] = useState("created");
    const [assignee, setAssignee] = useState("");
    const debouncedAssignee = useDebounce(assignee, 500);

    const { data, isLoading, isFetching, isError } = useIssues(
        owner,
        name,
        page,
        state,
        sort,
        debouncedAssignee
    );

    if (isError) {
        return <div className="p-6 text-destructive">Failed to load issues.</div>;
    }

    return (
        <div className="h-screen bg-slate-50/50 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-6 min-h-0">
                <div className="flex-none mb-6">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Issues
                    </h1>
                    <p className="text-slate-500 mt-1">
                        Manage and track issues for {owner}/{name}
                    </p>
                </div>

                <div className="flex-none mb-6">
                    <IssuesFilters
                        state={state}
                        sort={sort}
                        assignee={assignee}
                        setState={setState}
                        setSort={setSort}
                        setAssignee={setAssignee}
                        resetPage={() => setPage(1)}
                    />
                </div>

                <div className="flex-1 min-h-0 relative">
                    <div className="absolute inset-0 overflow-auto border border-slate-200 rounded-xl bg-white shadow-sm">
                        <IssuesTable
                            issues={data}
                            loading={isLoading}
                            owner={owner}
                            repo={name}
                        />
                    </div>
                </div>

                <div className="flex-none pt-4">
                    <IssuesPagination
                        page={page}
                        setPage={setPage}
                        isFetching={isFetching}
                        hasNext={data ? data.length === 10 : false}
                    />
                </div>
            </div>
        </div>
    );
}
