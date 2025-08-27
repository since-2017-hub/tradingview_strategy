// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || "",
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_APIKEY || "",
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || "",
        // add other keys you need
      },
    },
  },
});
