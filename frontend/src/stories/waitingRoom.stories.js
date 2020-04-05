import VueI18n from "vue-i18n";

import WaitingRoom from "@/views/WaitingRoom";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Waiting Room"
};

export const waitingRoom = () => ({
  components: { WaitingRoom },
  template: "<WaitingRoom />",
  i18n: new VueI18n(i18nOpts)
});
