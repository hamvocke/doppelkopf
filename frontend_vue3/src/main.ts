import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import * as Sentry from "@sentry/vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/app.css";
import { Config } from "@/models/config";
import { Features } from "@/models/features";
import { languages, defaultLocale } from "./i18n";

const messages = Object.assign(languages);

console.log(messages);

const i18n = createI18n({
  locale: navigator.language.split("-")[0] || defaultLocale,
  fallbackLocale: "en",
  messages,
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
