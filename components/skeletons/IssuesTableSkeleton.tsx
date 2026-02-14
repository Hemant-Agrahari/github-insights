import { TableRow, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export function IssuesTableSkeleton() {
    return (
        <>
            {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                    <TableCell colSpan={4}>
                        <Skeleton className="h-8 w-full" />
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
}
