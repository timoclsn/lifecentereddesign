module.exports = {
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
            green: '#F0F2D1',
            blue: '#E7ECF7',
            red: '#F4E6E4',
            yellow: '#F3EAD1',
            lilac: '#F1E6F5',
            oak: '#EFE9E2',
            forest: '#E4F2E6',
            grey: '#EAEAEA'
        },
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: []
};
