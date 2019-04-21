import { storiesOf } from "@storybook/vue";
import VueI18n from "vue-i18n";

import LanguagePicker from "@/components/LanguagePicker";

import "@/assets/css/app.css";

let locale = require("../src/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

storiesOf("Language Picker", module).add("with two languages", () => ({
  components: { LanguagePicker },
  template: "<LanguagePicker />",
  i18n: new VueI18n(i18nOpts)
}));
