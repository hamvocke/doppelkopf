<template>
  <div
    v-show="player.possibleAnnouncements().size > 0"
    v-on-clickaway="closeDropdown"
    class="announcements-button"
  >
    <button
      class="toggle button"
      :class="{ open: isOpen }"
      @click="toggleDropdown"
    >
      <flag-icon size="20" />
      <span class="button-text">{{ $t("announce") }}</span>
      <chevron-up-icon size="16" />
    </button>
    <div v-show="isOpen" class="dropdown">
      <button
        v-for="a in Array.from(player.possibleAnnouncements()).reverse()"
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
import { ChevronUpIcon, FlagIcon } from "vue-feather-icons";
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "AnnouncementsButton",
  components: { ChevronUpIcon, FlagIcon },
  mixins: [clickaway],
  props: {
    player: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleDropdown: function() {
      this.isOpen = !this.isOpen;
    },
    closeDropdown: function() {
      this.isOpen = false;
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
  margin: 0 8px;
}

.open {
  background: color(var(--red) shade(15%));
  transform: scale(0.95, 0.95);
}

.dropdown {
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 64px;
  right: 0px;
}

.dropdown button {
  white-space: nowrap;
}

.dropdown button:hover,
.dropdown button:focus {
  background: color(var(--red) shade(15%));
}

.dropdown button:hover ~ button,
.dropdown button:focus ~ button {
  background: color(var(--red) shade(15%));
}

.hidden {
  display: none;
}
</style>
