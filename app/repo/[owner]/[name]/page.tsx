import { getRepo, getContributors } from "@/lib/github";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type RepoPageProps = {
    params: Promise<{ owner: string; name: string }>;
};

/**
 * Repository Overview Page (Server Component)
 * @param {Object} props - Page props
 * @param {Object} props.params (object, required): Route parameters containing repository owner and name.
 * @param {string} props.params.owner Repository owner name.
 * @param {string} props.params.name Repository name.
 * @returns {JSX.Element} - Repository overview with contributors and navigation to issues.
 *
 * Features:
 * - Server-side data fetching
 * - ISR caching via API layer
 * - Graceful error handling for invalid repositories
 * - Minimal client bundle size
 */
export default async function RepoPage({ params }: RepoPageProps) {
    const { owner, name } = await params;

    try {
        const repo = await getRepo(owner, name);
        const contributors = await getContributors(owner, name);

        return (
            <div className="p-6 space-y-6">
                <Card>
                    <CardContent className="space-y-2 p-4">
                        <h2 className="text-xl font-bold">{repo.full_name}</h2>
                        <p>{repo.description}</p>

                        <div className="flex gap-2">
                            <Badge>⭐ {repo.stargazers_count}</Badge>
                            <Badge>Forks: {repo.forks_count}</Badge>
                            <Badge>Open Issues: {repo.open_issues_count}</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">Top Contributors</h3>
                        {contributors.map((c: any) => (
                            <div key={c.id}>{c.login}</div>
                        ))}
                    </CardContent>
                </Card>

                <Link
                    href={`/repo/${owner}/${name}/issues`}
                    className="text-blue-600 underline"
                >
                    View Issues
                </Link>
            </div>
        );
    } catch {
        return (
            <div className="p-6">
                <Card className="border-destructive">
                    <CardContent className="p-6 text-center">
                        <h2 className="text-xl font-bold text-destructive">
                            Repository Not Found
                        </h2>
                        <p className="text-muted-foreground mt-2">
                            Please check the owner and repository name and try again.
                        </p>
                        <Link href="/">
                            <Button variant="outline" className="mt-4">
                                Back to Search
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }
}
