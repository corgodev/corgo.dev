/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,md}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          900: '#0f172a',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
