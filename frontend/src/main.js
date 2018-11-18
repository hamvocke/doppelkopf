import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import * as Sentry from "@sentry/browser";

import "@/assets/css/app.css";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

Sentry.init({
  dsn: "https://69b3af20d4fa454f851a6be71502334c@sentry.io/1235644",
  integrations: [new Sentry.Integrations.Vue({ Vue })],
  environment: process.env.NODE_ENV
});
