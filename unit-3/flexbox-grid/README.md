# Flexbox + Grid Practice Assignment

A photography portfolio site that combines CSS Grid and Flexbox to create a professional, responsive layout.

## Project Structure

```
flexbox-grid-practice/
├── css/
│   ├── base/
│   │   ├── reset.css         (complete - do not modify)
│   │   ├── variables.css     (complete - do not modify)
│   │   └── typography.css    (complete - do not modify)
│   ├── components/
│   │   ├── buttons.css       (complete - do not modify)
│   │   └── cards.css         (complete - do not modify)
│   ├── layout/
│   │   └── portfolio.css     (YOUR WORK GOES HERE)
│   └── main.css              (complete - imports everything)
└── index.html                (complete - do not modify)
```

## Your Mission

Implement the layouts in `css/layout/portfolio.css` by following the TODO comments. This assignment combines Grid and Flexbox strategically:

- **Grid for**: Page structure, photo gallery, stats grid
- **Flexbox for**: Navigation, footer, sticky footer pattern

## Key Concepts to Practice

### 1. Sticky Footer (Flexbox)
Make the footer stick to the bottom on short pages:
```css
body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1; /* or flex-grow: 1 */
}
```

### 2. Grid Template Areas (Header)
Use named areas for semantic layout:
```css
.header-container {
    display: grid;
    grid-template-areas: "logo nav";
    /* Add column sizing */
}

.site-logo { grid-area: logo; }
.site-nav { grid-area: nav; }
```

### 3. Auto-Fit for Stats Grid
Responsive columns without media queries:
```css
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
    gap: var(--spacing-lg);
}
```

### 4. Auto-Fill vs Auto-Fit for Photo Gallery
**Experiment with both!**

- `auto-fill`: Creates empty tracks, photos stay at minimum width
- `auto-fit`: Collapses empty tracks, photos expand to fill space

Which looks better for a photography gallery?

```css
/* Try this first */
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

/* Then try this */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* Compare with different numbers of photos */
```

### 5. Flexbox for Navigation
```css
.site-nav ul {
    display: flex;
    gap: var(--spacing-lg);
    align-items: center;
}
```

## Testing Tips

1. **Test the sticky footer**: Remove some content to make the page short. Footer should still be at the bottom.

2. **Test responsive behavior**: Resize your browser to see:
   - Stats grid: 3 → 2 → 1 columns automatically
   - Photo gallery: Multiple columns → fewer columns → 1 column
   - Navigation: May need media query to stack on mobile

3. **Compare auto-fill vs auto-fit**: 
   - Add/remove photo cards from the HTML
   - See how each keyword handles empty space differently

4. **Test with different viewport sizes**:
   - Desktop (1400px+): Full layout
   - Tablet (768px): Some wrapping
   - Mobile (375px): Stacked layout

## Common Pitfalls

❌ **Forgetting `min()`** in minmax for mobile:
```css
/* This breaks on mobile (300px minimum is too wide) */
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));

/* This works (never exceeds 100% on small screens) */
grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
```

❌ **Using Grid when Flexbox is simpler**:
```css
/* Overcomplicated */
.nav { display: grid; grid-auto-flow: column; }

/* Better */
.nav { display: flex; gap: var(--spacing-med); }
```

❌ **Forgetting gap property**:
```css
/* Use gap instead of margins on children */
.photo-grid {
    display: grid;
    gap: var(--spacing-lg); /* Much cleaner than margin on cards */
}
```

## Stretch Goals

If you finish early, try these enhancements:

1. **Dense packing** for photo gallery: `grid-auto-flow: dense;`
2. **Asymmetric header**: Use `margin-left: auto` to push nav to the right
3. **Full-bleed hero**: Make hero span full width while content stays constrained
4. **Named grid lines**: Experiment with `[content-start]` and `[content-end]`

## Resources

- [Grid Template Areas](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas)
- [Auto-Fit vs Auto-Fill](https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/)
- [Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## Submission

When you complete this assignment, you'll document your work in the assignment form, download a PDF, and submit it via Canvas along with your portfolio link.
