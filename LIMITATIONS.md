# Known Weaknesses & Limitations

## Known Weaknesses

- **Static Token**: The application relies on a single `NEXT_PUBLIC_GITHUB_TOKEN`. This is a security risk in production as it is exposed to the browser.
- **Error Granularity**: While basic error handling is present, more granular feedback (e.g., distinguishing between a network error and an "Issue not found" error) could be improved.
- **Limited Sorting**: Only "Created" and "Comments count" sorting is implemented.

## GitHub API Constraints

- **Rate Limits**: GitHub API has strict rate limits (60/hr for unauthenticated, 5000/hr for PAT). The application handles 403 errors but doesn't implement a sophisticated retry strategy with backoff.
- **Pagination Limits**: The API returns a maximum of 100 items per page; the app is currently optimized for 10.

## Scaling Considerations

- **Virtualization**: For repositories with thousands of issues, a virtualized list would be necessary to maintain performance.
- **Middleware**: To secure the API token, all requests should be proxied through a Next.js API route or Middleware.

## Improvements with More Time

- **Theme Toggle**: Adding a dark/light mode switcher.
- **Interactive Graphs**: Visualizing issue velocity or contributor activity.
- **Search Integration**: Implementing a search bar for issues.
- **Full Comment Threads**: Implementing the ability to read and post comments.
