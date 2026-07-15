import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#6D1F2B",
        maroonSoft: "#9A6C6D",
        rosewood: "#A67879",
        ink: "#111111",
        paper: "#F4E7D7"
      },
      boxShadow: {
        luxe: "0 24px 60px rgba(17,17,17,.16)"
      },
      backgroundImage: {
        "art-radial":
          "radial-gradient(circle at top, rgba(110,31,52,0.18), transparent 40%), linear-gradient(180deg, #ffffff 0%, #f7f3f1 100%)"
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
