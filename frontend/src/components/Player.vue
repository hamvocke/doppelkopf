<template>
  <div class="player">
    <div class="info">
      <div class="name-info">
        <div class="name title-font">
          {{ player.name }}
          <AwardIcon
            v-if="winner"
            class="winner"
            :title="$t('badge_description', { name: player.name })"
            size="18"
          />
        </div>
      </div>
      <div class="stats">
        <div v-if="player.isHuman" class="party">
          <UsersIcon size="14" />
          {{ player.hand.isRe() ? "Re" : "Kontra" }}
        </div>
        <div class="announcements">
          <div
            v-if="player.announcements.size > 0"
            class="announcement flag-icon"
          >
            <FlagIcon size="14" />
          </div>
          <div
            v-for="announcement in player.announcements"
            :key="announcement"
            class="announcement"
          >
            {{ $t(`${announcement}_short`) }}
          </div>
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
    <div class="trickCountSmall">
      {{ $tc("trick", player.trickStack.tricks.length) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Hand from "./Hand.vue";
import TrickStack from "./TrickStack.vue";
import { Player as PlayerModel } from "@/models/player";
import { playableCards } from "@/models/playableCardFinder";
import { UsersIcon, FlagIcon, AwardIcon } from "vue-feather-icons";
import { Card } from "@/models/card";

@Component({
  components: { Hand, TrickStack, UsersIcon, AwardIcon, FlagIcon }
})
export default class Player extends Vue {
  @Prop({ required: true })
  player!: PlayerModel;

  isCovered = !this.player.isHuman;
  isHandSelectable = this.player.isHuman;

  get winner() {
    return (
      this.player.game?.currentTrick.winner() == this.player &&
      this.player.game?.currentTrick.isFinished()
    );
  }

  play(card: Card) {
    this.player.play(card);
  }

  playable() {
    return playableCards(
      this.player.hand.cards,
      this.player.game?.currentTrick.baseCard()
    );
  }
}
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
  align-items: flex-start;
}

.left .container,
.right .container {
  flex-direction: column;
  align-items: center;
}

.info {
  margin: 6px;
}

.bottom .info {
  flex-direction: column;
}

.name-info {
  padding: 6px;
}

.name-info,
.stats {
  display: flex;
  justify-content: center;
  align-items: center;
}

.left .name-info,
.right .name-info {
  flex-direction: column;
}

.name {
  white-space: nowrap;
  font-size: 1.4em;
}

.title-font {
  margin-right: 4px;
}

.party {
  background: var(--lightblue);
  color: var(--white);
  border-radius: 6px;
  border: 2px solid var(--black);
  padding: 4px 8px;
  display: inline-flex;
  align-items: center;
}

.announcements {
  margin-left: 12px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: flex-start;
}

.left .announcements,
.right .announcements {
  margin-left: 0;
  flex-wrap: wrap;
}

.announcement {
  background: var(--red);
  color: var(--white);
  border-radius: 6px;
  border: 2px solid var(--black);
  padding: 4px 12px 4px 6px;
  margin-right: -8px;
  display: inline-flex;
  align-items: center;
}

.flag-icon {
  padding: 6px 12px 6px 4px;
}

.announcement:last-child {
  padding-right: 6px;
  margin-right: 0;
}

.party svg {
  margin-right: 4px;
}

.bottom .hand,
.top .hand {
  margin-right: 12px;
}

.trickCountSmall {
  margin-top: 6px;
  text-align: right;
  display: none;
}

.left .trickCountSmall,
.right .trickCountSmall {
  text-align: center;
}

@media screen and (max-width: 680px) {
  .name {
    font-size: 1.1em;
  }

  .party,
  .announcement {
    font-size: 0.8em;
  }

  .flag-icon {
    padding: 4px 10px 5px 4px;
  }

  .bottom .hand,
  .top .hand {
    margin-right: 0;
  }

  .trickCountSmall {
    display: block;

    font-size: 0.8em;
  }
}
</style>
