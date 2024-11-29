// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname),
    "~": resolve(__dirname),
  },
  modules: ['@nuxtjs/seo', 'nuxt-gtag','@pinia/nuxt','@nuxtjs/google-fonts',],
  
  googleFonts: {
    families: {
      'Playfair+Display': [400, 500, 700],
      'Open+Sans': [300, 400, 600], // For multi-word font names
    },
    display: 'swap', // Optional: Controls font-display behavior
  },
  css: ['~/assets/css/main.css','boxicons/css/boxicons.min.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})