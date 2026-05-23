import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: "#050706",
          900: "#0b0f0d",
          850: "#101613",
          800: "#151c18",
          line: "#26302a",
          metal: "#3a403d",
        },
        profit: {
          500: "#00ff88",
          600: "#00c46a",
          900: "#164f35",
        },
        ink: {
          50: "#f5f7f6",
          300: "#9ca7a0",
          500: "#6f7a74",
        },
        warning: "#f5c542",
        danger: "#ff4d4d",
      },
      boxShadow: {
        glow: "0 0 80px rgba(0, 255, 136, 0.18)",
        card: "0 24px 70px rgba(0, 0, 0, 0.32)",
        button: "0 18px 42px rgba(0, 255, 136, 0.22)",
      },
      backgroundImage: {
        "noir-grid":
          "linear-gradient(rgba(0,255,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.05) 1px, transparent 1px)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
