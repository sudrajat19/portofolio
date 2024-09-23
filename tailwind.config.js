/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily:{
        inter: ['inter', 'sans-serif'],
        pacifico:['pacifico', 'serif'],
        nunito:['nunito-sans', 'sans-serif']
      },
      colors: {
        slate: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
          300: '#CBD5E1',
          200: '#E2E8F0',
          100: '#F1F5F9',
          50: '#F8FAFC'
        },
        brand: {
          900: '#0A0A0D',
          800: '#100F14',
          700: '#15131B',
          600: '#1A1821',
          500: '#1F1D28',
          400: '#44434C',
          300: '#6A6870',
          200: '#8F8E93',
          100: '#B4B4B7',
          50: '#D2D2D4'
        },
        secondary: {
          900: '#4B3C26',
          800: '#715A39',
          700: '#96784B',
          600: '#BB965E',
          500: '#E1B471',
          400: '#E6C089',
          300: '#EBCDA0',
          200: '#F0D9B8',
          100: '#F5E6D0',
          50: '#F9F0E3',
          10:'rgba(250, 216, 16, 1)',
          5:'#FEF3B4'
        }
      },
    },
  },
  plugins: [],
}

