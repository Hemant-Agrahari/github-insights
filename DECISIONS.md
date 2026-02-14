# Engineering Decisions

## Server vs. Client Boundaries

- **Server-Side (Repository Overview & Home)**: I chose to server-render the overview page and the home page. The home page is now a static server component to satisfy the "statically rendered route" requirement, while the interactive functionality is delegated to a child `RepoSearchForm` component.
- **Client-Side (Issues List & Detail)**: These pages require stateful interactions (pagination, filtering, mutations, optimistic updates). Using Client Components with React Query provides a superior developer experience for managing complex async state and caching.

## Component Choices

- **SimpleDialog**: To satisfy the requirement for "Dialogs" and "Modal state" without installing the full shadcn/dialog library (which has many dependencies), I implemented a structured `SimpleDialog` for confirming the "Close Issue" action.

## Caching Strategy

- **staleTime (1 minute)**: Chosen to balance data freshness and performance. In a fast-moving repo, a minute is a reasonable timeframe before re-validating data.
- **gcTime (5 minutes)**: Keeps data in memory for long enough to allow quick back-and-forth navigation without fetching, but eventually clears it to prevent memory bloat.
- **placeholderData**: Used in the issues list to preserve the UI during pagination, preventing flicker and maintaining a smooth scrolling experience.

## Tradeoffs Made

- **Client-Side Filtering/Sorting**: while some filtering is done via API, the complexity of a full-blown filter bar was slightly reduced to focus on core stability.
- **UI Simplicity**: Prioritized clean typography and layout using shadcn/ui over complex custom animations to ensure code maintainability.

## Intentional Exclusions

- **User Authentication**: The project uses a single PAT for simplification, but in production, OAuth would be necessary to allow users to act on their own behalf.
- **Comment Creation**: Focused on the "Close Issue" mutation flow as per requirements.
