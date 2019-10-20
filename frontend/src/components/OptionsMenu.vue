<template>
  <div class="options">
    <div class="options-icon" @click="toggleMenu()">⚙️</div>
    <div v-if="isVisible" class="options-menu" @click.self="toggleMenu()">
      <div class="options-menu-content">
        <h2>{{ $t("options-header") }}</h2>
        <div class="option">
          <span class="label">{{ $t("language") }}</span>
          <LanguagePicker />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguagePicker from "./LanguagePicker";

export default {
  name: "OptionsMenu",
  components: {
    LanguagePicker
  },
  props: {
    isVisible: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    toggleMenu: function() {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<style scoped>
@import "../assets/css/colors.css";

.options-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  border-radius: 4px;
  background-color: var(--shell);
  padding: 6px 8px;
  color: var(--black);
  cursor: pointer;
  font-size: 1.5em;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  z-index: 500;
}

.options-menu {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  z-index: 400;
  color: var(--black);
  background-color: color(var(--black) a(80%));
}

.options-menu-content {
  max-width: 40%;
  background-color: var(--shell);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 16px;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  position: relative;
  display: flex;
  flex-direction: column;
}

.option {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.label {
  font-weight: bold;
  margin-right: 18px;
}

h2 {
  margin-top: 0;
}

@media screen and (max-width: 680px) {
  .options-menu-content {
    max-width: 100%;
  }
}
</style>
