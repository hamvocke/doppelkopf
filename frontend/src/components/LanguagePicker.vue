<template>
  <div class="language">
    {{ $t("language") }}:&nbsp;
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in availableLanguages" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LanguagePicker",
  data: function() {
    return {
      availableLanguages: ["en", "de"]
    };
  }
};
</script>

<style scoped>
@import "../assets/css/app.css";

.language {
  margin: 6px;
}
</style>
