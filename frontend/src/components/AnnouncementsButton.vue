<template>
  <div class="announcements-button">
    <button class="button" @click="toggleDropdown">
      <span>{{ $t("announce") }}</span>
      <chevron-up-icon></chevron-up-icon>
    </button>
    <div class="dropdown" :class="{ hidden: hidden }">
      <button
        v-for="a in player.possibleAnnouncements()"
        :key="a"
        class="button"
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