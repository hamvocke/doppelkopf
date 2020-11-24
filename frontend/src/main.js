import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";
import "@/assets/css/app.css";
import i18n from "./i18n";
import router from "./router";
import { Config } from "@/models/config";

Vue.config.productionTip = Config.debug;

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");

if (!Config.testing) {
  Sentry.init({
    dsn: "https://69b3af20d4fa454f851a6be71502334c@sentry.io/1235644",
    integrations: [
      new Integrations.BrowserTracing(),
      new VueIntegration({
        Vue,
        logErrors: Config.debug,
        tracing: true,
        tracingOptions: {
          trackComponents: true
        }
      })
    ],
    tracesSampleRate: Config.debug ? 1.0 : 0.2,
    environment: process.env.NODE_ENV || process.env.server_env || "not-set"
  });
}
