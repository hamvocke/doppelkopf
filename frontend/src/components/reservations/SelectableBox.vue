<template>
  <div class="selectable-box" :class="{ selected: isSelected }" tabindex="0">
    <div class="flex">
      <slot></slot>
    </div>
    <div :class="{ show: isSelected }" class="checkmark flex-item">
      <vue-feather type="check" size="32" />
    </div>
    <input
      v-model="selectedValue"
      type="radio"
      :name="radioGroup"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target?.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import VueFeather from "vue-feather";

const props = defineProps({
  disabled: {
    type: Boolean,
  },
  radioGroup: {
    type: String,
    default: "radioGroup",
  },
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue"]);

const selectedValue = ref("");

const isSelected = computed(() => {
  console.log("selected", selectedValue.value);
  return selectedValue.value === props.modelValue;
});
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
