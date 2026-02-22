# Illustration Kit

Marketing and empty-state assets for the Conversational Agent Form Builder.

## Usage

- **Hero**: Use `hero-desktop.svg` for hero section. Lazy-load with `loading="lazy"`.
- **Feature icons**: Use Lucide React icons or the SVG icons in `icons/` folder.
- **Empty states**: Placeholder SVGs for Dashboard and Agent Builder empty states.

## Sizes

| Asset | Dimensions | Use case |
|-------|------------|----------|
| hero-desktop.svg | 480×360 | Desktop hero |
| hero-tablet.svg | 360×270 | Tablet (use hero-desktop as fallback) |
| hero-mobile.svg | 320×240 | Mobile hero |

## Color Variants

All SVGs use CSS variables / design tokens:
- Primary: `rgb(79, 255, 143)` (#4FFF8F)
- Accent: `rgb(162, 89, 255)` (#A259FF)
- Orange: `rgb(255, 122, 27)` (#FF7A1B)

## Lazy Loading

```tsx
<img
  src="/assets/illustrations/hero-desktop.svg"
  alt="Agent Builder interface preview"
  loading="lazy"
  decoding="async"
/>
```
