/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'star-movement-top': 'star-movement-top 6s linear infinite',
        'star-movement-bottom': 'star-movement-bottom 6s linear infinite',
        'aurora': 'aurora 60s linear infinite',
      },
      keyframes: {
        'star-movement-top': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(250%)' },
        },
        'star-movement-bottom': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-250%)' },
        },
        'aurora': {
          '0%': { backgroundPosition: '0% 0%, 0% 0%' },
          '50%': { backgroundPosition: '100% 0%, 100% 0%' },
          '100%': { backgroundPosition: '0% 0%, 0% 0%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        border: "rgb(229, 231, 235)",
        background: "rgb(255, 255, 255)",
        foreground: "rgb(15, 23, 42)",
        muted: "rgb(241, 245, 249)",
        primary: {
          DEFAULT: "#36c03b",
          light: "#e8f5e9",
          dark: "#2aa020",
        },
        blue: {
          50: "#e6eef3",
          100: "#ccdde7",
          200: "#99bbcf",
          300: "#6699b7",
          400: "#33779f",
          500: "#03466e",
          600: "#033858",
          700: "#022a42",
          800: "#011c2c",
          900: "#000e16",
          950: "#000509",
        },
        offwhite: {
          pale: "#F5F8FA",    // Pale Blue Off-White
          soft: "#F9FAF9",    // Soft Gray Off-White
          warm: "#FDFBF7",    // Warm Ivory Off-White
          misty: "#F7F9F8",   // Misty White
          alabaster: "#F8F6F2" // Subtle Alabaster
        }
      },
    },
  },
  plugins: [],
};
