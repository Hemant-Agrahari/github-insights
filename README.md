# 📊 GitHub Insights

A premium, high-performance GitHub repository explorer built with **Next.js 16**, **TanStack Query**, and **shadcn/ui**. Experience a seamless, data-aware interface with optimistic updates and dynamic SEO.

## ✨ Key Features

- **🚀 Hybrid Rendering Architecture**: Blazing fast initial loads with Server Components (Overview) and high interactivity with Client Components (Issues).
- **🔙 Context-Aware Navigation**: Smart "Back" buttons that change their label based on where you came from.
- **🔝 Global Scroll Utility**: A gorgeous, glassmorphism-inspired "Back to Top" button for effortless long-page navigation.
- **🏗️ Modular Component Design**: Clean, maintainable architecture with refactored, focused sub-components.
- **🔍 Dynamic SEO & Metadata**: Page titles and descriptions update in real-time based on the repository and issue you're viewing.
- **⚡ Optimistic UI**: Immediate feedback when closing issues, with automated rollbacks on failure.
- **🧩 shadcn/ui Integration**: Modern, accessible UI components (Cards, Tables, Badges, Dialogs, Pagination).

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Data Fetching**: TanStack Query v5 & Axios
- **Styling**: Tailwind CSS & Lucide React Icons
- **UI Components**: shadcn/ui & Radix UI
- **Validation**: Formik & Yup

## 📂 Folder Structure

```text
app/
├── repo/
│   └── [owner]/
│       └── [name]/
│           ├── layout.tsx         # Page Metadata (Dynamic SEO)
│           ├── page.tsx           # Repository Overview (Server)
│           ├── loading.tsx        # Skeleton for Overview
│           └── issues/
│               ├── layout.tsx     # Page Metadata (Dynamic SEO)
│               ├── page.tsx       # Issues List (Client)
│               └── [number]/
│                   ├── layout.tsx # Page Metadata (Dynamic SEO)
│                   ├── page.tsx   # Issue Detail (Client)
│                   └── loading.tsx # Skeleton for Detail
components/
├── repo-overview/        # Modular Overview components
├── issue-detail/         # Modular Detail components
├── skeletons/            # Premium Loading states
├── ui/                   # shadcn & Custom components
│   ├── back-button.tsx   # Dynamic navigation 🔙
│   ├── back-to-top.tsx   # Global scroll utility 🔝
│   └── simple-dialog.tsx  # Modal for confirmations
└── repo-search-form.tsx   # Optimized Search Form
hooks/
├── useIssues.ts           # Fetch many issues (Cached)
├── useIssue.ts            # Fetch single issue (Cached)
└── useCloseIssue.ts       # Mutation to close issue (Optimistic)
lib/
├── github.ts              # API fetch helpers
└── utils.ts               # Component utilities
```

## 🚀 Performance & Architecture

- **Parallel Data Fetching**: Metadata and contributors are fetched simultaneously on the server.
- **Layout Persistence**: Skeletons prevent Layout Shift (CLS) during navigation.
- **API Discipline**: TanStack Query's `staleTime` and `gcTime` prevent redundant network requests.
- **Rate Limit Resilience**: Graceful error handling for GitHub API constraints.

## 🏁 Getting Started

1. **Clone the repo**
2. **Install dependencies**: `npm install`
3. **Set up Environment**: Create a `.env.local` file and add:
   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_pat_here
   ```
4. **Run Development Server**: `npm run dev`
