import type { Config } from 'tailwindcss';
import tailwindPrime from 'tailwindcss-primeui';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '360px',
        xss: '320px',
      },
      animation: {
        'rotation-shake': 'rotation-shake 0.25s linear infinite',
        'first-dot': 'first-dot 2s steps(1) infinite',
        'second-dot': 'second-dot 2s steps(1) infinite',
        'third-dot': 'third-dot 2s steps(1) infinite',
      },
      keyframes: {
        'rotation-shake': {
          '25%': { transform: 'rotate(0.75deg)' },
          '0% 50% 100%': { transform: 'rotate(0eg)' },
          '75%': { transform: 'rotate(-0.75deg)' },
        },
        'first-dot': {
          '0%': { opacity: '0' },
          '25%': { opacity: '1' },
          '50%': { opacity: '1' },
          '75%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        'second-dot': {
          '0%': { opacity: '0' },
          '25%': { opacity: '0' },
          '50%': { opacity: '1' },
          '75%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
        'third-dot': {
          '0%': { opacity: '0' },
          '25%': { opacity: '0' },
          '50%': { opacity: '0' },
          '75%': { opacity: '1' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [tailwindPrime],
} satisfies Config;
