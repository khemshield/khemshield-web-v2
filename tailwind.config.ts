import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "380px",
        xl: "1400px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-to-left-transparent-white":
          "linear-gradient(to left, transparent, white)",
        "gradient-to-right-transparent-white":
          "linear-gradient(to right, transparent, white)",
      },

      colors: {
        primary: {
          normal: "#F43334",
          dark: "#B72627",
          light: "#FCC0C0",
          container: "#F5F3F3",
        },

        secondary: {
          normal: "#48484A",
          light: "#EDEDED",
        },

        support: "#F5F3F3",
      },

      boxShadow: {
        khemshadow: "0 4px 40px 0 rgba(0, 0, 0, 0.05)",
      },

      animation: {
        "slide-infinte": "slide 20s linear infinite;",
      },

      keyframes: {
        slide: {
          from: { transform: "translateX(0)" }, // Starting off-screen
          to: { transform: "translateX(-100%)" }, // Moving to the left
        },
      },
    },
  },
  plugins: [],
};
export default config;
