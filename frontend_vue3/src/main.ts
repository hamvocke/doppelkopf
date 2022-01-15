import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import * as Sentry from "@sentry/vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/app.css";
import { Config } from "@/models/config";
import { Features } from "@/models/features";

async function loadLocaleMessages() {
  return {
    de: (await import("./locales/de.json")).default,
    en: (await import("./locales/en.json")).default,
  };
}

const i18n = createI18n({
  locale: navigator.language.split("-")[0] || "en",
  fallbackLocale: "en",
  messages: await loadLocaleMessages(),
});

let app = createApp(App);

if (!Config.debug) {
  Sentry.init({
    app,
    dsn: "https://69b3af20d4fa454f851a6be71502334c@o57417.ingest.sentry.io/1235644",
  });
}

app.use(i18n).use(router).mount("#app");

// load feature toggles
Features.fetch();
