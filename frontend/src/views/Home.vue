<template>
  <div class="welcome">
    <div class="container">
      <div class="logo">
        🤖
      </div>
      <h1>Doppelkopf</h1>

      <router-link to="/play">
        <button class="button start-game">
          {{ $t("start-game") }}
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
@import "../assets/css/colors.css";

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
  text-transform: uppercase;
  display: block;
}
</style>
