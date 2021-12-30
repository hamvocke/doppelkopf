import { createApp } from 'vue'
import App from './App.vue'
import { createI18n } from "vue-i18n";

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


const app = createApp(App);
app.use(i18n);
app.mount("#app");

createApp(App).mount('#app')
