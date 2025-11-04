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
        // Dashflow X & Radiant UI Color System
        neutral: {
          100: 'var(--neutral--100)',
          200: 'var(--neutral--200)',
          300: 'var(--neutral--300)',
          400: 'var(--neutral--400)',
          500: 'var(--neutral--500)',
          600: 'var(--neutral--600)',
          700: 'var(--neutral--700)',
          800: 'var(--neutral--800)',
        },
        accent: {
          primary: 'var(--accent--primary-1)',
        },
        secondary: {
          1: 'var(--secondary--color-1)',
          2: 'var(--secondary--color-2)',
          3: 'var(--secondary--color-3)',
          4: 'var(--secondary--color-4)',
          5: 'var(--secondary--color-5)',
        },
        system: {
          green: {
            100: 'var(--system--green-100)',
            200: 'var(--system--green-200)',
            300: 'var(--system--green-300)',
            400: 'var(--system--green-400)',
          },
          red: {
            100: 'var(--system--red-100)',
            200: 'var(--system--red-200)',
            300: 'var(--system--300)',
            400: 'var(--system--red-400)',
          },
          blue: {
            100: 'var(--system--blue-100)',
            200: 'var(--system--blue-200)',
            300: 'var(--system--blue-300)',
            400: 'var(--system--blue-400)',
          },
          orange: {
            100: 'var(--system--orange-100)',
            200: 'var(--system--orange-200)',
            300: 'var(--system--orange-300)',
            400: 'var(--system--orange-400)',
          },
        },
        radiant: {
          white: 'var(--radiant-ui-components-library-marketplace--color--white)',
          body: 'var(--radiant-ui-components-library-marketplace--color--body-font-dark)',
          heading: 'var(--radiant-ui-components-library-marketplace--color--heading-dark)',
        },
      },
      // Enhanced responsive breakpoints
      // Mobile-first approach matching Dashflow X:
      // Mobile: default (< 768px)
      // Tablet: 768px - 991px
      // Desktop: >= 992px
      screens: {
        'xs': '475px',    // Extra small devices
        'sm': '640px',    // Small devices (large phones)
        'md': '768px',    // Medium devices (tablets) - Dashflow X tablet breakpoint
        'lg': '992px',    // Large devices (desktops) - Dashflow X desktop breakpoint
        'xl': '1280px',   // Extra large devices
        '2xl': '1536px',  // 2X large devices
      },
      // Enhanced font family
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      // Enhanced typography scale
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.625' }],
        'lg': ['1.125rem', { lineHeight: '1.625' }],
        'xl': ['1.25rem', { lineHeight: '1.625' }],
        '2xl': ['1.5rem', { lineHeight: '1.375' }],
        '3xl': ['1.875rem', { lineHeight: '1.375' }],
        '4xl': ['2.25rem', { lineHeight: '1.25' }],
        '5xl': ['3rem', { lineHeight: '1.25' }],
        '6xl': ['3.75rem', { lineHeight: '1.125' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      // Responsive spacing scale
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      // Touch-friendly minimum sizes
      minHeight: {
        'touch': '44px',
      },
      minWidth: {
        'touch': '44px',
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
      // Glass-morphism & Gradient Animations
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'gradient-shift': 'gradient-shift 15s ease infinite',
        'spotlight': 'spotlight 20s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        spotlight: {
          '0%, 100%': { transform: 'translate(0%, 0%)' },
          '25%': { transform: 'translate(20%, 20%)' },
          '50%': { transform: 'translate(-20%, 20%)' },
          '75%': { transform: 'translate(20%, -20%)' },
        },
      },
      // Backdrop blur
      backdropBlur: {
        'xs': '2px',
        '3xl': '64px',
      },
      // Box shadow extensions
      boxShadow: {
        'glow': '0 0 30px rgba(255, 255, 255, 0.1)',
        'glow-blue': '0 0 40px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 40px rgba(168, 85, 247, 0.3)',
        'glow-pink': '0 0 40px rgba(236, 72, 153, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.05)',
        'inner-glow-hover': 'inset 0 0 20px rgba(255, 255, 255, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
