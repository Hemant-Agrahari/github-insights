"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import useIssue from "@/hooks/useIssue";
import useCloseIssue from "@/hooks/useCloseIssue";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SimpleDialog } from "@/components/ui/simple-dialog";
import { IssueDetailSkeleton } from "@/components/skeletons/IssueDetailSkeleton";
import { IssueHeader } from "@/components/issue-detail/IssueHeader";
import { IssueActions } from "@/components/issue-detail/IssueActions";
import { IssueContent } from "@/components/issue-detail/IssueContent";

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


const IssueDetailPage = () => {
    const params = useParams();
    const owner = params.owner as string;
    const name = params.name as string;
    const number = params.number as string;
    const { data: issue, isLoading, isError } = useIssue(owner, name, number);
    const closeIssueMutation = useCloseIssue(owner, name, number);
    const [mutationError, setMutationError] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

            <IssueActions
                owner={owner}
                repo={name}
                state={issue.state}
                isPending={closeIssueMutation.isPending}
                onCloseClick={() => setIsDialogOpen(true)}
            />

            <SimpleDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onConfirm={handleConfirmClose}
                title="Close Issue"
                description="Are you sure you want to close this issue? This will immediately update the UI."
            />

            <Card>
                <IssueHeader issue={issue} />
                <IssueContent body={issue.body} comments={issue.comments} />
            </Card>
        </div>
    );
}

export default IssueDetailPage;
