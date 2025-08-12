## Design Tokens (Clinical Blue)

Source of truth: `src/theme.tsx` (Chakra System `createSystem` config)

### Color tokens
- Brand (blue): `brand.50` … `brand.900` (primary UI hue)
- Accent (cyan): `accent.50` … `accent.900` (sparingly for emphasis)
- Neutrals: `gray.50` … `gray.900`
- Surface: `surface.bg`, `surface.elevated`, `surface.border`, `surface.overlay`
- Text: `text.default`, `text.muted`, `text.inverted`, `text.link`
- Status: `status.success`, `status.warning`, `status.danger`
- Focus ring: `focus.ring`
- Charts: `charts.1` … `charts.12`
- Alias kept for compatibility: `ui.main` → brand blue 600

### Typography
- Fonts: `fonts.sans`, `fonts.mono`
- Sizes: `fontSizes.xs|sm|md|lg|xl|2xl|3xl|4xl`
- Weights: `fontWeights.normal|medium|semibold|bold`
- Line heights: `lineHeights.tight|snug|normal|relaxed`
- Letter spacing: `letterSpacings.tighter|tight|normal|wide`

### Shape & elevation
- Radii: `radii.xs|sm|md|lg|full` (crisp clinical look)
- Border widths: `borderWidths.hairline|thin|thick`
- Shadows: `shadows.sm|md|focus`

### Spacing & sizing
- Spacing scale (8px base): `spacing.0…10` → 0,2,4,8,12,16,24,32,40,48,64px
- Sizes: `sizes.container.sm…2xl`, `sizes.control.sm|md|lg`, `sizes.icon.sm|md|lg`

### Motion & layers
- Durations: `durations.fast|normal|slow`
- Easings: `easings.standard|emphasized`
- Opacity: `opacity.disabled|overlay`
- Z‑index: `zIndex.base|dropdown|sticky|overlay|modal|popover|tooltip`

### Button recipe (variants)
- Variants: `solid`, `outline`, `subtle`, `ghost`, `danger`
- Sizes: `sm`, `md`, `lg`
- Palette‑aware: `colorPalette` drives hues (e.g., `blue`, `gray`, `red`)

### Usage examples
```tsx
// Colors / surfaces
<Box bg="surface.elevated" borderColor="surface.border" color="text.default" />

// Brand emphasis
<Text color="brand.600">Brand text</Text>

// Buttons
<Button variant="solid" colorPalette="blue">Primary</Button>
<Button variant="outline" colorPalette="gray">Secondary</Button>
<Button variant="solid" colorPalette="red">Delete</Button>

// Data typography
<Code fontFamily="mono" fontSize="sm">12.3 kg</Code>
```

### Logo guidance
- Use `public/assets/images/logo-v-inverted.svg` for nav on colored backgrounds.
- Use `logo-v-solid.svg` on white.
- Favicon: `logo-v-favicon.svg`.

### Notes
- Keep WCAG AA contrast for all states.
- Prefer borders + subtle elevation for a clean, clinical aesthetic.


