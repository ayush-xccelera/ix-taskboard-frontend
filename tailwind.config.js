/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',
        'primary-dark': '#0052a3',
        success: '#28a745',
        warning: '#ff9800',
        danger: '#dc3545',
        info: '#6c757d',
        background: '#f8f9fa',
        surface: '#ffffff',
        'text-dark': '#212529',
        muted: '#6c757d',
        border: '#dee2e6',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        h1: ['28px', { lineHeight: '1.2', fontWeight: '700' }],
        h2: ['20px', { lineHeight: '1.3', fontWeight: '700' }],
        body: ['14px', { lineHeight: '1.5' }],
        small: ['12px', { lineHeight: '1.4' }],
        button: ['14px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      borderRadius: {
        card: '8px',
        pill: '9999px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
      },
    },
  },
  plugins: [],
}
