# Advanced Flexbox Layouts - Starter Files

This package contains starter files for the Advanced Flexbox Layouts assignment. You will implement three complex layouts demonstrating mastery of advanced Flexbox techniques.

## File Structure

```
flexbox-starter/
├── css/
│   ├── base/
│   │   ├── reset.css          - CSS reset for consistent styling
│   │   ├── variables.css      - Custom properties (colors, spacing, typography)
│   │   └── typography.css     - Typography styles
│   ├── layout/
│   │   ├── dashboard.css      - TODO: Implement dashboard layout
│   │   ├── product.css        - TODO: Implement product page layout
│   │   └── article.css        - TODO: Implement article layout
│   ├── components/
│   │   └── buttons.css        - Button component styles (complete)
│   └── main.css               - Main CSS entry point (imports others)
├── dashboard.html             - Dashboard page HTML
├── product.html               - Product page HTML
├── article.html               - Article page HTML
└── README.md                  - This file
```

## Getting Started

1. Open each HTML file in your browser to see the current (unstyled) state
2. Read through the TODO comments in each layout CSS file
3. Implement the Flexbox layouts as specified in the assignment requirements
4. Test your layouts at different viewport widths
5. Document your decisions in `FLEXBOX-DECISIONS.md`

## Key Files to Edit

You will primarily work in these files:

- `css/layout/dashboard.css` - Implement dashboard with header, sidebar, content, and footer
- `css/layout/product.css` - Implement product page with gallery, info, specs, and reviews
- `css/layout/article.css` - Implement article with hero, content area, sidebar, and author bio

## CSS Variables Available

The `variables.css` file provides these custom properties for use in your layouts:

### Colors
- `--color-primary`, `--color-primary-light`, `--color-primary-dark`
- `--color-secondary`, `--color-secondary-light`, `--color-secondary-dark`
- `--color-text`, `--color-text-muted`, `--color-background`
- `--color-surface`, `--color-border`

### Spacing
- `--spacing-xs` through `--spacing-xxl` (0.4rem to 4.8rem)
- `--header-height`, `--sidebar-width`, `--container-max-width`

### Typography
- `--font-size-small` through `--font-size-xxlarge`
- `--line-height-tight`, `--line-height-base`, `--line-height-relaxed`
- `--font-weight-normal`, `--font-weight-medium`, `--font-weight-bold`

### Other
- `--radius-sm`, `--radius-med`, `--radius-lg` (border-radius values)
- `--shadow-sm`, `--shadow-med`, `--shadow-lg` (box-shadow values)
- `--transition-fast`, `--transition-base`, `--transition-slow`

## Tips for Success

1. **Read the TODOs carefully** - Each layout file has detailed comments explaining what needs to be implemented
2. **Use the reading material** - Reference the Advanced Flexbox Patterns reading for solutions to common problems
3. **Test responsively** - Resize your browser frequently to ensure layouts adapt properly
4. **Start with dashboard** - It introduces foundational patterns used in the other layouts
5. **Document as you go** - Write your FLEXBOX-DECISIONS.md file while implementing, not after

## Common Flexbox Patterns You'll Use

- **Sticky footer**: Use `flex: 1` on content area to push footer down
- **Media object**: Fixed-width image/avatar with growing content area
- **Responsive wrapping**: Use `flex-wrap` with appropriate `flex-basis` values
- **Nested containers**: Items that are both flex items and flex containers
- **Alignment**: Strategic use of `align-items`, `align-content`, and `margin: auto`

## Testing Your Work

1. View each page in your browser
2. Resize the browser window to test responsive behavior
3. Verify that:
   - Dashboard cards have aligned footers regardless of content
   - Product specs wrap to multiple columns on narrow screens
   - Article sidebar wraps below content on narrow screens
   - All layouts use Flexbox properties appropriately

## Need Help?

- Review the Advanced Flexbox Patterns reading material
- Check the assignment rubric for specific requirements
- Examine the HTML structure to understand the element relationships
- Use browser DevTools to inspect flex properties and see how items are sized

## Submission

When you complete the assignment, your submission should include:

1. All CSS files with your Flexbox implementations
2. HTML files (unchanged unless you need to add classes)
3. `FLEXBOX-DECISIONS.md` documenting your choices
4. This README (can add notes about what you implemented)

Good luck!
