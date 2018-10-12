<template>
  <div class="welcome" >
    <h1>Doppelkopf</h1>

    <div class="button" v-on:click='game.startGame()'>
      Start Game!
    </div>
  </div>
</template>

<script>
import { Notifier } from "@/models/notifier";

export default {
  name: "WelcomeScreen",
  props: {
    game: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.welcome {
  padding: 60px;
}

.welcome h1 {
  font-size: 8em;
  color: #fff;
  text-shadow: #ccc 0 1px 0, #c9c9c9 0 2px 0, #bbb 0 3px 0, #b9b9b9 0 4px 0, #aaa 0 5px 0,rgba(0,0,0,.1) 0 6px 1px, rgba(0,0,0,.1) 0 0 5px, rgba(0,0,0,.3) 0 1px 3px, rgba(0,0,0,.15) 0 3px 5px, rgba(0,0,0,.2) 0 5px 10px, rgba(0,0,0,.2) 0 10px 10px, rgba(0,0,0,.1) 0 20px 20px;
}

.button {
  padding: 18px;
  margin: 6px;
  color: var(--white);
  background: var(--red);
  border-radius: 6px;
  display: inline;
  font-size: 1.2em;
  border-bottom: 5px solid color(var(--red) shade(20%));
}

.button:hover,
.button:active {
  border-bottom: 3px solid color(var(--red) shade(20%));
  position: relative;
  top: 2px;
}
</style>
