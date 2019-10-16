import { storiesOf } from "@storybook/vue";
import VueI18n from "vue-i18n";

import OptionsMenu from "@/components/OptionsMenu";

import "@/assets/css/app.css";

let localeDe = require("../src/locales/de.json");
let localeEn = require("../src/locales/en.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = localeDe;
i18nOpts["messages"]["en"] = localeEn;

storiesOf("Options Menu", module)
  .add("closed", () => ({
    components: { OptionsMenu },
    template: "<OptionsMenu :isVisible=false />",
    i18n: new VueI18n(i18nOpts)
  }))
  .add("open", () => ({
    components: { OptionsMenu },
    template: "<OptionsMenu :isVisible=true />",
    i18n: new VueI18n(i18nOpts)
  }));
