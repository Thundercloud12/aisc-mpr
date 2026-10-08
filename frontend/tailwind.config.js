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
        // Illoca Architectural Palette
        background: "#EBE5D8",
        paper: {
          DEFAULT: "#EBE5D8",
          subtle: "#E4DDCF",
          card: "#FFFDF8",
          muted: "#D8D0BF",
          pure: "#FFFFFF",
        },
        surface: "#FFFDF8",
        "surface-subtle": "#F4EFE5",
        "surface-muted": "#EBE5D8",
        border: "rgba(26, 26, 26, 0.14)",
        "border-dark": "#1A1A1A",
        ink: {
          DEFAULT: "#1A1A1A",
          heading: "#111111",
          body: "#2A2824",
          muted: "#666155",
          faint: "#969082",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          heading: "#111111",
          body: "#33302B",
          muted: "#666155",
          faint: "#969082",
        },
        // Blueprint Cobalt
        blueprint: {
          DEFAULT: "#0B43DC",
          hover: "#0833AA",
          light: "#EBF1FF",
          border: "#8BAEFF",
          dark: "#051F68",
        },
        accent: {
          DEFAULT: "#0B43DC",
          hover: "#0833AA",
          light: "#EBF1FF",
          border: "#8BAEFF",
        },
        // Deep Blueprint Navy Slate
        navy: {
          DEFAULT: "#0D1B40",
          slate: "#0D1B40",
          dark: "#071026",
          card: "#122352",
          light: "#EBF1FF",
        },
        // Safety Red-Orange Tag Accent
        safety: {
          DEFAULT: "#FF4D2D",
          hover: "#E0381B",
          light: "#FFF0ED",
        },
        success: {
          DEFAULT: "#127D3E",
          light: "#EAF7EE",
        },
        warning: {
          DEFAULT: "#D97706",
          light: "#FEF3C7",
        },
        danger: {
          DEFAULT: "#DC2626",
          light: "#FEE2E2",
        }
      },
      fontFamily: {
        sans: [
          '"Space Grotesk"',
          '"Inter"',
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
          "serif"
        ],
        mono: [
          '"Space Mono"',
          '"JetBrains Mono"',
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "monospace"
        ]
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(26, 26, 26, 0.05)",
        card: "0 2px 4px 0 rgba(26, 26, 26, 0.06)",
        elevated: "0 10px 25px -5px rgba(26, 26, 26, 0.08), 0 8px 10px -6px rgba(26, 26, 26, 0.04)",
        blueprint: "0 0 0 1px #0B43DC, 0 8px 24px -4px rgba(11, 67, 220, 0.25)",
        solid: "3px 3px 0px 0px #1A1A1A",
        "solid-sm": "2px 2px 0px 0px #1A1A1A",
        "solid-blue": "3px 3px 0px 0px #0B43DC",
      }
    },
  },
  plugins: [],
};
