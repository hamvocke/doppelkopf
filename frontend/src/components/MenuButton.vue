<template>
  <div class="menu-button">
    <button class="button" @click="toggleDropdown">
      <span>{{ text }}</span>
      <chevron-up-icon></chevron-up-icon>
    </button>
    <div class="dropdown" :class="{ hidden: hidden }">
      <button class="button">Re</button>
      <button class="button">Keine 90</button>
      <button class="button">Keine 60</button>
      <button class="button">Keine 30</button>
    </div>
  </div>
</template>

<script>
import { ChevronUpIcon } from "vue-feather-icons";

export default {
  name: "MenuButton",
  components: { ChevronUpIcon },
  props: {
    text: {
      type: String,
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

.menu-button {
  position: relative;
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
