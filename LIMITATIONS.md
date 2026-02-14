# Known Weaknesses & Limitations

## Known Weaknesses

- **Static Token**: The application relies on a single `NEXT_PUBLIC_GITHUB_TOKEN`. This is a security risk in production as it is exposed to the browser.
- **Error Granularity**: While basic error handling is present, more granular feedback (e.g., distinguishing between a network error and an "Issue not found" error) could be improved.
- **Limited Sorting**: Only "Created" and "Comments count" sorting is implemented.

## GitHub API Constraints & Rate Limits

- **Rate Limit Handling**: GitHub API strictly limits requests (60/hr for unauthenticated, 5000/hr for PAT). The application handles `403 Forbidden` errors by displaying a clear message to the user, though it currently lacks an automatic retry-after mechanism.
- **Handling Rate Limits is mandatory**: I've ensured that even if a rate limit is hit, the application remains stable and provides a non-breaking UI experience.
- **Pagination Strategy**: The API returns up to 100 items per page; the app fetches 10 items at a time to optimize for speed and memory usage on mobile devices.

## Scaling Considerations

- **Virtualization**: For repositories with thousands of issues, a virtualized list would be necessary to maintain performance.
- **Middleware**: To secure the API token, all requests should be proxied through a Next.js API route or Middleware.

## Improvements with More Time

- **Theme Toggle**: Adding a dark/light mode switcher.
- **Interactive Data Viz**: Visualizing issue patterns (e.g., open vs. closed over time).
- **Global Issue Search**: A top-level search bar for finding issues across all indexed repositories.
- **Enhanced Error Logging**: Integrating with a service like Sentry to track production API failures and rate limit collisions.
