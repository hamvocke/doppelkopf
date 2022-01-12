import { createApp } from 'vue'
import { createI18n } from "vue-i18n";
import App from './App.vue'
import router  from "./router";
import "@/assets/css/app.css";

// TODO: register service worker
// TODO set up sentry

async function loadLocaleMessages() {
  return {
    de: (await import("./locales/de.json")).default,
    en: (await import("./locales/en.json")).default,
  };
}

const i18n = createI18n({
  locale: navigator.language.split("-")[0] || "en",
  fallbackLocale: "en",
  messages: await loadLocaleMessages()
});


createApp(App)
  .use(i18n)
  .use(router)
  .mount("#app");
