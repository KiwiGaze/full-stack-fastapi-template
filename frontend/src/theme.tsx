import { createSystem, defaultConfig } from "@chakra-ui/react"
import { buttonRecipe } from "./theme/button.recipe"

export const system = createSystem(defaultConfig, {
  globalCss: {
    html: {
      fontSize: "16px",
    },
    body: {
      fontSize: "0.875rem",
      fontFamily: "sans",
      margin: 0,
      padding: 0,
    },
    ".main-link": {
      color: "ui.main",
      fontWeight: "bold",
    },
  },
  theme: {
    tokens: {
      colors: {
        // Clinical Blue brand + cyan accent
        brand: {
          50: { value: "#EFF6FF" },
          100: { value: "#DBEAFE" },
          200: { value: "#BFDBFE" },
          300: { value: "#93C5FD" },
          400: { value: "#60A5FA" },
          500: { value: "#3B82F6" },
          600: { value: "#2563EB" },
          700: { value: "#1D4ED8" },
          800: { value: "#1E40AF" },
          900: { value: "#1E3A8A" },
        },
        accent: {
          50: { value: "#ECFEFF" },
          100: { value: "#CFFAFE" },
          200: { value: "#A5F3FC" },
          300: { value: "#67E8F9" },
          400: { value: "#22D3EE" },
          500: { value: "#06B6D4" },
          600: { value: "#0891B2" },
          700: { value: "#0E7490" },
          800: { value: "#155E75" },
          900: { value: "#164E63" },
        },
        // Cool neutrals for structure
        gray: {
          50: { value: "#F8FAFC" },
          100: { value: "#F1F5F9" },
          200: { value: "#E2E8F0" },
          300: { value: "#CBD5E1" },
          400: { value: "#94A3B8" },
          500: { value: "#64748B" },
          600: { value: "#475569" },
          700: { value: "#334155" },
          800: { value: "#1E293B" },
          900: { value: "#0F172A" },
        },
        surface: {
          bg: { value: "#FFFFFF" },
          elevated: { value: "#F8FAFC" },
          border: { value: "#E2E8F0" },
          overlay: { value: "rgba(15, 23, 42, 0.48)" },
        },
        text: {
          default: { value: "#0F172A" },
          muted: { value: "#475569" },
          inverted: { value: "#FFFFFF" },
          link: { value: "#2563EB" },
        },
        status: {
          success: { value: "#16A34A" },
          warning: { value: "#CA8A04" },
          danger: { value: "#DC2626" },
        },
        focus: { ring: { value: "rgba(37, 99, 235, 0.35)" } },
        // keep existing alias for existing CSS hooks
        ui: { main: { value: "#2563EB" } },
        // Categorical palette for future charts/visualizations
        charts: {
          1: { value: "#2563EB" },
          2: { value: "#06B6D4" },
          3: { value: "#16A34A" },
          4: { value: "#F59E0B" },
          5: { value: "#EF4444" },
          6: { value: "#7C3AED" },
          7: { value: "#10B981" },
          8: { value: "#F97316" },
          9: { value: "#0EA5E9" },
          10: { value: "#84CC16" },
          11: { value: "#E11D48" },
          12: { value: "#6366F1" },
        },
      },
      fonts: {
        sans: {
          value:
            'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", "Noto Sans", "Helvetica", Arial, sans-serif',
        },
        mono: {
          value:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        },
      },
      fontSizes: {
        xs: { value: "0.75rem" }, // 12px
        sm: { value: "0.875rem" }, // 14px
        md: { value: "1rem" }, // 16px
        lg: { value: "1.125rem" }, // 18px
        xl: { value: "1.25rem" }, // 20px
        "2xl": { value: "1.5rem" }, // 24px
        "3xl": { value: "1.875rem" }, // 30px
        "4xl": { value: "2.25rem" }, // 36px
      },
      fontWeights: {
        normal: { value: "400" },
        medium: { value: "500" },
        semibold: { value: "600" },
        bold: { value: "700" },
      },
      lineHeights: {
        tight: { value: "1.2" },
        snug: { value: "1.3" },
        normal: { value: "1.5" },
        relaxed: { value: "1.7" },
      },
      letterSpacings: {
        tighter: { value: "-0.02em" },
        tight: { value: "-0.01em" },
        normal: { value: "0" },
        wide: { value: "0.01em" },
      },
      // Spacing scale (8px base)
      spacing: {
        0: { value: "0" },
        1: { value: "2px" },
        2: { value: "4px" },
        3: { value: "8px" },
        4: { value: "12px" },
        5: { value: "16px" },
        6: { value: "24px" },
        7: { value: "32px" },
        8: { value: "40px" },
        9: { value: "48px" },
        10: { value: "64px" },
      },
      sizes: {
        container: {
          sm: { value: "640px" },
          md: { value: "768px" },
          lg: { value: "1024px" },
          xl: { value: "1280px" },
          "2xl": { value: "1536px" },
        },
        control: {
          sm: { value: "32px" },
          md: { value: "36px" },
          lg: { value: "40px" },
        },
        icon: {
          sm: { value: "16px" },
          md: { value: "20px" },
          lg: { value: "24px" },
        },
      },
      radii: {
        xs: { value: "4px" },
        sm: { value: "6px" },
        md: { value: "6px" },
        lg: { value: "8px" },
        full: { value: "9999px" },
      },
      borderWidths: {
        hairline: { value: "1px" },
        thin: { value: "1px" },
        thick: { value: "2px" },
      },
      shadows: {
        sm: {
          value: "0 1px 0 rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.08)",
        },
        md: {
          value: "0 2px 4px rgba(15,23,42,0.06), 0 4px 8px rgba(15,23,42,0.08)",
        },
        focus: { value: "0 0 0 3px {colors.focus.ring}" },
      },
      durations: {
        fast: { value: "150ms" },
        normal: { value: "200ms" },
        slow: { value: "300ms" },
      },
      easings: {
        standard: { value: "cubic-bezier(0.2, 0, 0, 1)" },
        emphasized: { value: "cubic-bezier(0.22, 1, 0.36, 1)" },
      },
      opacity: {
        disabled: { value: "0.4" },
        overlay: { value: "0.48" },
      },
      zIndex: {
        base: { value: "0" },
        dropdown: { value: "1000" },
        sticky: { value: "1100" },
        overlay: { value: "1300" },
        modal: { value: "1400" },
        popover: { value: "1500" },
        tooltip: { value: "1600" },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
})
