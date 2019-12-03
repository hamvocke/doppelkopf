import VueI18n from "vue-i18n";

import FlashMessage from "@/components/FlashMessage";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Flash Message"
};

export const icon = () => ({
  components: { FlashMessage },
  template: '<FlashMessage :message="Fuchs gefangen" icon="🦊" />',
  i18n: new VueI18n(i18nOpts)
});

export const no_icon = () => ({
  components: { FlashMessage },
  template: '<FlashMessage :message="Fuchs gefangen" />',
  i18n: new VueI18n(i18nOpts)
});
