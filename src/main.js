import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

Raven
     .config('https://69b3af20d4fa454f851a6be71502334c@sentry.io/1235644')
     .addPlugin(RavenVue, Vue)
     .install()

