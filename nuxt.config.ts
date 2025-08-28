// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

const ROOT = resolve(process.cwd()).replace(/\\/g, "/");

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // use root-based path so virtual modules can import it reliably
  // use absolute filesystem path so Vite/nuxt can load it on Windows

  vite: {
    // normalize aliases for Windows and use regex-based replacements
    resolve: {
      alias: [
        { find: /^~\//, replacement: ROOT + "/" },
        { find: /^@\//, replacement: ROOT + "/" },
        // resolve bare imports like 'assets/css/...' emitted by Nuxt's virtual modules
        { find: /^assets\//, replacement: ROOT + "/assets/" },
      ],
    },
    plugins: [tsconfigPaths(), tailwindcss()],
  },

  // use a relative file path so Vite treats this as a file import (not a bare specifier)
  css: ["./assets/css/main.css"],

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
