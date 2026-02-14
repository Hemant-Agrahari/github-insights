import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ArrowLeft } from "lucide-react";
import Link from "next/link";

export const RepoErrorCard = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <Card className="max-w-md w-full border-none shadow-2xl bg-white overflow-hidden">
                <CardHeader className="bg-red-500 text-white p-6 text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Github className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Repository Not Found</CardTitle>
                </CardHeader>
                <CardContent className="p-8 text-center space-y-6">
                    <p className="text-slate-500 leading-relaxed">
                        We couldn't find the repository you're looking for. Please double-check the owner and name.
                    </p>
                    <Link href="/" className="block">
                        <Button variant="outline" className="w-full h-12 rounded-xl border-slate-200 hover:bg-slate-50 font-bold transition-all">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Search
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
};
