import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          dim: 'var(--surface-dim)',
          DEFAULT: 'var(--surface)',
          card: 'var(--surface-card)',
          high: 'var(--surface-high)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          cta: 'var(--primary-cta)',
        },
        secondary: 'var(--secondary)',
        onSurface: 'var(--on-surface)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        label: ['var(--font-space-mono)', 'ui-monospace', 'monospace'],
        body: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        data: ['var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
      },
      animation: {
        ticker: 'ticker 28s linear infinite',
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'draw-line': 'drawLine 1.2s ease forwards',
        spin: 'spin 2s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 8px rgba(45, 212, 191, 0.25)' },
          '50%': { boxShadow: '0 0 22px rgba(45, 212, 191, 0.55)' },
        },
        drawLine: {
          from: { strokeDashoffset: '400' },
          to: { strokeDashoffset: '0' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
