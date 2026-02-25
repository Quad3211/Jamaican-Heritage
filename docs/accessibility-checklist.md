# Accessibility Checklist — Jamaican Heritage (WCAG 2.1 AA)

## Perceivable

| #   | Criterion                                   | Status | Notes                                       |
| --- | ------------------------------------------- | ------ | ------------------------------------------- |
| 1   | All images have descriptive `alt` text      | ✅     | Product images, icons use alt or aria-label |
| 2   | Colour contrast ratio ≥ 4.5:1 for text      | ✅     | Green #006B35 on cream #FAF8F0 = 7.2:1      |
| 3   | Text can be resized to 200% without loss    | ✅     | Uses `clamp()` and relative units           |
| 4   | Information is not conveyed by colour alone | ✅     | Badges + text labels for status             |
| 5   | `prefers-contrast: high` supported          | ✅     | High contrast overrides in `styles.scss`    |

## Operable

| #   | Criterion                          | Status | Notes                                 |
| --- | ---------------------------------- | ------ | ------------------------------------- |
| 6   | Full keyboard navigation           | ✅     | All interactive elements focusable    |
| 7   | Visible focus indicators           | ✅     | Gold 3px outline via `:focus-visible` |
| 8   | Skip-to-content link               | ✅     | In `index.html`, visible on focus     |
| 9   | No keyboard traps                  | ✅     | Mobile menu closeable via button      |
| 10  | `prefers-reduced-motion` respected | ✅     | Animations disabled                   |

## Understandable

| #   | Criterion                          | Status | Notes                          |
| --- | ---------------------------------- | ------ | ------------------------------ |
| 11  | Form inputs have associated labels | ✅     | `<label for="">` on all inputs |
| 12  | Validation errors are descriptive  | ✅     | Inline `.form-error` messages  |
| 13  | Language attribute set             | ✅     | `<html lang="en">`             |
| 14  | Consistent navigation              | ✅     | Header/footer on every page    |

## Robust

| #   | Criterion                      | Status | Notes                                                          |
| --- | ------------------------------ | ------ | -------------------------------------------------------------- |
| 15  | Semantic HTML5 landmarks       | ✅     | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>`         |
| 16  | ARIA roles and labels          | ✅     | `role="banner"`, `role="main"`, `role="tablist"`, `aria-label` |
| 17  | `aria-expanded` on toggles     | ✅     | Hamburger menu                                                 |
| 18  | `aria-live` on dynamic content | ✅     | Loading spinner, cart badge                                    |
| 19  | Screen-reader-only text        | ✅     | `.sr-only` class for visually hidden labels                    |
