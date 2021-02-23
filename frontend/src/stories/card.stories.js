import VueI18n from "vue-i18n";

import Card from "@/components/Card";
import { queen, ten, suits } from "@/models/card";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

let queenOfSpades = queen.of(Suit.Spades);
let tenOfHearts = ten.of(Suit.Hearts);

export default {
  title: "Card"
};

export const red_suite = () => ({
  components: { Card },
  data() {
    return {
      card: tenOfHearts
    };
  },
  template: '<Card :card="card" :is-highlighted="true" />',
  i18n: new VueI18n(i18nOpts)
});

export const black_suite = () => ({
  components: { Card },
  data() {
    return {
      card: queenOfSpades
    };
  },
  template: '<Card :card="card" :is-highlighted="true" />',
  i18n: new VueI18n(i18nOpts)
});

export const covered = () => ({
  components: { Card },
  data() {
    return {
      card: queenOfSpades
    };
  },
  template: '<Card :card="card" :is-covered="true" />',
  i18n: new VueI18n(i18nOpts)
});

export const highlighted = () => ({
  components: { Card },
  data() {
    return {
      card: queenOfSpades
    };
  },
  template: '<Card :card="card" :is-highlighted="true" />',
  i18n: new VueI18n(i18nOpts)
});
