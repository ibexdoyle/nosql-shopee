/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: "#root",
  theme: {
      colors: {
          'white': '#FFFFFF',
          'black': '#242424',
          'grey': '#F3F3F3',
          'dark-grey': '#5A5A5A',
          'red': '#FF4E4E',
          'transparent': 'transparent',
          'purple': '#8B46FF',
          'teal': '#28DBD0',
          'navy': '#002160',
          'dark-cyan': '#008B8B',
          'smoke': '#848884',
          'emerald-green': '#0A3C30',
          'mint': '#3EBB9E'
      },

    fontSize: {
        'sm': '13px',
        'base': '14px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '38px',
        '5xl': '50px',
        inherit: 'inherit'
    },

      extend: {
        fontFamily: {
          inter: ["'Inter'", "sans-serif"],
          gelasio: ["'Gelasio'", "serif"],
          roboto: ["Roboto, Helvetica Neue, Helvetica, Arial, sans-serif"]
        },
        flex: {
          '4': '4 4 0%',
          '2': '2 2 0%',
        },
        keyframes: {
          'expand': {
            '0%': { maxHeight: '0', opacity: '0' },
            '100%': { maxHeight: '500px', opacity: '1' }, // Adjust maxHeight as necessary
          },
          'collapse': {
            '0%': { maxHeight: '500px', opacity: '1' }, // Adjust maxHeight as necessary
            '100%': { maxHeight: '0', opacity: '0' },
          }
        },
        animation: {
          'expand': 'expand 300ms ease-out forwards',
          'collapse': 'collapse 300ms ease-in forwards',
        }
      },

  },

  plugins: [],
}


