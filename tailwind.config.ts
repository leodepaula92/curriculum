// tailwind.config.ts
export default {
    theme: {
        extend: {
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-33.33%)' }, // Baseado em 3 cópias da lista
                }
            }
        }
    },
    plugins: [require('tailwind-scrollbar-hide')],
}