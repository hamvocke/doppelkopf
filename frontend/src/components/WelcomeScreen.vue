<template>
  <div class="welcome">
    <div class="logo">
      🤖
    </div>
    <h1>Doppelkopf</h1>

    <button class="button start-game" v-on:click='game.start()'>
      Start Game!
    </button>
  </div>
</template>

<script>
export default {
  name: "WelcomeScreen",
  props: {
    game: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.welcome {
  padding-top: 10%;
}

.logo {
  font-size: 8em;
}

.welcome h1 {
  font-size: 5em;
  color: var(--black);
}
</style>
