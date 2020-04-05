import VueI18n from "vue-i18n";

import CopyText from "@/components/CopyText";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Copy Text"
};

export const standard = () => ({
  components: { CopyText },
  template: '<CopyText text="tunnel-snakes-rule" />',
  i18n: new VueI18n(i18nOpts)
});
