import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Custom font
      },
      colors: {
        'primary-dark': '#1a202c', // Example dark background
        'secondary-dark': '#2d3748', // Example slightly lighter dark
        'accent-blue': '#6366f1', // Example accent color
        'accent-purple': '#8b5cf6', // Example accent color
      },
    },
  },
  plugins: [react(),
    tailwindcss(),
  ],
})
