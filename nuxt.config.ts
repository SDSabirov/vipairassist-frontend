// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  alias: {
    "@": resolve(__dirname),
    "~": resolve(__dirname),
  },
  modules: ["@nuxtjs/seo", "nuxt-gtag", "@pinia/nuxt", "@nuxtjs/google-fonts", "@nuxt/image"],

  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    densities: [1, 2],
    presets: {
      background: {
        modifiers: {
          format: 'webp',
          quality: 70,
          fit: 'cover'
        }
      },
      card: {
        modifiers: {
          format: 'webp',
          quality: 85,
          fit: 'cover'
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      paypalClientId: process.env.PAYPAL_CLIENT_ID,
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  googleFonts: {
    families: {
      "Playfair+Display": [400, 700],
      "Open+Sans": [400, 600],
    },
    display: "swap",
    preload: true,
    preconnect: true,
    inject: true,
    subsets: ['latin'],
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
      script: [
        {
          hid:'gtm',
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                      })(window,document,'script','dataLayer','GTM-TFJP8PNX');`,
          type: 'text/javascript',
        },
      ],
    },
  },
  site: {
    url: "https://vipairassist.com",
    name: "VIP AIRASSIST",
    description: `Experience unparalleled luxury and convenience with our global airport services. From personalized meet and greet assistance to exclusive VIP terminal access, we ensure seamless travel at airports worldwide. Whether you're a business traveler or seeking a premium journey, our professional concierge team is dedicated to making your airport experience effortless and enjoyable. Book now and elevate your travel to first-class comfort.`,
    defaultLocale: "en",
  },
  robots: {
    UserAgent: "*", // Applies to all user agents
    Disallow: "/admin", // Disallow access to admin pages
    Allow: "/", // Allow access to all other pages
  },

  // Cache headers for CloudFront
  nitro: {
    routeRules: {
      // Static assets - cache for 1 year
      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      // Images - cache for 1 month
      '/assets/images/**': {
        headers: {
          'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400'
        }
      },
      // Videos - cache for 1 month
      '/assets/video/**': {
        headers: {
          'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400'
        }
      },
      // Fonts - cache for 1 year
      '/**/*.woff2': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },
      // HTML pages - short cache with revalidation
      '/**': {
        headers: {
          'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
        }
      }
    }
  },
});
