<template>
  <div class="player">
    <div class="info">
      <div class="name-info">
        <!-- <div class="avatar"><img src="../assets/icons/..." alt="avatar"></div> -->
        <div class="name title-font">{{ player.name }}</div>
      </div>
      <div class="stats">
        <div v-if="player.isHuman" class="party">
          <UsersIcon size="14" />
          {{ player.hand.isRe() ? "Re" : "Kontra" }}
        </div>
      </div>
    </div>
    <div class="container">
      <Hand
        :hand="player.hand"
        :is-covered="isCovered"
        :is-selectable="isHandSelectable"
        :position="player.tablePosition"
        :playable-cards="playable()"
        @play="play"
      />
      <TrickStack :trick-stack="player.trickStack" />
    </div>
  </div>
</template>

<script>
import Hand from "./Hand";
import TrickStack from "./TrickStack";
import { playableCards } from "@/models/playableCardFinder";
import { UsersIcon } from "vue-feather-icons";

export default {
  name: "Player",
  components: {
    Hand,
    TrickStack,
    UsersIcon
  },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      isCovered: !this.player.isHuman,
      isHandSelectable: this.player.isHuman
    };
  },
  methods: {
    play: function(card) {
      this.player.play(card);
    },
    playable: function() {
      return playableCards(
        this.player.hand.cards,
        this.player.game.currentTrick.baseCard()
      );
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";
.player {
  display: flex;
  flex-direction: column;
  margin: auto;
}

.container {
  display: flex;
  justify-content: center;
  align-items: start;
}

.left .container,
.right .container {
  flex-direction: column;
  align-items: center;
}

.info {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px;
}

.bottom .info {
  flex-direction: column;
}

.name-info, .stats {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left .name-info,
.right .name-info {
  flex-direction: column;
}

.name {
  font-size: 1.4em;
}

.avatar {
  background: var(--lightgray);
  border-radius: 50%;
  height: 48px;
  width: 48px;
  border: 3px solid var(--white);
  margin-right: 8px;
}

.left .avatar,
.right .avatar {
  margin-right: 0;
  margin-bottom: 8px;
}

.avatar img {
  height: 48px;
  width: 48px;
  clip-path: circle();
}

.party {
  background: var(--lightblue);
  color: var(--white);
  border-radius: 4px;
  font-size: 1em;
  padding: 4px 8px;
  margin: 6px;
  display: inline-flex;
  align-items: center;
}

.party svg {
  margin-right: 4px;
}

.bottom .hand,
.top .hand {
  margin-right: 12px;
}

@media screen and (max-width: 680px) {
  .avatar {
    height: 24px;
    width: 24px;
  }

  .avatar img {
    height: 24px;
    width: 24px;
  }

  .name {
    font-size: 1.1em;
  }

  .party {
    font-size: 0.9em;
  }
}
</style>
