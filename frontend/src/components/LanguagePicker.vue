<template>
  <div id="languages">
    {{ $t("language") }}:&nbsp;
    <span class="language" v-for="(lang, i) in availableLanguages" :key="i">
      <input type="radio" v-model="$i18n.locale" :id="lang" :value="lang">
      <label :for="lang">{{ $t(lang) }}</label>
    </span>
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

#languages {
  margin: 6px;
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
}

label {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

input[type="radio"]:checked + label {
  background-color: var(--lightblue);
}

input {
  display: none;
}
</style>
