import type { Config } from 'tailwindcss'

// Design System (2026 Luminal / Linear look)
// - dark surfaces (OLED-ish)
// - bioluminescent accents (cyan/indigo)
// - subtle grain
// - soft elevation + inner-shadows
// - accessible contrast
const config: Config = {
  darkMode: ['class'],
  content: ['./index.html', './App.tsx', './index.tsx', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
      },
      colors: {
        // Surfaces
        bg: {
          950: '#05070C',
          900: '#070B12',
          850: '#0A0F1A',
          800: '#0E1626',
        },
        panel: {
          900: 'rgba(10, 15, 26, 0.72)',
          800: 'rgba(14, 22, 38, 0.68)',
        },
        border: {
          900: 'rgba(255, 255, 255, 0.10)',
          800: 'rgba(255, 255, 255, 0.08)',
        },
        // Text
        ink: {
          50: 'rgba(255,255,255,0.92)',
          200: 'rgba(255,255,255,0.78)',
          400: 'rgba(255,255,255,0.62)',
          600: 'rgba(255,255,255,0.46)',
        },
        // Accents
        lum: {
          cyan: '#22D3EE',
          indigo: '#6366F1',
          violet: '#A78BFA',
          green: '#34D399',
          amber: '#FBBF24',
          rose: '#FB7185',
        },
      },
      borderRadius: {
        xl: '1.05rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        // soft elevation
        'elev-1': '0 1px 0 rgba(255,255,255,0.04), 0 10px 30px rgba(0,0,0,0.55)',
        'elev-2': '0 1px 0 rgba(255,255,255,0.06), 0 18px 55px rgba(0,0,0,0.62)',
        // glass edge glow
        glow: '0 0 0 1px rgba(34,211,238,0.10), 0 0 40px rgba(34,211,238,0.10)',
        'glow-indigo': '0 0 0 1px rgba(99,102,241,0.12), 0 0 42px rgba(99,102,241,0.12)',
      },
      backdropBlur: {
        glass: '18px',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-30%)' },
          '100%': { transform: 'translateX(130%)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -6px, 0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '0.95' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.4s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
