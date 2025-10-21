import { config } from "@vue/test-utils";
import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "en",
  missing: (_, key) => key,
});

config.global.plugins.push(i18n);
