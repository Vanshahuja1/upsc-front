import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryred: "var(--red)",
        orange: "#FF7B07",
        lightorange: "#DC8940",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      mdl: "991px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      // Add variants for max-width queries
      addVariant("max-sm", "@media (max-width: 639px)");
      addVariant("max-md", "@media (max-width: 991px)");
      addVariant("max-mdl", "@media (max-width: 1024px)");
      addVariant("max-lg", "@media (max-width: 1023px)");
      addVariant("max-xl", "@media (max-width: 1279px)");
      addVariant("max-2xl", "@media (max-width: 1535px)");
    }),
  ],
} satisfies Config;
