import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";

interface IssueActionsProps {
    owner: string;
    repo: string;
    state: string;
    isPending: boolean;
    onCloseClick: () => void;
}

export const IssueActions = ({
    owner,
    repo,
    state,
    isPending,
    onCloseClick,
}: IssueActionsProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <BackButton href={`/repo/${owner}/${repo}/issues`} label="Back to Issues" />

            {state === "open" && (
                <Button
                    variant="destructive"
                    onClick={onCloseClick}
                    disabled={isPending}
                >
                    {isPending ? "Closing..." : "Close Issue"}
                </Button>
            )}
        </div>
    );
};
