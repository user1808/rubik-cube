import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'rotation-shake': 'rotation-shake 0.25s linear infinite',
      },
      keyframes: {
        'rotation-shake': {
          '25%': { transform: 'rotate(0.75deg)' },
          '0% 50% 100%': { transform: 'rotate(0eg)' },
          '75%': { transform: 'rotate(-0.75deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
