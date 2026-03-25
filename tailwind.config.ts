import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#14B8A6',
          600: '#0EA89C',
          700: '#0B8F84'
        },
        purple: {
          500: '#7957FF'
        }
      },
      boxShadow: {
        glass: '0 14px 40px -18px rgba(2,6,23,0.35)'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        marquee: 'marquee 22s linear infinite'
      }
    }
  },
  plugins: []
}
export default config
