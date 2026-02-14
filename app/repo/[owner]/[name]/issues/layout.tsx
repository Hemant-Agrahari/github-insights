import type { Metadata } from "next";

type Props = {
    params: Promise<{ owner: string; name: string }>;
    children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { owner, name } = await params;
    return {
        title: `Issues · ${owner}/${name}`,
        description: `Track and manage issues for ${owner}/${name}.`,
    };
}

export default function IssuesLayout({ children }: Props) {
    return <>{children}</>;
}
