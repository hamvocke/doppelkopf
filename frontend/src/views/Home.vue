<template>
  <div class="welcome">
    <div class="container">
      <Logo />
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
import Logo from "@/components/Logo";


export default {
  name: "Home",
  components: { Logo },
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
  color: var(--shell);
  display: block;
  text-shadow: 1px 1px 0 var(--blue), 2px 2px 0 var(--blue),
    3px 3px 0 var(--blue), 4px 4px 0 var(--blue), 5px 5px 0 var(--blue),
    6px 6px 0 var(--red), 7px 7px 0 var(--red);
  font-size: clamp(48px, 10vw, 96px);
  margin: 12px 0 64px;
}
</style>
