import { getRepo, getContributors } from "@/lib/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, GitFork, CircleDot, Users, ArrowLeft, Github, ExternalLink, MessageSquare } from "lucide-react";

type RepoPageProps = {
    params: Promise<{ owner: string; name: string }>;
};

export default async function RepoPage({ params }: RepoPageProps) {
    const { owner, name } = await params;

    try {
        const repo = await getRepo(owner, name);
        const contributors = await getContributors(owner, name);

        return (
            <div className="min-h-screen bg-slate-50 relative overflow-x-hidden p-4 md:p-8">
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-slate-900 to-transparent opacity-[0.03]" />
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto space-y-4 md:space-y-8 relative">
                    {/* Navigation */}
                    <div className="flex items-center justify-between pointer-events-auto">
                        <Link href="/">
                            <Button variant="ghost" size="sm" className="gap-2 text-slate-500 hover:text-slate-900 transition-colors">
                                <ArrowLeft className="w-4 h-4" />
                                Back to Search
                            </Button>
                        </Link>
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Hero Header */}
                    <div className="space-y-2 md:space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                            <Github className="w-3 h-3" />
                            Repository Overview
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900">
                            {repo.owner.login}/<span className="text-blue-600">{repo.name}</span>
                        </h1>
                        <p className="text-sm md:text-lg text-slate-500 max-w-3xl leading-relaxed">
                            {repo.description || "No description provided for this repository."}
                        </p>

                        <div className="flex flex-wrap gap-3 pt-2">
                            <Badge variant="secondary" className="px-3 py-1.5 gap-2 bg-white border-slate-200 text-slate-700 shadow-sm">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                <span className="font-bold">{repo.stargazers_count.toLocaleString()}</span> stars
                            </Badge>
                            <Badge variant="secondary" className="px-3 py-1.5 gap-2 bg-white border-slate-200 text-slate-700 shadow-sm">
                                <GitFork className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-bold">{repo.forks_count.toLocaleString()}</span> forks
                            </Badge>
                            <Badge variant="secondary" className="px-3 py-1.5 gap-2 bg-white border-slate-200 text-slate-700 shadow-sm">
                                <CircleDot className="w-3.5 h-3.5 text-green-500" />
                                <span className="font-bold">{repo.open_issues_count.toLocaleString()}</span> issues
                            </Badge>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Contributors Card */}
                        <Card className="md:col-span-2 border-none shadow-xl bg-white/80 backdrop-blur-sm overflow-hidden">
                            <CardHeader className="bg-slate-900 text-white pb-6">
                                <div className="flex items-center gap-3 mb-1 opacity-80">
                                    <Users className="w-4 h-4 text-blue-400" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Community</span>
                                </div>
                                <CardTitle className="text-xl font-bold">Top Contributors</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 md:p-8 -mt-4 bg-white rounded-t-3xl relative">
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                    {contributors.slice(0, 9).map((c: any) => (
                                        <div key={c.id} className="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group">
                                            <img
                                                src={c.avatar_url}
                                                alt={c.login}
                                                className="w-6 h-6 md:w-8 md:h-8 rounded-full ring-2 ring-white shadow-sm"
                                            />
                                            <span className="text-xs md:text-sm font-semibold text-slate-600 group-hover:text-blue-600 transition-colors truncate">
                                                {c.login}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions Card */}
                        <div className="space-y-4 md:space-y-6">
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

                            <div className="p-4 md:p-6 rounded-3xl bg-white border border-slate-100 shadow-sm space-y-2 md:space-y-3">
                                <h4 className="text-[10px] md:text-sm font-bold text-slate-900 uppercase tracking-tight">Repo Health</h4>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Language</span>
                                        <span className="font-bold text-slate-900">{repo.language || "N/A"}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">License</span>
                                        <span className="font-bold text-slate-900">{repo.license?.name || "None"}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500">Updated</span>
                                        <span className="font-bold text-slate-900">{new Date(repo.updated_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch {
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
    }
}
