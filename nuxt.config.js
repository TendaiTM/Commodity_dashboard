// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  modules: [
    "vuetify-nuxt-module",
    "@nuxtjs/supabase",
    "@nuxt/icon",
    "@nuxt/ui",
    "vuetify-nuxt-module",
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  runtimeConfig: {
    public: {
      middlewareOptions: {
        loginRoute: "/auth/login",
        registerRoute: "/auth/register",
        authenticatedBasePath: "/user/dashboard",
      },
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SERVICE_ROLE_KEY,
    clientOptions: {
      auth: {
        flowType: "pkce",
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
    },
    redirect: false,
  },
  router: {
    linkExactActiveClass: "",
  },
  css: ["~/assets/css/fontface.css"],
});
