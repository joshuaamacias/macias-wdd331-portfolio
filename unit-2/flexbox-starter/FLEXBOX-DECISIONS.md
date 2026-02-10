# FLEXBOX-DECISIONS.md

## Overview
For this project, I focused on building three complex layouts using Flexbox. I used the custom properties in `css/base/variables.css` for consistent spacing, sizing, and colors (ex: `--sidebar-width`, `--header-height`, and spacing tokens like `--spacing-lg`). I avoided spacing with margins between flex items and used `gap` instead whenever possible.

---

## Dashboard Layout (dashboard.html)

### Main layout structure
- I made `.dashboard` a column flex container with `min-height: 100vh` so the page can stretch to the full viewport height and keep the footer at the bottom.
- I set `.dashboard-body` to be a flex row and gave it `flex-grow: 1` so it expands to fill the available vertical space between header and footer.

### Header alignment
- I used Flexbox in `.dashboard-header` and used `margin-left: auto` on `.dashboard-user-menu` to push the menu to the right edge (required “margin: auto” technique).

### Sidebar sizing
- The sidebar uses `flex-basis: var(--sidebar-width)` (250px) with `flex-shrink: 0` so it never collapses when the content area gets tight.

### Cards + sticky footers (nested flex)
- `.dashboard-cards` is a wrapping flex container (`flex-wrap: wrap`) with `gap` for spacing.
- I used `align-content: flex-start` on `.dashboard-cards` to control how wrapped rows pack inside the container (this is my required use of `align-content`).
- Each `.dashboard-card` is a nested flex container (`display: flex; flex-direction: column`) so the body can grow and the footer stays at the bottom.
- `.dashboard-card-body` uses `flex-grow: 1` to take up extra space, which keeps the `.dashboard-card-footer` aligned at the bottom even when cards have different amounts of text.

### Why explicit flex-grow/shrink/basis
Instead of only using `flex: 1`, I used `flex-grow`, `flex-shrink`, and `flex-basis` so I could control:
- which areas should expand (main content and cards)
- which areas should not shrink (sidebar)
- what the minimum “useful” widths are (card basis like ~260px)

---

## Product Layout (product.html)

### Gallery + info panel responsiveness
- The `.product-top` section uses `display: flex` with `flex-wrap: wrap` so the layout stacks on smaller screens without needing media queries.
- The gallery gets a larger base size (around 60%) and the info panel gets a smaller base size (around 35%) using `flex-basis`, while both are allowed to grow/shrink.

### Thumbnail strip
- The thumbnail strip is a flex row with `gap` for consistent spacing.
- Each thumbnail uses a fixed-ish `flex-basis` (ex: 120px) but `flex-shrink: 1` so thumbnails can shrink if the space is tight.

### Specs “grid” using Flexbox
- The specs list is a wrapping flex container.
- Each `.spec-item` uses `flex-grow: 1; flex-shrink: 1; flex-basis: 200px` to automatically create responsive columns.

### Reviews (media object pattern)
- Each `.review` is a flex row with an avatar on the left and content on the right.
- The avatar uses `flex-shrink: 0` so it stays fixed size.
- The review content uses `min-width: 0` so long text wraps instead of overflowing (important Flexbox detail).

---

## Article Layout (article.html)

### Hero layout
- The hero is a column flex container.
- I used `margin-top: auto` on `.article-hero-meta` to push the author/date info to the bottom of the hero section (required “margin: auto” spacing technique).

### Content + sidebar proportional sizing
- The main body uses `display: flex` with `flex-wrap: wrap` so it becomes one column when space is tight.
- The article content uses `flex-grow: 2; flex-shrink: 1; flex-basis: 500px`.
- The sidebar uses `flex-grow: 1; flex-shrink: 1; flex-basis: 300px`.
This keeps a 2:1 feel on wider screens while still wrapping naturally on smaller ones.

### Pull quotes
- Pull quotes use `align-self` to break alignment with surrounding content and create visual interest without changing the HTML structure.

### Related articles + author bio (media object pattern)
- Each related article item is a small flex row (thumbnail left, text right).
- The author bio is also a media object layout (photo left, info right).
- In both cases, the text areas use `min-width: 0` so wrapping behaves correctly.

---

## Testing Notes
- I tested each page at multiple viewport widths while building.
- I checked that wrapped layouts stack naturally (especially product top and article body).
- I verified dashboard cards keep footers aligned even when body text lengths differ.
