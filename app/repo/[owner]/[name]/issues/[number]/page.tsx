"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import useIssue from "@/hooks/useIssue";
import useCloseIssue from "@/hooks/useCloseIssue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SimpleDialog } from "@/components/ui/simple-dialog";
import { IssueDetailSkeleton } from "@/components/skeletons/IssueDetailSkeleton";

/**
 * Issue detail page.
 * @returns {JSX.Element} Displays detailed information about a GitHub issue including:
 * - Issue title, status, author, and labels
 * - Issue description
 * - Close issue action with confirmation dialog
 * - Optimistic UI update when closing
 * - Error handling for permission and network failures
 * - Skeleton loading state
 */

type Label = {
    id: number;
    name: string;
    color: string;
};

const IssueDetailPage = () => {
    const params = useParams();
    const owner = params.owner as string;
    const name = params.name as string;
    const number = params.number as string;

    const { data: issue, isLoading, isError } = useIssue(owner, name, number);
    const closeIssueMutation = useCloseIssue(owner, name, number);

    const [mutationError, setMutationError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Skeleton Loading
    if (isLoading) {
        return <IssueDetailSkeleton />;
    }

    if (isError) {
        return (
            <div className="p-6 text-destructive">
                Failed to load issue. GitHub rate limit may be exceeded.
            </div>
        );
    }

    if (!issue) {
        return <div className="p-6">Issue not found</div>;
    }

    const handleConfirmClose = async () => {
        setIsDialogOpen(false);
        setMutationError(null);

        try {
            await closeIssueMutation.mutateAsync();
        } catch (err: any) {
            if (err?.response?.status === 403) {
                setMutationError(
                    "You don't have permission to close this issue. You need write access to this repository."
                );
            } else {
                setMutationError("Failed to close issue. Please try again later.");
            }
        }
    };

    return (
        <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto">
            {/* Mutation Error */}
            {mutationError && (
                <Card className="border-destructive bg-destructive/10">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <p className="text-sm font-medium text-destructive">
                            {mutationError}
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-fit"
                            onClick={() => setMutationError(null)}
                        >
                            Dismiss
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                    href={`/repo/${owner}/${name}/issues`}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                >
                    ← Back to Issues
                </Link>

                {issue.state === "open" && (
                    <Button
                        variant="destructive"
                        onClick={() => setIsDialogOpen(true)}
                        disabled={closeIssueMutation.isPending}
                    >
                        {closeIssueMutation.isPending ? "Closing..." : "Close Issue"}
                    </Button>
                )}
            </div>

            {/* Confirmation Dialog */}
            <SimpleDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmClose}
                title="Close Issue"
                description="Are you sure you want to close this issue? This will immediately update the UI."
            />

            {/* Issue Card */}
            <Card>
                <CardHeader className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <CardTitle className="text-2xl font-bold">
                            {issue.title}
                        </CardTitle>

                        <Badge
                            variant={issue.state === "open" ? "default" : "secondary"}
                        >
                            {issue.state}
                        </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground">
                        #{issue.number} opened by{" "}
                        <span className="font-semibold">{issue.user.login}</span>
                    </div>

                    {/* Labels */}
                    {issue.labels && issue.labels.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                            {issue.labels.map((label: Label) => (
                                <Badge
                                    key={label.id}
                                    variant="outline"
                                    style={{
                                        borderColor: `#${label.color}`,
                                        color: `#${label.color}`,
                                    }}
                                >
                                    {label.name}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardHeader>

                <CardContent>
                    {issue.body ? (
                        <p className="whitespace-pre-wrap text-sm leading-relaxed">
                            {issue.body}
                        </p>
                    ) : (
                        <p className="italic text-muted-foreground">
                            No description provided.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Comments Info */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    Comments
                    <Badge variant="secondary">{issue.comments}</Badge>
                </h3>
                <p className="text-sm text-muted-foreground italic">
                    Comments history is not fully displayed in this view.
                </p>
            </div>
        </div>
    );
}

export default IssueDetailPage;
