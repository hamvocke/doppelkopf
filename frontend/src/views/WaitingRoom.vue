<template>
  <div id="waitingRoom">
    <h1>Doppelkopf</h1>
    <div class="wrapper">
      <p>
        {{ $t("here-is-your-invite-link") }}
      </p>
      <div class="link">
        <CopyText :text="waitingRoom.gameUrl" />
      </div>
      <div class="roomInfo">
        <p>{{ $t("you-can-start") }}</p>
        <p>
          {{
            $tc("n-players-are-here", waitingRoom.players.length, {
              count: waitingRoom.players.length
            })
          }}
          {{ $t(statusMessage) }}
        </p>
      </div>

      <div class="players">
        <ol>
          <li
            v-for="player in waitingRoom.players"
            :key="player.id"
            class="player"
            :class="{ highlight: player.isMe }"
          >
            {{ player.name }}
          </li>
        </ol>
      </div>

      <button
        v-if="isReady()"
        class="button start-game"
        tag="button"
        @click="startGame()"
      >
        {{ $t("start-game") }}
      </button>
    </div>
  </div>
</template>

<script>
import { WaitingRoom, states } from "@/models/waitingRoom";
import CopyText from "@/components/CopyText";

export default {
  name: "WaitingRoom",
  components: { CopyText },
  props: {
    gameId: {
      type: Number,
      default: -1
    },
    waitingRoom: {
      type: Object,
      default: function() {
        return new WaitingRoom();
      }
    }
  },
  computed: {
    statusMessage: function() {
      switch (this.waitingRoom.state) {
        case states.ready:
          return "ready-status";
        case states.waiting:
          return "waiting-status";
      }
      return "waiting-status";
    }
  },
  created() {
    // this.waitingRoom.join("Karl Heinz");
  },
  methods: {
    startGame: function() {
      this.waitingRoom.startGame();
      this.$router.push("/play");
    },
    isReady: function() {
      return this.waitingRoom.state === states.ready;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

#waitingRoom {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.wrapper {
  background: var(--white);
  color: var(--black);
  padding: 32px;
  border-radius: 6px;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

h1 {
  font-size: 3em;
}

.link {
  background: var(--white);
  border-radius: 6px;
  min-width: 600px;
  margin: 16px 0;
  padding: 24px 24px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
}

p {
  color: var(--black);
  line-height: 1.6em;
}

.roomInfo {
  align-self: flex-start;
}

.state {
  margin-top: 64px;
}

.players {
  padding: 0 24px;
  margin: 24px 0;
  background: var(--lightblue);
  color: var(--white);
  display: block;
  min-width: 500px;
  border-radius: 12px;
  box-sizing: border-box;
}

ol {
  padding-left: 0;
  list-style-position: inside;
}

li.player {
  padding: 12px 0;
}

.highlight {
  font-weight: bold;
}
</style>
