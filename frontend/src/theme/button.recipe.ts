import { defineRecipe } from "@chakra-ui/react"

export const buttonRecipe = defineRecipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "semibold",
    letterSpacing: "-0.01em",
    borderRadius: "6px",
    transitionProperty: "background, color, border-color, box-shadow, transform",
    transitionDuration: "150ms",
    colorPalette: "blue",
    _focusVisible: { boxShadow: "focus" },
    _disabled: { opacity: 0.4, cursor: "not-allowed" },
  },
  variants: {
    variant: {
      solid: {
        color: "white",
        bg: "colorPalette.600",
        borderWidth: "1px",
        borderColor: "colorPalette.600",
        _hover: { bg: "colorPalette.700" },
        _active: { bg: "colorPalette.800" },
      },
      outline: {
        color: "colorPalette.700",
        bg: "transparent",
        borderWidth: "1px",
        borderColor: "colorPalette.600",
        _hover: { bg: "colorPalette.50" },
        _active: { bg: "colorPalette.100" },
      },
      subtle: {
        color: "colorPalette.700",
        bg: "colorPalette.50",
        borderWidth: "1px",
        borderColor: "colorPalette.200",
        _hover: { bg: "colorPalette.100" },
        _active: { bg: "colorPalette.200" },
      },
      ghost: {
        color: "colorPalette.700",
        bg: "transparent",
        _hover: { bg: "gray.100" },
        _active: { bg: "gray.200" },
      },
      danger: {
        color: "white",
        bg: "red.600",
        borderWidth: "1px",
        borderColor: "red.600",
        _hover: { bg: "red.700" },
        _active: { bg: "red.800" },
      },
    },
    size: {
      sm: { h: "32px", px: "12px", fontSize: "sm" },
      md: { h: "36px", px: "16px", fontSize: "sm" },
      lg: { h: "40px", px: "20px", fontSize: "md" },
    },
  },
  defaultVariants: { variant: "solid", size: "md" },
})
