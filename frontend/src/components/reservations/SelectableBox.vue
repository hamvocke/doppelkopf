<template>
  <div
    class="selectable-box"
    :class="{ selected: selected }"
    tabindex="0"
    @click="toggle"
  >
    <div class="flex">
      <slot></slot>
    </div>
    <div :class="{ show: selected }" class="checkmark flex-item">
      <vue-feather type="check" size="16" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import VueFeather from "vue-feather";

defineProps({
  disabled: {
    type: Boolean,
  },
});

const selected = ref(false);

function toggle() {
  selected.value = !selected.value;
}
</script>

<style scoped>
@import "../../assets/css/vars.css";

.selectable-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--white-400);
  background-color: var(--white);
  border-radius: 6px;
}

.selectable-box:active,
.selectable-box:focus {
  outline: 3px solid var(--outline-color);
}

.selectable-box:hover,
.selectable-box:active {
  border-color: var(--white-500);
}

.selected {
  border: 1px solid var(--red-dark);
}

.flex {
  display: flex;
  gap: 12px;
  align-items: center;
}

.checkmark {
  display: inline-flex;
  justify-items: center;
  align-content: center;
  text-align: center;
  background-color: var(--red-dark);
  border-radius: 50%;
  height: 18px;
  width: 18px;
  color: var(--white);
  padding: 2px;
  margin-left: 12px;
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

.selected:hover {
  border: 1px solid var(--red-dark);
}
</style>
