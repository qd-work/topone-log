import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1e293b",
        steel: "#d97706",
        harbor: "#f8fafc",
        gold: "#f59e0b",
        ink: "#0f172a"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.1)"
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "Arial", "sans-serif"],
        heading: ["var(--font-dm-sans)", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
