import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Issue, Label } from "@/types/github";

interface IssueHeaderProps {
    issue: Issue;
}

export const IssueHeader = ({ issue }: IssueHeaderProps) => {
    return (
        <CardHeader className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
                <CardTitle className="text-2xl font-bold">
                    {issue.title}
                </CardTitle>

                <Badge variant={issue.state === "open" ? "default" : "secondary"}>
                    {issue.state}
                </Badge>
            </div>

            <div className="text-sm text-muted-foreground">
                #{issue.number} opened by{" "}
                <span className="font-semibold">{issue.user.login}</span>
            </div>

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
    );
};
