const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            white: '#FFFFFF',
            light: 'rgba(50, 45, 38, 0.16)',
            dark: 'rgba(50, 45, 38, 0.84)',
            black: '#322D26',
            grass: '#F0F2D1',
            sky: '#E7ECF7',
            evening: '#F4E6E4',
            sand: '#F3EAD1',
            morning: '#F1E6F5',
            oak: '#EFE9E2',
            forest: '#E4F2E6',
            stone: '#EAEAEA'
        },
        extend: {
            fontFamily: {
                sans: ['Noto Sans', ...fontFamily.sans]
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
