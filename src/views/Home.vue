<template>
  <div id="home">
    <OptionsMenu />
    <div class="welcome">
      <Logo />

      <h1>Doppelkopf</h1>

      <p class="lead">{{ t("home-page-teaser-lead") }}</p>
      <p>{{ t("home-page-teaser-text") }}</p>
    </div>
    <div class="name-form">
      <label for="player-name">
        {{ t("enter_name_label") }}
      </label>
      <input id="player-name" v-model="playerName" class="input" :placeholder="t('enter_name_input')"
        @blur="saveName()" />
    </div>
    <div class="buttons">
      <router-link to="/play">
        <button class="button start-game">{{ t("start-game") }}</button>
      </router-link>

      <router-link v-if="showTutorial" to="/learn">
        <button class="button button-secondary tutorial">{{ t("how-to-play") }}</button>
      </router-link>
      <a v-else :href="t('tutorial-link')" target="_blank" class="button button-secondary tutorial-link">
        {{ t("how-to-play") }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { Features } from "@/models/features";
import Logo from "@/components/Logo.vue";
import OptionsMenu from "@/components/OptionsMenu.vue";

const { t } = useI18n();

const playerName = ref((localStorage.name as string) || "");
const showTutorial = ref(Features.enableTutorial);

function saveName() {
  if (playerName.value) {
    localStorage.setItem("name", playerName.value);
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

#home {
  height: 100%;
  overflow-x: auto;
  display: grid;
  align-content: center;
  width: min(100%, 60ch);
  margin: auto;
}

.welcome h1 {
  color: var(--white-200);
  display: block;
  text-shadow: 1px 1px 0 var(--black), 2px 2px 0 var(--black),
    3px 3px 0 var(--black), 4px 4px 0 var(--black), 5px 5px 0 var(--black),
    6px 6px 0 var(--red), 7px 7px 0 var(--red);
  font-size: clamp(48px, 10vw, 96px);
  margin: 1rem 0 3rem;
  text-align: center;
}

.welcome {
  margin-bottom: 2rem;
}

.welcome p {
  padding: 0 2rem;
}

.welcome .lead {
  font-size: 1.2em;
  font-style: italic;
}

.input {
  padding: 0.375em 0.75em;
  line-height: 1.5;
  border: none;
  border-bottom: 5px solid rgb(203, 203, 203);
  border-radius: 6px;
}

.input:focus {
  outline: 3px solid var(--lightblue);
}

label {
  margin-bottom: 0.4rem;
  display: block;
}

.name-form {
  margin: 0 auto 1.5rem auto;
}

.buttons {
  margin: auto;
  margin-bottom: 3rem;
}
</style>
