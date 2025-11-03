import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      // Enhanced responsive breakpoints
      screens: {
        'xs': '475px',    // Extra small devices
        'sm': '640px',    // Mobile devices
        'md': '768px',    // Tablets
        'lg': '1024px',   // Small laptops
        'xl': '1280px',   // Desktops
        '2xl': '1536px',  // Large desktops
      },
      // Enhanced font family
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      // Enhanced typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.5' }],     // 14px
        'base': ['1rem', { lineHeight: '1.625' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.625' }],   // 18px
        'xl': ['1.25rem', { lineHeight: '1.625' }],    // 20px
        '2xl': ['1.5rem', { lineHeight: '1.375' }],    // 24px
        '3xl': ['1.875rem', { lineHeight: '1.375' }],  // 30px
        '4xl': ['2.25rem', { lineHeight: '1.25' }],    // 36px
        '5xl': ['3rem', { lineHeight: '1.25' }],       // 48px
        '6xl': ['3.75rem', { lineHeight: '1.125' }],   // 60px
        '7xl': ['4.5rem', { lineHeight: '1' }],        // 72px
        '8xl': ['6rem', { lineHeight: '1' }],          // 96px
        '9xl': ['8rem', { lineHeight: '1' }],          // 128px
      },
      // Responsive spacing scale (8px base unit)
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Touch-friendly minimum sizes
      minHeight: {
        'touch': '44px',  // iOS minimum touch target
      },
      minWidth: {
        'touch': '44px',  // iOS minimum touch target
      },
      // Enhanced letter spacing
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
    },
  },
  plugins: [],
};
export default config;
