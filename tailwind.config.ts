import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          50: "#EEF6FF",
          100: "#DCEBFF",
          200: "#B9D6FF",
          300: "#8CB8FF",
          400: "#5F94F5",
          500: "#386CE0",
          600: "#244BB8",
          700: "#172B85",
          800: "#132269",
          900: "#101B4F"
        },
        gold: {
          50: "#FFF8DA",
          100: "#FFEFA6",
          200: "#FFE36B",
          300: "#FFC928",
          400: "#F5B400",
          500: "#D49400",
          600: "#AA7200",
          700: "#7F5300",
          800: "#5D3D05",
          900: "#422A05"
        },
        leaf: {
          50: "#edf9ef",
          100: "#d3f0d8",
          500: "#3aa655",
          700: "#24733a"
        },
        ink: "#101828",
        mist: "#EEF6FF"
      },
      boxShadow: {
        premium: "0 28px 80px rgba(16, 24, 40, 0.14)",
        soft: "0 16px 42px rgba(16, 24, 40, 0.08)"
      },
      backgroundImage: {
        "school-hero": "linear-gradient(180deg, #EEF6FF 0%, #FFFFFF 100%)",
        "soft-section": "linear-gradient(180deg, #FFFFFF 0%, #F7FBFF 100%)",
        "nav-surface": "linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 100%)"
      }
    }
  },
  plugins: []
};

export default config;
