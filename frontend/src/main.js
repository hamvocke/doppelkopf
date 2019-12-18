import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

import "@/assets/css/app.css";
import i18n from "./i18n";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount("#app");

Sentry.init({
  dsn: "https://69b3af20d4fa454f851a6be71502334c@sentry.io/1235644",
  integrations: [new Integrations.Vue({ Vue })],
  environment: process.env.NODE_ENV || process.env.server_env || "not-set"
});
