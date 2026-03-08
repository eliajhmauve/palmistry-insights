import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Brand tokens
        cosmos: "hsl(var(--cosmos))",
        "cosmos-mid": "hsl(var(--cosmos-mid))",
        gold: "hsl(var(--gold))",
        "gold-light": "hsl(var(--gold-light))",
        crimson: "hsl(var(--crimson))",
        "electric-blue": "hsl(var(--electric-blue))",
        ink: "hsl(var(--ink))",
        cream: "hsl(var(--cream))",
        jade: "hsl(var(--jade))",
      },
      borderWidth: { "3": "3px", "5": "5px", "6": "6px" },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px hsl(0 0% 4%)",
        "brutal-lg": "6px 6px 0px hsl(0 0% 4%)",
        "brutal-xl": "8px 8px 0px hsl(0 0% 4%)",
        "brutal-gold": "4px 4px 0px hsl(43 96% 48%)",
        "brutal-crimson": "4px 4px 0px hsl(0 85% 50%)",
        "brutal-blue": "4px 4px 0px hsl(210 100% 52%)",
        "glow-gold": "0 0 24px hsl(43 96% 48% / 0.7)",
      },
      backgroundImage: {
        "cosmos-radial": "radial-gradient(ellipse at 20% 30%, hsl(230 60% 15%), transparent 50%), radial-gradient(ellipse at 80% 70%, hsl(280 40% 12%), transparent 50%)",
        "gold-stripe": "repeating-linear-gradient(-45deg, hsl(43 96% 48%) 0px, hsl(43 96% 48%) 4px, transparent 4px, transparent 12px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 3s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
