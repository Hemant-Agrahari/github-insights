"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
    const [client] = useState(
        new QueryClient({
            defaultOptions: {
                queries: {
                    // Cache data for 5 minutes (gcTime)
                    // Keep data fresh for 1 minute (staleTime) to minimize API calls while ensuring up-to-date info
                    staleTime: 60 * 1000,
                    gcTime: 5 * 60 * 1000,
                    refetchOnWindowFocus: false, // Prevent unnecessary background calls
                },
            },
        })
    );

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
