/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'card': 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        'border': 'var(--border)',
        'input': 'var(--input)',
        'ring': 'var(--ring)',
        'primary': {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        'secondary': {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        'muted': {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        'accent': {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        'destructive': {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        // Custom chart colors
        'chart-1': 'var(--chart-1)',
        'chart-2': 'var(--chart-2)',
        'chart-3': 'var(--chart-3)',
        'chart-4': 'var(--chart-4)',
        'chart-5': 'var(--chart-5)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
      fontFamily: {
        inter: ['Inter'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
