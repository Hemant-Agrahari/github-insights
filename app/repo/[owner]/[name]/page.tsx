import { getRepo, getContributors } from "@/lib/github";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { BackButton } from "@/components/ui/back-button";
import { RepoHeader } from "@/components/repo-overview/RepoHeader";
import { RepoContributors } from "@/components/repo-overview/RepoContributors";
import { RepoActionCenter } from "@/components/repo-overview/RepoActionCenter";
import { RepoStatsCard } from "@/components/repo-overview/RepoStatsCard";
import { RepoErrorCard } from "@/components/repo-overview/RepoErrorCard";

type RepoPageProps = {
    params: Promise<{ owner: string; name: string }>;
};

export async function generateMetadata({
    params,
}: RepoPageProps): Promise<Metadata> {
    const { owner, name } = await params;
    return {
        title: `${owner}/${name} | GitHub Insights`,
        description: `Overview and stats for ${owner}/${name} repository.`,
    };
}

export default async function RepoPage({ params }: RepoPageProps) {
    const { owner, name } = await params;

    try {
        const repo = await getRepo(owner, name);
        const contributors = await getContributors(owner, name);

        return (
            <div className="min-h-screen bg-slate-50 relative overflow-x-hidden p-4 md:p-8">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-slate-900 to-transparent opacity-[0.03]" />
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-5xl mx-auto space-y-4 md:space-y-8 relative">
                    <div className="flex items-center justify-between pointer-events-auto">
                        <BackButton href="/" label="Back to Search" />
                        <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>

                    <RepoHeader
                        owner={repo.owner.login}
                        name={repo.name}
                        description={repo.description}
                        stargazersCount={repo.stargazers_count}
                        forksCount={repo.forks_count}
                        openIssuesCount={repo.open_issues_count}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <RepoContributors contributors={contributors} />

                        <div className="space-y-4 md:space-y-6">
                            <RepoActionCenter owner={owner} name={name} />
                            <RepoStatsCard
                                language={repo.language}
                                license={repo.license?.name}
                                updatedAt={repo.updated_at}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch {
        return <RepoErrorCard />;
    }
}
