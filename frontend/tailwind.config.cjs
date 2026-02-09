module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6',
        },
      },
      backgroundImage: {
        aurora:
          'radial-gradient(1200px 600px at 10% 10%, rgba(124,58,237,0.25), transparent), radial-gradient(800px 400px at 90% 20%, rgba(34,197,94,0.25), transparent), radial-gradient(900px 500px at 30% 80%, rgba(59,130,246,0.25), transparent)',
      },
    },
  },
  plugins: [],
}
