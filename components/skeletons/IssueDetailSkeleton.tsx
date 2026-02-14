import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function IssueDetailSkeleton() {
    return (
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-10 w-28" />
            </div>

            <Card>
                <CardHeader className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-3/4" />
                        <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-1/4" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
            </Card>

            <div className="space-y-4">
                <Skeleton className="h-6 w-24" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    );
}
