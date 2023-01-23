<template>
  <div class="toggle" :class="{ disabled }" @click="toggle">
    <label>
      {{ labelText }}
      <input :checked="checked" type="checkbox" @change="toggle" />
    </label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: {
    type: Boolean,
  },
  labelText: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:checked"]);

function toggle() {
  if (props.disabled) {
    return;
  }

  emit("update:checked", !props.checked);
}
</script>

<style scoped>
@import "../assets/css/app.css";
</style>
