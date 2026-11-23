import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        marble: {
          50: "#FAFAF8",
          100: "#F7F6F2",
          200: "#EFECE6",
          300: "#E2DFD8",
          400: "#D5D3CE",
        },
        slate: {
          900: "#1F2124",
          800: "#2B2C30",
          700: "#3E4047",
          600: "#5A5B61",
          400: "#8E8F94",
        },
        gold: {
          DEFAULT: "#B88A44",
          hover: "#A67839",
          light: "#F7F1E5",
          dark: "#8F662E",
        },
        taupe: {
          DEFAULT: "#B8A382",
          soft: "#DDD2C0",
          light: "#EFE8DC",
          dark: "#8C785B",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
        bengali: ["var(--font-hind-siliguri)", "sans-serif"],
      },
      boxShadow: {
        'slab': '0 20px 40px -15px rgba(31, 33, 36, 0.14), 0 0 1px 1px rgba(226, 223, 216, 0.6)',
        'slab-active': '0 30px 60px -12px rgba(31, 33, 36, 0.22), 0 0 0 1px rgba(184, 138, 68, 0.5)',
        'modal': '0 35px 80px -15px rgba(31, 33, 36, 0.35)',
        'floating': '0 16px 36px -8px rgba(31, 33, 36, 0.12), 0 0 0 1px rgba(226, 223, 216, 0.7)',
      },
      animation: {
        'sheen': 'sheen 3s ease-in-out infinite',
      },
      keyframes: {
        sheen: {
          '0%, 100%': { transform: 'translateX(-100%) skewX(-15deg)' },
          '50%': { transform: 'translateX(200%) skewX(-15deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
