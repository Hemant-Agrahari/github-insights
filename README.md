# GitHub Insights

A modern GitHub repository Explorer built with Next.js, TanStack Query, and shadcn/ui.

## Architecture Overview

This project uses **Next.js 16+** with the App Router. It leverages a hybrid rendering strategy:
- **Server-Side Rendering (SSR)**: Used for the Repository Overview to fetch metadata and contributors quickly on the server, improving SEO and initial load.
- **Client-Side Rendering (CSR)**: Used for the Issues List and Issue Detail pages where high interactivity, real-time filtering, and optimistic updates are required.

## Folder Structure

```text
app/
├── repo/
│   └── [owner]/
│       └── [name]/
│           ├── page.tsx          # Repository Overview (Server)
│           ├── loading.tsx       # Skeleton for Overview
│           └── issues/
│               ├── page.tsx      # Issues List (Client)
│               └── [number]/
│                   ├── page.tsx  # Issue Detail (Client)
│                   └── loading.tsx # Skeleton for Detail
components/
├── ui/                   # shadcn components
│   └── simple-dialog.tsx  # Modal for confirmations
└── repo-search-form.tsx   # Client form for Home page
hooks/
├── useIssues.ts           # Fetch many issues
├── useIssue.ts            # Fetch single issue
└── useCloseIssue.ts       # Mutation to close issue
lib/
└── github.ts              # API fetch helpers
```

## Performance Considerations

- **Parallel Data Fetching**: Repository metadata and contributors are fetched in parallel on the server.
- **Skeleton Loading**: prevents layout shifts (CLS) during navigation.
- **Optimistic UI**: Issue closing updates the UI immediately before the server responds.
- **Caching**: TanStack Query is configured with `staleTime` and `gcTime` to prevent redundant API calls.
