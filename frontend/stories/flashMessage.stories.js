import { storiesOf } from "@storybook/vue";
import VueI18n from "vue-i18n";

import FlashMessage from "@/components/FlashMessage";

import "@/assets/css/app.css";

let locale = require("../src/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

storiesOf("Flash Message", module)
  .add("with icon", () => ({
    components: { FlashMessage },
    template: '<FlashMessage message="Fuchs gefangen" icon="🦊" />',
    i18n: new VueI18n(i18nOpts)
  }))
  .add("without icon", () => ({
    components: { FlashMessage },
    template: '<FlashMessage message="Fuchs gefangen" />',
    i18n: new VueI18n(i18nOpts)
  }));
