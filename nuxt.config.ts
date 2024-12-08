// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname),
    "~": resolve(__dirname),
  },
  modules: ["@nuxtjs/seo", "nuxt-gtag", "@pinia/nuxt", "@nuxtjs/google-fonts"],
  runtimeConfig: {
    public: {
      paypalClientId: process.env.PAYPAL_CLIENT_ID, 
      API_BASE_URL: process.env.API_BASE_URL
    },
  },
  googleFonts: {
    families: {
      "Playfair+Display": [400, 500, 700],
      "Open+Sans": [300, 400, 600], // For multi-word font names
    },
    display: "swap", // Optional: Controls font-display behavior
  },
  css: ["~/assets/css/main.css", "boxicons/css/boxicons.min.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  site: {
    url: "https://vipairassist.com",
    name: "VIP AIRASSIST",
    description: `Experience unparalleled luxury and convenience with our global airport services. From personalized meet and greet assistance to exclusive VIP terminal access, we ensure seamless travel at airports worldwide. Whether you're a business traveler or seeking a premium journey, our professional concierge team is dedicated to making your airport experience effortless and enjoyable. Book now and elevate your travel to first-class comfort.`,
    defaultLocale: "en",
  },
});
