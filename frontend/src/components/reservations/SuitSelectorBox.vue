<template>
  <div class="outer-box flex-col">
    <div
      class="selectable-box"
      :class="{ selected, disabled }"
      tabindex="0"
      @click="select"
      @keydown.enter="select"
      @keydown.space="select"
    >
      <div class="flex-col spaced">
        <img
          src="@/assets/img/heart.png"
          alt="heart icon"
          class="reservation-icon"
        />
        <p class="bold">Farbsolo</p>
        <small>Kreuz ersetzt Karo als Trumpffarbe</small>
      </div>
      <div :class="{ show: selected }" class="checkmark">
        <vue-feather type="check" size="16" />
      </div>
    </div>
    <div class="suits">
      <div class="suit-box black">♣</div>
      <div class="suit-box black active">♠</div>
      <div class="suit-box red">♥</div>
      <div class="suit-box red">♦</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueFeather from "vue-feather";

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  modelValue: {
    type: String,
    required: true,
  },
  selectedValue: {
    type: String,
    required: true,
  },
  selected: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue"]);

function select() {
  if (props.disabled) {
    return;
  }
  emit("update:modelValue", props.selectedValue);
}
</script>

<style scoped>
@import "../../assets/css/vars.css";

p {
  color: var(--black);
  margin: 0;
  text-align: center;
}

.outer-box {
  cursor: pointer;
}

.selectable-box {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--white-400);
  background-color: var(--white);
  border-radius: 6px 6px 0 0;
}

.selectable-box:hover:not(.disabled) {
  border-color: var(--white-500);
}

.selectable-box:focus:not(.disabled) {
  outline: 1px solid var(--white-500);
}

.selected {
  border: 1px solid var(--red-dark);
}

.disabled {
  opacity: 0.5;
}

.flex {
  display: flex;
  gap: 16px;
  align-items: center;
  height: 100%;
}

.spaced {
  margin: 16px;
}

.flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.bold {
  font-weight: bold;
}

.checkmark {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: var(--red-dark);
  border-radius: 50%;
  color: var(--white);
  border: 2px solid var(--white);
  padding: 6px;
  visibility: hidden;
}

.show {
  visibility: visible;
}
.checkmark i {
  display: block;
  height: 100%;
  width: 100%;
}

.reservation-icon {
  max-width: 64px;
  max-height: 64px;
}
.selected:hover {
  border: 1px solid var(--red-dark);
}

.suits {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.suit-box {
  padding: 8px 6px;
  margin-top: -2px;
  background-color: var(--white-050);
  border: 1px solid var(--white-400);
  border-right: none;
  width: 100%;
  text-align: center;
  border-radius: 0 0 8px 8px;
  z-index: 1;
}

.suit-box.active {
  background-color: var(--white);
  border-top: none;
  border-radius: 0 0 8px 8px;
}

.suit-box:not(.active):hover {
  border-color: var(--white-500);
  background-color: var(--white-100);
}

.selected ~ .suits .suit-box {
  border-top-color: var(--red-dark);
}

.suit-box:last-of-type {
  border: 1px solid var(--white-400);
}

.suit-box.red {
  color: var(--red);
}

.suit-box.black {
  color: var(--black);
}

.selectable-box:hover ~ .suits .suit-box {
  border-color: var(--white-500);
}
</style>
