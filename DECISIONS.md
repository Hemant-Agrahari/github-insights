# Engineering Decisions

- **Server-Side (Repository Overview & Home)**: I chose to server-render the overview page and the home page. This ensures fast initial load times and satisfies the "statically rendered route" requirement. Server components minimize the JS bundle sent to the client by keeping data fetching logic on the server.
- **Client-Side (Issues List & Detail)**: These pages require high interactivity (filtering, sorting, pagination, and mutations). Client components allow for a responsive UI and seamless integration with TanStack Query's caching and optimistic update features.

## shadcn/ui Impact & Bundle Size

- **Controlled Imports**: shadcn/ui uses a copy-and-paste approach where components are added to the codebase individually. This prevents importing the entire library and ensures that only the CSS and JS for components actually used (Button, Card, Table, etc.) are bundled, keeping the client-side footprint minimal.

## Performance Validation

- **No Layout Shift**: Validated that `loading.tsx` skeletons prevent layout shifts (CLS) during transitions.
- **Efficient Re-renders**: Used React Query's `select` and `placeholderData` to ensure only necessary components re-render during data updates.
- **API Discipline**: Checked network logs to confirm zero duplicate API calls and verified that `staleTime` prevents unnecessary background refetches.

## Component Choices

- **SimpleDialog**: To satisfy the requirement for "Dialogs" and "Modal state" without installing the full shadcn/dialog library (which has many dependencies), I implemented a structured `SimpleDialog` for confirming the "Close Issue" action.

## Caching Strategy

- **staleTime (1 minute)**: Chosen to balance data freshness and performance. In a fast-moving repo, a minute is a reasonable timeframe before re-validating data.
- **gcTime (5 minutes)**: Keeps data in memory for long enough to allow quick back-and-forth navigation without fetching, but eventually clears it to prevent memory bloat.
- **placeholderData**: Used in the issues list to preserve the UI during pagination, preventing flicker and maintaining a smooth scrolling experience.

## Modular Architecture Refactor

- **Separation of Concerns**: Both the Repository Overview and Issue Detail pages were refactored from monolithic components into small, specialized modules (e.g., `RepoHeader`, `IssueContent`). This significantly improves maintainability and makes it easier to update specific UI sections without touching core state logic.
- **Prop Orchestration**: State management (mutations, params) is kept in the main page components, while data is passed down to modular sub-components via props, ensuring a clear data flow.

## Dynamic Navigation Utilities

- **Context-Aware BackButton**: Instead of a generic "Back" link, I implemented a reusable `BackButton` that dynamically displays labels like "Back to Search" or "Back to github-insights" based on navigation context, enhancing usability.
- **Global Scroll UI**: Added a `BackToTop` utility in the Root Layout to handle smooth scrolling for content-heavy pages, utilizing glassmorphism effects to maintain a premium feel.

## Tradeoffs Made

- **Client-Side vs. Server-Side Props**: While modular components are now widely used, I've kept data fetching centralized in the parent components to minimize prop discovery overhead and keep the hierarchy simple.
