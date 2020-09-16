import VueI18n from "vue-i18n";

import Logo from "@/components/Logo";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Logo"
};

export const logo = () => ({
  components: { Logo },
  template: "<Logo />",
  i18n: new VueI18n(i18nOpts)
});
