<template>
  <div class="menu-button">
    <button class="button">
      <span>{{ text }}</span>
      <chevron-up-icon></chevron-up-icon>
      <div class="dropdown">
        <ul>
          <li>Keine 30</li>
          <li>Keine 60</li>
          <li>Keine 90</li>
          <li>Re</li>
        </ul>
      </div>
    </button>
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
  background: var(--white);
  color: var(--black);
  padding: 12px;
  margin: 0 6px;
  border-radius: 4px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 64px;
  right: 0px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
