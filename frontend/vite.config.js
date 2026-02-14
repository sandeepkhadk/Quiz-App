import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // 1. Tailwind Vite plugin sits at the top level
    tailwindcss(), 
    
    // 2. React plugin with its specific Babel config
    react({
      babel: {
        plugins: [
          'babel-plugin-react-compiler', // Just the string or [string, options]
        ],
      },
    }),
  ],
})