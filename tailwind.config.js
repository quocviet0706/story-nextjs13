const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    content: [
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{html,js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            fontFamily: {
                mont: ['var(--font-mont)', ...fontFamily.sans]
            },
            colors: {
                primary: '#f6f3ee',
                secondary: '#FFB31C',
                thirdary: '#6b40ea',
                heading: "#292930"
            },
            backgroundImage: {
                linearPrimary: 'linear-gradient(to right, #fdc830 0%, #fe7a00 100%)',
            },
            animation: {
                'sticky-head': 'sticky-head 0.5s forwards',
                'show-dropdown': 'show-dropdown 0.3s forwards',
                'hidden-dropdown': 'hidden-dropdown 0.3s forwards;',
                'show-dropdown-mb': 'show-dropdown-mb 0.3s forwards',
                'hidden-dropdown-mb': 'hidden-dropdown-mb 0.3s forwards;',
            },
            keyframes: {
                'sticky-head': {
                    '0%': { top: '15px', opacity: 0 },
                    '50%': { top: '-10px', opacity: 1 },
                    '100%': { top: '0', opacity: 1 },
                },
                'show-dropdown': {
                    '0%': { transform: 'translateY(30px) translateX(-50%)', opacity: 0 },
                    '70%': { transform: 'translateY(-15px) translateX(-50%)', opacity: 1 },
                    '100%': { transform: 'translateY(0px) translateX(-50%)', opacity: 1 }
                },
                'hidden-dropdown': {
                    '0%': { transform: 'translateY(0) translateX(-50%)', opacity: 1, },
                    '50%': { transform: 'translateY(-15px) translateX(-50%)', opacity: 1, },
                    '100%': { transform: 'translateY(30px) translateX(-50%)', opacity: 0, }
                },
                'show-dropdown-mb': {
                    '0%': { transform: 'translateY(30px)', opacity: 0 },
                    '70%': { transform: 'translateY(-15px)', opacity: 1 },
                    '100%': { transform: 'translateY(0px)', opacity: 1 }
                },
                'hidden-dropdown-mb': {
                    '0%': { transform: 'translateY(0)', opacity: 1, },
                    '50%': { transform: 'translateY(-15px)', opacity: 1, },
                    '100%': { transform: 'translateY(30px)', opacity: 0, }
                },
                'loader-rotate': {
                    '0%': { transform: 'rotate(0deg) scale(0.8)' },
                    '50%': { transform: 'rotate(360deg) scale(1.2)' },
                    '100%': { transform: 'rotate(720deg) scale(0.8)' },
                },
                'loader-spin-1': {
                    '0%': { boxShadow: '0 0 0 #7fc0d4' },
                    '50%': { boxShadow: '0 0 0 #7fc0d4', marginBottom: '0', transform: 'translate(15px, 15px)' },
                    '100%': { boxShadow: '30px 0 0 #7fc0d4', marginBottom: '10px', },
                },
                'loader-spin-2': {
                    '0%': { boxShadow: '30px 0 0 #ffb31c' },
                    '50%': { boxShadow: '0 0 0 #ffb31c', marginTop: '-20px', transform: 'translate(15px, 15px)' },
                    '100%': { boxShadow: '30px 0 0 #ffb31c', marginTop: '0px', },
                }
            }
        },
    },
    plugins: [],
}
