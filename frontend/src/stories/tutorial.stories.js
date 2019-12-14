import VueI18n from "vue-i18n";

import Tutorial from "@/components/tutorial/Tutorial";
import SampleTrick from "@/components/tutorial/SampleTrick";
import AllTrumps from "@/components/tutorial/AllTrumps";
import AllNonTrumps from "@/components/tutorial/AllNonTrumps";
import QuizTrumpNonTrump from "@/components/tutorial/QuizTrumpNonTrump";

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

export const tutorial = () => ({
  components: { Tutorial },
  template: "<Tutorial />",
  i18n: new VueI18n(i18nOpts)
});

export const sampleTrick = () => ({
  components: { SampleTrick },
  template: "<SampleTrick />",
  i18n: new VueI18n(i18nOpts)
});

export const allTrumps = () => ({
  components: { AllTrumps },
  template: "<AllTrumps />",
  i18n: new VueI18n(i18nOpts)
});

export const allNonTrumps = () => ({
  components: { AllNonTrumps },
  template: "<AllNonTrumps />",
  i18n: new VueI18n(i18nOpts)
});

export const quizTrumpNonTrump = () => ({
  components: { QuizTrumpNonTrump },
  template: "<QuizTrumpNonTrump />",
  i18n: new VueI18n(i18nOpts)
});
