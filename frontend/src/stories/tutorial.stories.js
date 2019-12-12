import VueI18n from "vue-i18n";

import Tutorial from "@/components/Tutorial";
import { queen, ten, suits } from "@/models/card";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Tutorial"
};

export const simple = () => ({
  components: { Tutorial },
  data() {
    return {
      dulle: ten.of(suits.hearts)
    };
  },
  template: '<Tutorial />',
  i18n: new VueI18n(i18nOpts)
});
