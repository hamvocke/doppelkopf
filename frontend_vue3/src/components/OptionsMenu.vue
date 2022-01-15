<template>
  <div class="options">
    <div
      class="icon icon-options"
      :title="$t('options-header')"
      @click="toggleMenu"
    >
      <vue-feather type="settings" />
    </div>
    <modal :visible="visible" @clickaway="hideMenu">
      <h2>{{ $t("options-header") }}</h2>
      <div class="option">
        <span class="label">{{ $t("language") }}</span>
        <LanguagePicker />
      </div>

      <div v-if="config.debug" class="option">
        <span class="label">Debug Mode</span>
        <div>Enabled</div>
      </div>
      <div v-if="config.debug" class="option">
        <span class="label">Config</span>
        <pre><code>{{ JSON.stringify(config, null, 2) }}</code></pre>
      </div>
    </modal>
  </div>
</template>

<script setup lang="ts">
// TODO: reactivate clickaway?
import { ref } from "vue";
import LanguagePicker from "./LanguagePicker.vue";
import Modal from "./Modal.vue";
import { Config } from "@/models/config";
import VueFeather from "vue-feather";

const config = ref(Config);
const visible = ref(false);

function toggleMenu() {
  visible.value = !visible.value;
}

function hideMenu() {
  visible.value = false;
}
</script>

<style scoped>
@import "../assets/css/vars.css";

.icon {
  position: absolute;
  border-radius: 4px;
  background-color: var(--white);
  padding: 8px;
  color: var(--black);
  cursor: pointer;
  box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
    0 5px 15px 0 rgba(0, 0, 0, 0.08);
  z-index: var(--menu-icon-layer);
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-options {
  top: 12px;
  right: 12px;
}

.option {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;
}

.label {
  font-weight: bold;
  margin-right: 18px;
}

h2 {
  margin-top: 0;
}
</style>
