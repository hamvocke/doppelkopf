<template>
  <div id="home">
    <Notifications />
    <div class="welcome">
      <div class="container">
        <Logo />

        <h1>Doppelkopf</h1>

        <label>{{ $t("enter_name_label") }}</label>
        <hr />
        <input
          class="input"
          :value="playerName"
          :placeholder="$t('enter_name_input')"
          @input="updateName($event)"
        />

        <hr />

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

  updateName($event: { target: { value: string } }) {
    this.playerName = $event.target.value;
    localStorage.setItem("name", $event.target.value);
    console.log($event.target.value);
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
  text-shadow: 1px 1px 0 var(--black), 2px 2px 0 var(--black),
    3px 3px 0 var(--black), 4px 4px 0 var(--black), 5px 5px 0 var(--black),
    6px 6px 0 var(--red), 7px 7px 0 var(--red);
  font-size: clamp(48px, 10vw, 96px);
  margin: 12px 0 64px;
}

.input {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-bottom: 5px solid rgb(203, 203, 203);
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  margin-bottom: 1.5rem;
}

label {
  font-size: 1em;
  display: inline-block;
  margin-bottom: 0.5rem;
}

hr {
  width: 100%;
  margin: 0px;
  color: transparent;
}
</style>
