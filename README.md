# User Management Mini Dashboard

A responsive user management dashboard built with React, Vite, and TypeScript.

## Features
- **Data Fetching**: Recieves user data from JSONPlaceholder API using React Query.
- **Search**: Debounced search functionality to filter users by name.
- **Sort**: Sort users alphabetically (A-Z) or reverse (Z-A).
- **Pagination**: Client-side pagination (5 users per page).
- **User Details**: Modal view with comprehensive user information.
- **Error Boundary**: Graceful error handling for app crashes.
- **Responsive**: Fully responsive design for mobile and desktop.
- **Tests**: Unit tests for custom hooks using Vitest.

## Setup & Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev
   ```
3. Run tests:
   ```bash
   npx vitest run
   ```

## Design Decisions & Assumptions
1. **Client-Side Pagination**:
   - *Decision*: Implemented pagination on the client side because the API returns all 10 users at once.
   - *Assumption*: The dataset is small enough (<100 items) to handle in memory. For larger datasets, server-side pagination would be required.
   
2. **Error Boundary**:
   - *Decision*: Wrapped the app in a Class-based Error Boundary component.
   - *Reasoning*: React 18/19 still requires Class components for `componentDidCatch`. This captures unexpected rendering errors that would otherwise white-screen the app.

3. **Vanilla CSS**:
   - *Decision*: Used standard CSS variables and scoped classes.
   - *Reasoning*: To demonstrate core CSS skills without relying on utility frameworks like Tailwind (unless requested).

4. **Accessibility (a11y)**:
   - Added `aria-labels` to buttons and inputs.
   - Added `role="dialog"` to the Modal.
   - Added keyboard navigation support (Enter/Space to open modal).
   - *Assumption*: Basic screen reader support is sufficient for this MVP.

## Mandatory Questions

### 1. What causes the most re-renders in your solution and why?
The most potential for re-renders comes from the **typing in the search bar**. Each keystroke updates the `searchTerm` state. However, I mitigated the expensive list re-rendering using a **debounced** value (`debouncedSearchTerm`). The `UserList` component only accepts the filtered list which depends on the debounced value, so the heavy list rendering only happens after the user stops typing for 300ms, not on every keystroke.

### 2. Which optimization did you intentionally avoid and why?
I avoided **Virtualized Lists (Windowing)**. With only 10 users (and pagination reducing it to 5 DOM nodes), the complexity of adding a virtualization library (like `react-window`) outweighs the performance benefit. If the requirement scaled to 1000+ items *visible at once*, I would implement it.

### 3. How would your solution behave with 100,000 users?
With 100,000 users:
- **Filtering/Sorting Lag**: Doing `filter` and `sort` on the client side with 100k items in the main thread would freeze the UI.
- **DOM Bloat**: Rendering 100k DOM nodes would crash the browser.
**Solution**:
1. Server-side pagination and search (Backend).
2. If client-side is forced: Use **Web Workers** for sorting/filtering off the main thread, and **Virtualization** to only render the visible ~20 items.

### 4. What would you refactor with one extra day of time?
- **Theme Switcher**: Add Dark/Light mode toggle.
- **Router nesting**: If the app grew, I'd implement nested routes for the modal (e.g., `/users/:id`) so the URL is shareable.
- **E2E Testing**: Add Playwright tests for full user flows.
