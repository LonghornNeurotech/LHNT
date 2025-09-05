export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BF5801",    // Your burnt orange
        secondary: "#FFF8D6",  // Your light cream
        tertiary: "#FFF0C2",   // Your light gold

        // New colors defined by their exact names
        silver_lake_blue: "#5D89BA",
        prussian_blue: "#003153",
        bone_white: "#F9F6EE",
        disabled_status: "rgba(93, 137, 186, 0.13)"
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      animation: {
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-in',
        'scale-up': 'scaleUp 0.3s ease-out',
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '45': '0.45',
        '55': '0.55',
        '65': '0.65',
        '85': '0.85',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontFamily: {
        anton: ['"Anton"', 'sans-serif'],
        antonio: ['Antonio', 'sans-serif']
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.carousel-visible': {
          'overflow': 'visible !important',
        },
        '.backdrop-blur': {
          'backdrop-filter': 'blur(4px)',
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    },
  ],
  variants: {
    extend: {
      scale: ['group-hover'],
      transform: ['group-hover'],
      translate: ['group-hover'],
      blur: ['hover', 'group-hover'],
      opacity: ['disabled'],
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled'],
      borderWidth: ['last'],
      margin: ['first', 'last'],
      padding: ['first', 'last'],
    },
  },
  corePlugins: {
    container: false,
  },
}