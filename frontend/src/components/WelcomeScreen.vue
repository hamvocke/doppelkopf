<template>
  <div class="welcome" >
    <h1>Doppelkopf</h1>

    <h2>👋 Hey there!</h2>
    <p>This is an online version of <a href="https://en.wikipedia.org/wiki/Doppelkopf">Doppelkopf</a>, a German card game. It's playable but still a work in progress. Feel free to mess around with the game as much as you like. Some of the basics will work. It won't be a lot of fun as you're playing against a shitty AI and a lot of elements of the game are missing.</p>

    <p>If you want to take a look behind the scenes, you can find the source code on <a href="https://github.com/hamvocke/doppelkopf">GitHub</a> and more details on <a href="https://www.hamvocke.com/blog/doppelkopf/">my blog</a>.</p>

    <div class="button start-game" v-on:click='game.start()'>
      Start Game!
    </div>
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
  padding: 60px;
}

.welcome h1 {
  font-size: 8em;
  color: var(--black);
  text-transform: uppercase;
  letter-spacing: -0.06em;
}

.welcome h2 {
  font-size: 2em;
  color: var(--black);
}

.welcome p {
  width: 50%;
  margin: 2em auto;
  font-size: 1.2em;
}

.button {
  padding: 18px;
  margin: 6px;
  color: var(--white);
  background: var(--red);
  border-radius: 6px;
  display: inline-block;
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
