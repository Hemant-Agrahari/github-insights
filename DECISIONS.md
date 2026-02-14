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

## Tradeoffs Made

- **Client-Side Filtering/Sorting**: while some filtering is done via API, the complexity of a full-blown filter bar was slightly reduced to focus on core stability.
- **UI Simplicity**: Prioritized clean typography and layout using shadcn/ui over complex custom animations to ensure code maintainability.

## Intentional Exclusions

- **User Authentication**: The project uses a single PAT for simplification, but in production, OAuth would be necessary to allow users to act on their own behalf.
- **Comment Creation**: Focused on the "Close Issue" mutation flow as per requirements.
