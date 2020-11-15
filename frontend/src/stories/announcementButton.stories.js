import VueI18n from "vue-i18n";

import AnnouncementsButton from "@/components/AnnouncementsButton";

import "@/assets/css/app.css";

let locale = require("@/locales/de.json");
let i18nOpts = {
  locale: "de",
  messages: {}
};

i18nOpts["messages"]["de"] = locale;

export default {
  title: "Announcement Button"
};

export const standard = () => ({
  components: { AnnouncementsButton },
  template: `
  <div style="display: flex; justify-content: center; align-items: center; height: 500px;">
    <AnnouncementsButton text="Ansagen" />
  </div>`,
  i18n: new VueI18n(i18nOpts)
});
