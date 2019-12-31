<template>
  <div class="welcome">
    <div class="container">
      <div class="logo">
        🤖
      </div>
      <h1>Doppelkopf</h1>

      <router-link to="/play" class="button start-game" tag="button">
        {{ $t("start-game") }}
      </router-link>

      <router-link
        v-if="showTutorial"
        to="/learn"
        class="button button-secondary tutorial"
        tag="button"
      >
        {{ $t("how-to-play") }}
      </router-link>
      <a
        v-else
        :href="$t('tutorial-link')"
        target="_blank"
        class="button button-secondary tutorial-link"
      >
        {{ $t("how-to-play") }}
      </a>
    </div>
  </div>
</template>

<script>
import { Features } from "@/models/features";

export default {
  name: "Home",
  data: function() {
    return {
      showTutorial: false
    };
  },
  async created() {
    this.showTutorial = (await Features.get("show_tutorial_link")).enabled;
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.welcome {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.logo {
  font-size: 5em;
  display: block;
}

.welcome h1 {
  font-size: 3em;
  color: var(--shell);
  display: block;
}
</style>
