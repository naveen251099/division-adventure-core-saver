
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom game colors
				cyber: {
					'black': '#000000',
					'dark': '#121212',
					'wall': '#e74c3c',
					'core': '#33c3f0',
					'accent': '#e67e22',
					'success': '#2ecc71',
					'warning': '#f39c12',
					'danger': '#c0392b',
					'text': '#ecf0f1',
					'header': '#1abc9c',
					'footer': '#c0392b'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'pulse-wall': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'flash-warning': {
					'0%, 100%': { backgroundColor: 'var(--flash-normal)' },
					'50%': { backgroundColor: 'var(--flash-warning)' }
				},
				'digital-noise': {
					'0%, 100%': { backgroundPosition: '0% 0%' },
					'25%': { backgroundPosition: '100% 100%' },
					'50%': { backgroundPosition: '100% 0%' },
					'75%': { backgroundPosition: '0% 100%' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'shoot': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.5)', opacity: '0.7' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'appear': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(51, 195, 240, 0.5), 0 0 10px rgba(51, 195, 240, 0.3)' },
					'50%': { boxShadow: '0 0 20px rgba(51, 195, 240, 0.8), 0 0 30px rgba(51, 195, 240, 0.5)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-wall': 'pulse-wall 2s infinite',
				'flash-warning': 'flash-warning 0.5s infinite',
				'digital-noise': 'digital-noise 8s infinite linear',
				'float': 'float 4s ease-in-out infinite',
				'shoot': 'shoot 0.5s ease-out',
				'appear': 'appear 0.5s ease-out forwards',
				'glow': 'glow 2s infinite'
			},
			backgroundImage: {
				'cyber-grid': 'linear-gradient(rgba(51, 195, 240, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(51, 195, 240, 0.1) 1px, transparent 1px)',
				'wall-pattern': 'repeating-linear-gradient(45deg, rgba(231, 76, 60, 0.1), rgba(231, 76, 60, 0.1) 10px, rgba(231, 76, 60, 0.2) 10px, rgba(231, 76, 60, 0.2) 20px)'
			},
			backgroundSize: {
				'cyber-grid-size': '20px 20px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
