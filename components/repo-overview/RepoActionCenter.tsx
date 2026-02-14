import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

interface RepoActionCenterProps {
    owner: string;
    name: string;
}

export const RepoActionCenter = ({ owner, name }: RepoActionCenterProps) => {
    return (
        <Card className="border-none shadow-xl bg-slate-900 text-white overflow-hidden">
            <CardHeader className="p-4 pb-2 md:p-6 md:pb-4">
                <div className="flex items-center gap-3 mb-1 opacity-60">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Action Center</span>
                </div>
                <CardTitle className="text-lg md:text-xl font-bold">Manage Issues</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3">
                <p className="text-xs md:text-sm text-slate-400">
                    Browse the issue tracker to report bugs or suggest features.
                </p>
                <Link href={`/repo/${owner}/${name}/issues`} className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-10 md:h-11 rounded-xl shadow-lg shadow-blue-900/20">
                        View Issue Tracker
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
