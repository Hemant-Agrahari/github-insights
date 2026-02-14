import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface IssueContentProps {
    body: string | null;
    comments: number;
}

export const IssueContent = ({ body, comments }: IssueContentProps) => {
    return (
        <>
            <CardContent>
                {body ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">
                        {body}
                    </p>
                ) : (
                    <p className="italic text-muted-foreground">
                        No description provided.
                    </p>
                )}
            </CardContent>

            <div className="space-y-2 mt-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                    Comments
                    <Badge variant="secondary">{comments}</Badge>
                </h3>
                <p className="text-sm text-muted-foreground italic">
                    Comments history is not fully displayed in this view.
                </p>
            </div>
        </>
    );
};
