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
        navy: "#0A2540",
        steel: "#1E4D8B",
        harbor: "#E8F1F8",
        gold: "#C9A24A",
        ink: "#122033"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(10, 37, 64, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
