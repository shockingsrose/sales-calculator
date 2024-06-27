import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: '0.0.0.0'
  },
  plugins: [
    react(), 
    UnoCSS(), 
    VitePWA({ registerType: 'autoUpdate' })
  ],
})
