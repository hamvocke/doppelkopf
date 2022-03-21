<template>
  <div
    class="selectable-box"
    :class="{ selected, disabled }"
    tabindex="0"
    @click="select"
  >
    <div class="flex">
      <slot></slot>
    </div>
    <div :class="{ show: selected }" class="checkmark flex-item">
      <vue-feather type="check" size="32" />
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

.selectable-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid var(--white-400);
  background-color: var(--white);
  border-radius: 6px;
}

.selectable-box:active:not(.disabled),
.selectable-box:focus:not(.disabled) {
  outline: 3px solid var(--outline-color);
}

.selectable-box:hover:not(.disabled),
.selectable-box:active:not(.disabled) {
  border-color: var(--white-500);
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

.checkmark {
  display: inline-flex;
  justify-items: center;
  align-content: center;
  text-align: center;
  background-color: var(--red-dark);
  border-radius: 50%;
  color: var(--white);
  padding: 4px;
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
