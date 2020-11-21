<template>
  <div class="announcements-button" v-show="player.possibleAnnouncements().size > 0">
    <button class="toggle button" @click="toggleDropdown">
      <span>{{ $t("announce") }}</span>
      <chevron-up-icon></chevron-up-icon>
    </button>
    <div class="dropdown" v-show="!hidden">
      <button
        v-for="a in player.possibleAnnouncements()"
        :key="a"
        class="button"
        @click="announce(a)"
      >
        {{ $t(a) }}
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronUpIcon } from "vue-feather-icons";

export default {
  name: "AnnouncementsButton",
  components: { ChevronUpIcon },
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      hidden: true
    };
  },
  methods: {
    toggleDropdown: function() {
      this.hidden = !this.hidden;
    },
    announce: function(announcement) {
      this.player.announce(announcement);
      this.toggleDropdown();
    }
  }
};
</script>

<style scoped>
@import "../assets/css/vars.css";

.announcements-button {
  position: relative;
  z-index: var(--popover-layer);
}

.dropdown {
  display: flex;
  position: absolute;
  bottom: 72px;
  right: 0px;
}

.dropdown button {
  white-space: nowrap;
}

.hidden {
  display: none;
}
</style>
