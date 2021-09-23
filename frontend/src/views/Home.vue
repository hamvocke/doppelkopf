<template>
  <div id="home">
    <Notifications />
    <div class="welcome">
      <Logo />

      <h1>Doppelkopf</h1>

      <div class="name-form">
        <div class="form-wrapper">
          <label for="player-name">
            {{ $t("enter_name_label") }}
          </label>
          <input
            id="player-name"
            v-model="playerName"
            class="input"
            :placeholder="$t('enter_name_input')"
            @blur="saveName"
          />
        </div>
      </div>

      <div>
        <router-link to="/play" class="button start-game" tag="button">
          {{ $t("start-game") }}
        </router-link>

        <button
          v-if="enableMultiplayer"
          class="button start-multiplayer"
          @click="startMultiplayer"
        >
          {{ $t("start-multiplayer-game") }}
        </button>

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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import router from "@/router/index";
import { Features } from "@/models/features";
import Logo from "@/components/Logo.vue";
import { MultiplayerHandler } from "@/helpers/multiplayerHandler";
import { Notifier } from "@/models/notifier";
import Notifications from "@/components/Notifications.vue";

@Component({
  components: {
    Logo,
    Notifications
  }
})
export default class Home extends Vue {
  showTutorial = false;
  enableMultiplayer = false;
  multiplayerHandler = new MultiplayerHandler();
  playerName: string = localStorage.name || "";

  saveName() {
    if (this.playerName) {
      localStorage.setItem("name", this.playerName);
    }
  }

  created() {
    this.showTutorial = Features.get().enableTutorial;
    this.enableMultiplayer = Features.get().enableMultiplayer;
  }

  async startMultiplayer() {
    if (!this.enableMultiplayer) {
      return;
    }

    try {
      const response = await this.multiplayerHandler.register();
      router.push({
        name: "waiting-room",
        params: { gameName: response.game.id.toString() }
      });
    } catch (error) {
      new Notifier().info("cannot-connect-to-server");
    }
  }
}
</script>

<style scoped>
@import "../assets/css/vars.css";

#home {
  height: 100%;
}

.welcome {
  display: grid;
  place-content: center;
  height: 100%;
}

.logo {
  font-size: 5em;
  display: block;
}

.welcome h1 {
  color: var(--shell);
  display: block;
  text-shadow: 1px 1px 0 var(--black), 2px 2px 0 var(--black),
    3px 3px 0 var(--black), 4px 4px 0 var(--black), 5px 5px 0 var(--black),
    6px 6px 0 var(--red), 7px 7px 0 var(--red);
  font-size: clamp(48px, 10vw, 96px);
  margin: 12px 0 64px;
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

.name-form {
  display: flex;
  justify-content: center;
  margin-bottom: 3em;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  margin-bottom: 0.6em;
}
</style>
