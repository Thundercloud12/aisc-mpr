/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FBFBFA",
        surface: "#FFFFFF",
        "surface-subtle": "#F5F4F0",
        "surface-muted": "#ECEAE3",
        border: "#E2E0D8",
        "border-dark": "#C8C5BA",
        charcoal: {
          DEFAULT: "#18181B",
          heading: "#111113",
          body: "#3F3F46",
          muted: "#71717A",
          faint: "#A1A1AA",
        },
        accent: {
          DEFAULT: "#9E3C1B", // Terracotta/judicial sienna
          hover: "#842F13",
          light: "#FDF2EE",
          border: "#F3D5C9",
        },
        navy: {
          DEFAULT: "#1E293B",
          light: "#F1F5F9",
        },
        success: {
          DEFAULT: "#15803D",
          light: "#F0FDF4",
        },
        warning: {
          DEFAULT: "#B45309",
          light: "#FFFBEB",
        },
        danger: {
          DEFAULT: "#B91C1C",
          light: "#FEF2F2",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif"
        ],
        serif: [
          '"Newsreader"',
          '"Playfair Display"',
          "Georgia",
          "Cambria",
          "serif"
        ],
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          "Consolas",
          "monospace"
        ]
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        elevated: "0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
      }
    },
  },
  plugins: [],
};
