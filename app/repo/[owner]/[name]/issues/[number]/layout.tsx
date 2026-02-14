import type { Metadata } from "next";
import axios from "axios";

type Props = {
    params: Promise<{ owner: string; name: string; number: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { owner, name, number } = await params;
    try {
        const res = await axios.get(
            `https://api.github.com/repos/${owner}/${name}/issues/${number}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                },
            }
        );
        const title = res.data.title;
        return {
            title: `${title} · Issue #${number} · ${owner}/${name}`,
            description: res.data.body?.slice(0, 160) || `Details for issue #${number}`,
        };
    } catch {
        return {
            title: `Issue #${number} · ${owner}/${name}`,
        };
    }
}

export default function IssueDetailLayout({ children }: Props) {
    return <>{children}</>;
}
