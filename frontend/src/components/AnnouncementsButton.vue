<template>
  <div class="announcements-button" v-show="player.possibleAnnouncements().size > 0">
    <button class="toggle button" :class="{ open: isOpen }" @click="toggleDropdown">
      <span class="button-text">{{ $t("announce") }}</span>
      <chevron-up-icon size="16"></chevron-up-icon>
    </button>
    <div class="dropdown" v-show="isOpen">
      <button
        v-for="a in announcements"
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
      isOpen: false,
    };
  },
  computed: {
    announcements: function() {
      return [...this.player.possibleAnnouncements()].reverse();
    }
  },
  methods: {
    toggleDropdown: function() {
      this.isOpen = !this.isOpen;
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

.button-text {
  margin-right: 8px;
}

.open {
  background: color(var(--red) shade(15%));
  transform: scale(0.95, 0.95);
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
