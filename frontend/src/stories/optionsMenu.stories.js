import VueI18n from "vue-i18n";

import OptionsMenu from "@/components/OptionsMenu";

import "@/assets/css/app.css";

let localeDe = require("@/locales/de.json");
let localeEn = require("@/locales/en.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = localeDe;
i18nOpts["messages"]["en"] = localeEn;

export default {
  title: "Options Menu"
};

export const closed = () => ({
  components: { OptionsMenu },
  template: "<OptionsMenu :isVisible=false />",
  i18n: new VueI18n(i18nOpts)
});

export const open = () => ({
  components: { OptionsMenu },
  template: "<OptionsMenu :isVisible=true />",
  i18n: new VueI18n(i18nOpts)
});
