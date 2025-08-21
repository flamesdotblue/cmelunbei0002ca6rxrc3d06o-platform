/**** @type {import('tailwindcss').Config} ****/
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        fg: '#f5f5f5'
      },
      fontFamily: {
        display: ['var(--font-display)', 'ui-sans-serif', 'system-ui'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui']
      },
      letterSpacing: {
        wideish: '0.08em'
      }
    },
  },
  plugins: [],
};
